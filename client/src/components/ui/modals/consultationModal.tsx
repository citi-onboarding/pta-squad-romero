'use client'; // ESSENCIAL para usar useState no Next.js

import React, { useState } from 'react';

// --- 1. INTERFACES ---

interface ConsultationPayload {
  consultationType: string;
  doctorId: string;
  date: string;
  time: string;
}

interface ConsultationModalState extends ConsultationPayload {
  isLoading: boolean;
  error: string | null;
}

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ConsultationPayload) => Promise<void>; 
}

// --- 2. O COMPONENTE ---

const ConsultationModal: React.FC<ConsultationModalProps> = ({ 
    isOpen, 
    onClose, 
    onSubmit 
}) => {
  
  const [state, setState] = useState<ConsultationModalState>({
    consultationType: '',
    doctorId: '',
    date: '',
    time: '',
    isLoading: false,
    error: null,
  });

  // --- 3. HANDLERS ---

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setState(prevState => ({
      ...prevState,
      [name]: value,
      error: null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação frontend (simples)
    if (!state.consultationType || !state.doctorId || !state.date || !state.time) {
        setState(prevState => ({
            ...prevState,
            error: 'Por favor, preencha todos os campos.',
        }));
        return;
    }

    const { isLoading, error, ...payload } = state; 
    
    setState(prevState => ({ ...prevState, isLoading: true, error: null }));

    try {
      await onSubmit(payload); 
      // Se bem-sucedido, fechará o modal (assumindo que o Pai cuida disso)
      
    } catch (err: any) {
      setState(prevState => ({
        ...prevState,
        error: err.message || 'Erro desconhecido ao salvar a consulta.'
      }));
    } finally {
      setState(prevState => ({ ...prevState, isLoading: false }));
    }
  };

  if (!isOpen) return null;



  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-[24px] shadow-2xl p-[48px] w-full max-w-2xl">
        <header className="flex justify-between items-center mb-10">

          <div className="text-xl font-bold text-[#4B0082]">
            citi <span className="text-[#50E678]">🐾</span>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-700 transition"
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

                className="w-full py-3 px-4 border border-gray-300 rounded-[16px] focus:ring-green-500 focus:border-green-500 transition duration-150 appearance-none" // appearance-none para controlar a seta (opcional)
              >
                <option value="">Selecione aqui</option>
                <option value="rotina">Rotina</option>
                <option value="emergencia">Emergência</option>
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

          {state.error && (
            <p className="text-red-600 text-sm mb-6 p-2 bg-red-50 rounded-lg border border-red-200">
              ⚠️ {state.error}
            </p>
          )}

          <button 
            type="submit" 
            disabled={state.isLoading}
            className={`w-full py-3 text-white font-semibold rounded-[24px] transition duration-200 
                        ${state.isLoading 
                            ? 'bg-[#50E678] bg-opacity-60 cursor-not-allowed' 
                            : 'bg-[#50E678] hover:bg-[#43C268]'}`}
          >
            {state.isLoading ? 'Salvando...' : 'Finalizar cadastro'}
          </button>
        </form>

      </div>
    </div>
  );
};

export default ConsultationModal;