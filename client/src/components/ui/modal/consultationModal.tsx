'use client'; 
import { LogoCITiPet } from '@/assets';
import React, { useState } from 'react';
import Image from "next/image";


interface ConsultationModalState {
  consultationType: string;
  doctorId: string;
  date: string;
  time: string;
}

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataSubmit: (data: ConsultationModalState) => void; 
}

interface FormErrors {
  consultationType?: string;
  doctorId?: string;
  date?: string;
  time?: string;
}

type ValidationErrors = FormErrors;

const ConsultationModal: React.FC<ConsultationModalProps> = ({ 
    isOpen, 
    onClose, 
    onDataSubmit
}) => {
  
  const [state, setState] = useState<ConsultationModalState>({
    consultationType: '',
    doctorId: '',
    date: '',
    time: '',
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));

    if (validationErrors[name as keyof ConsultationModalState]) {
        setValidationErrors(prevErrors => {
            const newErrors = { ...prevErrors };
            delete newErrors[name as keyof ConsultationModalState];
            return newErrors;
        });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let errors: ValidationErrors = {};
    
    if (!state.consultationType) {
        errors.consultationType = 'Selecione o tipo de consulta.';
    }
    if (!state.doctorId) {
        errors.doctorId = 'Informe o médico responsável.';
    }
    if (!state.date) {
        errors.date = 'Preencha a data do atendimento.';
    }
    if (!state.time) {
        errors.time = 'Preencha o horário do atendimento.';
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
        return;
    }

    const alertMessage = `Confirma os dados da consulta?\n
    Tipo de consulta: ${state.consultationType}\n
    Médico Responsável: ${state.doctorId}\n
    Data do atendimento: ${state.date}\n
    Horário do atendimento: ${state.time}`;

    alert(alertMessage); 
    
    const { ...dataToSubmit } = state;

    onDataSubmit(dataToSubmit); 
    onClose(); 
  };

  if (!isOpen) return null;
  
  const getErrorClass = (fieldName: keyof ConsultationModalState) => {
    return validationErrors[fieldName] ? 'border-red-500' : 'border-gray-300';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[24px] shadow-2xl p-[48px] w-full max-w-2xl">
        <header className="flex justify-between items-center mb-10">
          <div className="w-8"></div> 
          <div className="flex-1 flex justify-center">
            <Image 
                src={LogoCITiPet} 
                alt="Logo CITi Pet" 
            />
           </div>
          <button 
            onClick={onClose} 
            className="text-gray-900 p-2 text-3xl mb-5"
              >
              &times;
          </button>
        </header>

        <p className="text-center text-base text-gray-800 mb-10">
          <b>O pet já está cadastrado no sistema!</b> Preencha os dados da <b>consulta</b>:
        </p>

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 mb-10">

            
            <div>
              <label className="block text-base font-bold text-gray-900 mb-2">Tipo de consulta</label>
              <select
                name="consultationType"
                value={state.consultationType}
                onChange={handleChange}
                className={`w-full py-3 px-4 border ${getErrorClass('consultationType')} rounded-[16px] focus:ring-green-500 focus:border-green-500 transition duration-150 appearance-none`}
              >
                <option value="">Checkup</option>
                <option value="vacinacao">Vacinação</option>
                <option value="primeiraConsulta">Primeira Consulta</option>
                <option value="retorno">Retorno</option>
              </select>
              {validationErrors.consultationType && (
                <p className="text-sm text-red-500 mt-1">{validationErrors.consultationType}</p>
              )}
            </div>

            <div>
              <label className="block text-base font-bold text-gray-900 mb-2">Médico Responsável</label>
              <input
                type="text"
                name="doctorId" 
                value={state.doctorId}
                onChange={handleChange}
                placeholder="Digite aqui..."
                className={`w-full py-3 px-4 border ${getErrorClass('doctorId')} rounded-[16px] focus:ring-green-500 focus:border-green-500 transition duration-150`}
              />
              {validationErrors.doctorId && (
                <p className="text-sm text-red-500 mt-1">{validationErrors.doctorId}</p>
              )}
            </div>

            <div>
              <label className="block text-base font-bold text-gray-900 mb-2">Data do atendimento</label>
              <input
                type="date"
                name="date"
                value={state.date}
                onChange={handleChange}
                className={`w-full py-3 px-4 border ${getErrorClass('date')} rounded-[16px] focus:ring-green-500 focus:border-green-500 transition duration-150`}
              />
              {validationErrors.date && (
                <p className="text-sm text-red-500 mt-1">{validationErrors.date}</p>
              )}
            </div>

            <div>
              <label className="block text-base font-bold text-gray-900 mb-2">Horário do atendimento</label>
              <input
                type="time"
                name="time"
                value={state.time}
                onChange={handleChange}
                className={`w-full py-3 px-4 border ${getErrorClass('time')} rounded-[16px] focus:ring-green-500 focus:border-green-500 transition duration-150`}
              />
              {validationErrors.time && (
                <p className="text-sm text-red-500 mt-1">{validationErrors.time}</p>
              )}
            </div>

          </div>
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