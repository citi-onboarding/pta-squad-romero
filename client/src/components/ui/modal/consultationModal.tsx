'use client'; 
import { LogoCITiPet } from '@/assets';
import React, { useState } from 'react';
import Image from "next/image";


interface ConsultationModalState {
  consultationType: string;
  doctorId: string;
  date: string;
  time: string;
  error: string;
}

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataSubmit: (data: ConsultationModalState) => void; 
}

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
    error: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação frontend
    if (!state.consultationType || !state.doctorId || !state.date || !state.time) {
        setState(prevState => ({
            ...prevState,
            error: 'Por favor, preencha todos os campos.',
        }));
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
            className="text-gray-500 hover:text-gray-800 transition p-2"
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
                className="w-full py-3 px-4 border border-gray-300 rounded-[16px] focus:ring-green-500 focus:border-green-500 transition duration-150 appearance-none"
              >
                <option value="">Selecione aqui</option>
                <option value="rotina">Rotina</option>
                <option value="emergencia">Emergencia</option>
              </select>
            </div>

            <div>
              <label className="block text-base font-bold text-gray-900 mb-2">Médico Responsável</label>
              <input
                type="text"
                name="doctorId" 
                value={state.doctorId}
                onChange={handleChange}
                placeholder="Digite aqui..."
                className="w-full py-3 px-4 border border-gray-300 rounded-[16px] focus:ring-green-500 focus:border-green-500 transition duration-150"
              />
            </div>

            <div>
              <label className="block text-base font-bold text-gray-900 mb-2">Data do atendimento</label>
              <input
                type="date"
                name="date"
                value={state.date}
                onChange={handleChange}
                className="w-full py-3 px-4 border border-gray-300 rounded-[16px] focus:ring-green-500 focus:border-green-500 transition duration-150"
              />
            </div>

            <div>
              <label className="block text-base font-bold text-gray-900 mb-2">Horário do atendimento</label>
              <input
                type="time"
                name="time"
                value={state.time}
                onChange={handleChange}
                className="w-full py-3 px-4 border border-gray-300 rounded-[16px] focus:ring-green-500 focus:border-green-500 transition duration-150"
              />
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