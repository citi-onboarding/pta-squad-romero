'use client'; 
import React from 'react';
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { LogoPet } from '@/assets'; 


interface ConsultationFormValues {
  consultationType: string;
  doctorName: string;
  date: string;
  time: string;
  problemDescription: string;
}

interface ConsultationModalProps {
  children: React.ReactNode; 
  onDataSubmit?: (data: ConsultationFormValues) => void;
}

const ConsultationModal: React.FC<ConsultationModalProps> = ({ 
    children, 
    onDataSubmit
}) => {
  
  // Modal state control
  const [open, setOpen] = React.useState(false);

  // React Hook Form initialization
  const form = useForm<ConsultationFormValues>({
    defaultValues: {
      consultationType: "",
      doctorName: "",
      date: "",
      time: "",
      problemDescription: ""
    },
    mode: "onSubmit", 
  });
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset // Cleans form fields
  } = form;

  
  const onSubmit = (data: ConsultationFormValues) => {
    const alertMessage = `Appointment Details:\n
    Consultation Type: ${data.consultationType}\n
    Responsible Doctor: ${data.doctorName}\n
    Date: ${data.date}\n
    Time: ${data.time}\n
    Problem Description: ${data.problemDescription}`;

    alert(alertMessage);
    
    
    if (onDataSubmit) {
      onDataSubmit(data);
    
    }
    
    setOpen(false); 
    reset(); 
  };
  

   //Function called when the dialog attempts to close 
  const handleOpenChange = (newOpenState: boolean) => {
    // If state changes to closed (false), reset the form.
    if (!newOpenState) {
      reset();
    }
    setOpen(newOpenState); 
  };
  
  
   // Helper function to determine the border class based on validation error.
  const getErrorClass = (fieldName: keyof ConsultationFormValues) => {
    return errors[fieldName] ? 'border-red-500' : 'border-gray-300';
  };
  
  return (
    // Dialog component
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent 
        className="
          bg-white 
          w-full max-w-2xl 
          p-12 
          h-auto 
          rounded-3xl shadow-2xl 
          border-none
        "
      >
        <header className="mb-10">
          <div className="flex justify-center">
            <Image 
                src={LogoPet} 
                alt="CITi Pet Logo" 
            />
          </div>
        </header>
        <p className="text-center text-base text-gray-800 mb-10">
          <b>O pet já está cadastrado no sistema!</b> Preencha os dados da <b>consulta</b>:
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 mb-5">

            {/*  Consultation Type */}
            <div>
              <label className="block text-base font-bold text-gray-900 mb-2">Tipo de consulta</label>
              <select
                {...register('consultationType', { required: "Selecione o tipo de consulta." })} 
                className={`w-full py-3 px-4 border ${getErrorClass('consultationType')} rounded-2xl 
                            focus:ring-green-500 focus:border-green-500 transition duration-150 appearance-none
                            h-12`}
              >
                <option value="" disabled hidden>Selecione aqui</option> 
                <option value="Checkup">Checkup</option> {/* Recommended to match details page value */}
                <option value="Vacinação">Vacinação</option>
                <option value="Primeira Consulta">Primeira Consulta</option>
                <option value="Retorno">Retorno</option>
              </select>
              {errors.consultationType && (
                <p className="text-sm text-red-500 mt-1">{errors.consultationType.message}</p>
              )}
            </div>

            {/* Doctor */}
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

            {/* Date */}
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

            {/* Field 4: Time */}
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
          {/*Problem Description */}
            <div>
              <label className="block text-base font-bold text-gray-900 mb-2">Descrição do Problema</label>
              <textarea
                placeholder="Digite aqui..."
                {...register('problemDescription', { 
                  required: "Informe a descrição do problema.",
                  minLength: {
                    value: 2,
                    message: "A descrição do problema deve ter no mínimo 2 caracteres."
                  }
                })} 
                className={`w-full py-3 px-4 border ${getErrorClass('problemDescription')} rounded-2xl 
                            focus:ring-green-500 focus:border-green-500 transition duration-150
                            min-h-[80px]`}
              />
              {errors.problemDescription && (
                <p className="text-sm text-red-500">{errors.problemDescription.message}</p>
              )}
            </div>
          {/*Submit Button */}
          <button 
            type="submit" 
            className={`mt-4 w-full py-3 text-white font-semibold rounded-3xl transition duration-200 
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