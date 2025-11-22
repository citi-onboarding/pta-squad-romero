'use client'; 
import React from 'react';
import Image from "next/image";

// Componentes do shadcn/ui baseados em Radix UI:
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// Hook para gerenciamento de estado e validação do formulário.
import { useForm } from "react-hook-form";

// Importações de assets (logotipo).
import { LogoPet } from '@/assets'; 

/**
 * Define a estrutura de dados (tipagem) esperada dos campos do formulário.
 */
interface ConsultationFormValues {
  consultationType: string;
  doctorName: string;
  date: string;
  time: string;
}

/**
 * Propriedades do Modal.
 */
interface ConsultationModalProps {
  // O elemento que atua como o botão de abertura. Deve ser passado como filho (children).
  children: React.ReactNode; 
  // Função opcional para o componente pai receber os dados validados após a submissão.
  onDataSubmit?: (data: ConsultationFormValues) => void;
}

/**
 * Componente funcional do Modal de Cadastro de Consulta.
 * Gerencia seu próprio estado
 */
const ConsultationModal: React.FC<ConsultationModalProps> = ({ 
    children, 
    onDataSubmit
}) => {
  
  // Estado local para controlar se o modal está aberto (true) ou fechado (false).
  const [open, setOpen] = React.useState(false);

  // Inicializa o React Hook Form.
  const form = useForm<ConsultationFormValues>({
    defaultValues: {
      consultationType: "",
      doctorName: "",
      date: "",
      time: "",
    },
    mode: "onSubmit", // Validação ocorre apenas no envio.
  });
  
  const { 
    register, // Função para registrar inputs no RHF.
    handleSubmit, 
    formState: { errors }, // Objeto que contém os erros de validação.
    reset // Função para limpar os campos.
  } = form;

  /**
   * Lógica executada após o formulário passar na validação.
   */
  const onSubmit = (data: ConsultationFormValues) => {
    const alertMessage = `Confirma os dados da consulta?\n
    Tipo de consulta: ${data.consultationType}\n
    Médico Responsável: ${data.doctorName}\n
    Data do atendimento: ${data.date}\n
    Horário do atendimento: ${data.time}`;

    alert(alertMessage); // Alerta de confirmação.
    
    // Chama a função de callback no componente pai.
    if (onDataSubmit) {
      onDataSubmit(data);
    }
    
    setOpen(false); // Fecha o modal.
    reset(); // Limpa os campos.
  };
  
  /**
   * Função chamada pelo Dialog em qualquer tentativa de fechar (ESC, Overlay, botão 'X').
   */
  const handleOpenChange = (newOpenState: boolean) => {
    // Se o estado estiver mudando para fechado (false), reseta o formulário.
    if (!newOpenState) {
      reset();
    }
    setOpen(newOpenState); // Atualiza o estado interno.
  };
  
  /**
   * Função auxiliar para determinar a classe de borda com base no erro.
   */
  const getErrorClass = (fieldName: keyof ConsultationFormValues) => {
    return errors[fieldName] ? 'border-red-500' : 'border-gray-300';
  };
  
  return (
    // Dialog: gerencia o estado 'open' e eventos de fechamento.
    <Dialog open={open} onOpenChange={handleOpenChange}>
        
      {/* DialogTrigger: Usa o elemento 'children' (o botão passado) para abrir o modal. */}
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent 
        className="
          bg-white 
          w-[90vw] max-w-2xl 
          p-6 md:p-12 
          h-auto 
          rounded-[24px] shadow-2xl 
          border-none
          border-radiues-[24px]
        "
      >
        
        {/* Cabeçalho do Modal: Logo centralizada */}
        <header className="mb-8 mt-2">
          <div className="flex justify-center">
            <Image 
                src={LogoPet} 
                alt="Logo CITi Pet" 
            />
          </div>
        </header>

        {/* Mensagem de instrução */}
        <p className="text-center text-base text-gray-800 mb-8 px-0 md:px-6">
          <b>O pet já está cadastrado no sistema!</b> Preencha os dados da <b>consulta</b>:
        </p>

        {/* Formulário com RHF e Validação */}
        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Layout responsivo com grid de 2 colunas em telas maiores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 mb-10">

            {/* Campo 1: Tipo de consulta  */}
            <div>
              <label className="block text-base font-bold text-gray-900 mb-2">Tipo de consulta</label>
              <select
                {...register('consultationType', { required: "Selecione o tipo de consulta." })} 
                className={`w-full py-3 px-4 border ${getErrorClass('consultationType')} rounded-2xl 
                            focus:ring-green-500 focus:border-green-500 transition duration-150 appearance-none
                            h-12`}
              >
                <option value="" disabled hidden>Selecione aqui</option> 
                <option value="checkup">Checkup</option>
                <option value="vacinacao">Vacinação</option>
                <option value="primeiraConsulta">Primeira Consulta</option>
                <option value="retorno">Retorno</option>
              </select>
              {errors.consultationType && (
                <p className="text-sm text-red-500 mt-1">{errors.consultationType.message}</p>
              )}
            </div>

            {/* Campo 2: Médico Responsável */}
            <div>
              <label className="block text-base font-bold text-gray-900 mb-2">Médico Responsável</label>
              <input
                type="text"
                placeholder="Digite aqui..."
                {...register('doctorName', { 
                  required: "Informe o médico responsável.",
                  minLength: {
                    value: 2,
                    message: "O nome do médico deve ter no mínimo 2 caracteres."
                  }
                })} 
                className={`w-full py-3 px-4 border ${getErrorClass('doctorName')} rounded-2xl 
                            focus:ring-green-500 focus:border-green-500 transition duration-150
                            h-12`}
              />
              {errors.doctorName && (
                <p className="text-sm text-red-500 mt-1">{errors.doctorName.message}</p>
              )}
            </div>

            {/* Campo 3: Data do atendimento  */}
            <div>
              <label className="block text-base font-bold text-gray-900 mb-2">Data do atendimento</label>
              <input
                type="date"
                {...register('date', { required: "Preencha a data do atendimento." })} 
                className={`w-full py-3 px-4 border ${getErrorClass('date')} rounded-2xl 
                            focus:ring-green-500 focus:border-green-500 transition duration-150
                            h-12`}
              />
              {errors.date && (
                <p className="text-sm text-red-500 mt-1">{errors.date.message}</p>
              )}
            </div>

            {/* Campo 4: Horário do atendimento */}
            <div>
              <label className="block text-base font-bold text-gray-900 mb-2">Horário do atendimento</label>
              <input
                type="time"
                {...register('time', { required: "Preencha o horário do atendimento." })} 
                className={`w-full py-3 px-4 border ${getErrorClass('time')} rounded-2xl 
                            focus:ring-green-500 focus:border-green-500 transition duration-150
                            h-12`}
              />
              {errors.time && (
                <p className="text-sm text-red-500 mt-1">{errors.time.message}</p>
              )}
            </div>

          </div>
          
          {/* Botão de Finalizar Cadastro */}
          <button 
            type="submit" 
            className={`w-full py-3 text-white font-semibold rounded-3xl transition duration-200 
                        bg-[#50E678] hover:bg-[#43C268] h-12`} 
          >
            Finalizar cadastro
          </button>
        </form>

      </DialogContent>
    </Dialog>
  );
};

export default ConsultationModal;