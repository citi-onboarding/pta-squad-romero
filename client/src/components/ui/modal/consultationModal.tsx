'use client'; 
import { LogoCITiPet } from '@/assets';
import React, { useState } from 'react';
import Image from "next/image";


/**
 * Define a estrutura do estado que armazena os dados do formulário de consulta.
 */
interface ConsultationModalState {
  consultationType: string;
  doctorName: string; 
  date: string;
  time: string; 
}

/**
 * Define as propriedades (props) que o Modal de Consulta recebe.
 */
interface ConsultationModalProps {
  isOpen: boolean; // Controla se o modal está visível
  onClose: () => void; // Função para fechar o modal
  onDataSubmit: (data: ConsultationModalState) => void; // Função para enviar os dados validados
}

/**
 * Define a estrutura do objeto que armazena as mensagens de erro de validação.
 * As propriedades são opcionais ('?').
 */
interface FormErrors {
  consultationType?: string;
  doctorName?: string;
  date?: string;
  time?: string;
}

type ValidationErrors = FormErrors;

/**
 * Componente funcional do Modal de Cadastro de Consulta.
 */
const ConsultationModal: React.FC<ConsultationModalProps> = ({ 
    isOpen, 
    onClose, 
    onDataSubmit
}) => {
  
  // Estado para armazenar os valores atuais dos campos do formulário
  const [state, setState] = useState<ConsultationModalState>({
    consultationType: '',
    doctorName: '',
    date: '',
    time: '',
  });

  // Estado para armazenar e exibir os erros de validação
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  /**
   * Manipula a mudança de valor em qualquer campo do formulário.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // 1. Atualiza o estado do formulário com o novo valor
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));

    // 2. Limpa o erro visual do campo se o usuário estiver digitando/selecionando
    if (validationErrors[name as keyof ConsultationModalState]) {
        setValidationErrors(prevErrors => {
            const newErrors = { ...prevErrors };
            delete newErrors[name as keyof ConsultationModalState];
            return newErrors;
        });
    }
  };

  /**
   * Manipula a submissão do formulário e executa a validação.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let errors: ValidationErrors = {};
    
    // 1. Lógica de validação: verifica se os campos obrigatórios estão preenchidos
    if (!state.consultationType) {
        errors.consultationType = 'Selecione o tipo de consulta.';
    }
    if (!state.doctorName) {
        errors.doctorName = 'Informe o médico responsável.';
    }
    if (!state.date) {
        errors.date = 'Preencha a data do atendimento.';
    }
    if (!state.time) {
        errors.time = 'Preencha o horário do atendimento.';
    }

    // 2. Atualiza o estado de erros (para exibição visual)
    setValidationErrors(errors);

    // 3. Se houver algum erro, interrompe o processo de submissão
    if (Object.keys(errors).length > 0) {
        return;
    }

    // 4. Se a validação for bem-sucedida, exibe o alerta de confirmação
    const alertMessage = `Confirma os dados da consulta?\n
    Tipo de consulta: ${state.consultationType}\n
    Médico Responsável: ${state.doctorName}\n
    Data do atendimento: ${state.date}\n
    Horário do atendimento: ${state.time}`;

    alert(alertMessage); 
    
    // 5. Prepara os dados e chama a função de envio
    const { ...dataToSubmit } = state;

    onDataSubmit(dataToSubmit); 
    onClose(); // Fecha o modal após o envio
  };

  // Retorno: o componente não renderiza se isOpen for falso
  if (!isOpen) return null;
  
  /**
   * Função auxiliar para aplicar a classe CSS de borda vermelha em caso de erro.
   */
  const getErrorClass = (fieldName: keyof ConsultationModalState) => {
    // Retorna 'border-red-500' se o campo estiver no estado de erro, senão 'border-gray-300'
    return validationErrors[fieldName] ? 'border-red-500' : 'border-gray-300';
  };

  return (
    // Fundo escuro que cobre toda a tela e centraliza o modal
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {/* Container principal do conteúdo do modal */}
      <div className="bg-white rounded-[24px] shadow-2xl p-[48px] w-full max-w-2xl">
        <header className="flex justify-between items-center mb-10">
          {/* Div vazia para ajudar a centralizar a logo */}
          <div className="w-8"></div> 
          {/* Logo */}
          <div className="flex-1 flex justify-center">
            <Image 
                src={LogoCITiPet} 
                alt="Logo CITi Pet" 
            />
           </div>
          {/* Botão de fechar */}
          <button 
            onClick={onClose} 
            className="text-gray-900 p-2 text-3xl mb-5"
              >
              &times;
          </button>
        </header>

        {/* Mensagem informativa */}
        <p className="text-center text-base text-gray-800 mb-10">
          <b>O pet já está cadastrado no sistema!</b> Preencha os dados da <b>consulta</b>:
        </p>

        {/* Formulário */}
        <form onSubmit={handleSubmit}>

          {/* Grid de campos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 mb-10">

            
            {/* Campo Tipo de consulta */}
            <div>
              <label className="block text-base font-bold text-gray-900 mb-2">Tipo de consulta</label>
              <select
                name="consultationType"
                value={state.consultationType}
                onChange={handleChange}
                // Aplicação da classe de erro condicional
                className={`w-full py-3 px-4 border ${getErrorClass('consultationType')} rounded-[16px] focus:ring-green-500 focus:border-green-500 transition duration-150 appearance-none`}
              >
                <option value="checkup">Checkup</option>
                <option value="vacinacao">Vacinação</option>
                <option value="primeiraConsulta">Primeira Consulta</option>
                <option value="retorno">Retorno</option>
              </select>
              {/* Exibe a mensagem de erro específica */}
              {validationErrors.consultationType && (
                <p className="text-sm text-red-500 mt-1">{validationErrors.consultationType}</p>
              )}
            </div>

            {/* Campo Médico Responsável */}
            <div>
              <label className="block text-base font-bold text-gray-900 mb-2">Médico Responsável</label>
              <input
                type="text"
                name="doctorName" 
                value={state.doctorName}
                onChange={handleChange}
                placeholder="Digite aqui..."
                // Aplicação da classe de erro condicional
                className={`w-full py-3 px-4 border ${getErrorClass('doctorName')} rounded-[16px] focus:ring-green-500 focus:border-green-500 transition duration-150`}
              />
              {/* Exibe a mensagem de erro específica */}
              {validationErrors.doctorName && (
                <p className="text-sm text-red-500 mt-1">{validationErrors.doctorName}</p>
              )}
            </div>

            {/* Campo Data do atendimento */}
            <div>
              <label className="block text-base font-bold text-gray-900 mb-2">Data do atendimento</label>
              <input
                type="date"
                name="date"
                value={state.date}
                onChange={handleChange}
                // Aplicação da classe de erro condicional
                className={`w-full py-3 px-4 border ${getErrorClass('date')} rounded-[16px] focus:ring-green-500 focus:border-green-500 transition duration-150`}
              />
              {/* Exibe a mensagem de erro específica */}
              {validationErrors.date && (
                <p className="text-sm text-red-500 mt-1">{validationErrors.date}</p>
              )}
            </div>

            {/* Campo Horário do atendimento */}
            <div>
              <label className="block text-base font-bold text-gray-900 mb-2">Horário do atendimento</label>
              <input
                type="time"
                name="time"
                value={state.time}
                onChange={handleChange}
                // Aplicação da classe de erro condicional
                className={`w-full py-3 px-4 border ${getErrorClass('time')} rounded-[16px] focus:ring-green-500 focus:border-green-500 transition duration-150`}
              />
              {/* Exibe a mensagem de erro específica */}
              {validationErrors.time && (
                <p className="text-sm text-red-500 mt-1">{validationErrors.time}</p>
              )}
            </div>

          </div>
          {/* Botão de Finalizar Cadastro */}
          <button 
            type="submit" 
            className={`w-full py-3 text-white font-semibold rounded-[24px] transition duration-200 
                        bg-[#50E678] hover:bg-[#43C268]`}
          >
            Finalizar cadastro
          </button>
        </form>

      </div>
    </div>
  );
};

export default ConsultationModal;