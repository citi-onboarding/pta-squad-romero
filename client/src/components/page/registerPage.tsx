'use client'
import React, { useState } from 'react';
import Header from "@/components/header/header";
import { useForm } from "react-hook-form";
import { RegisterModal } from '@/components/modal/RegisterModal';
import { useRouter } from 'next/navigation';
// Images
import Image from 'next/image';
import ovelhaImg from '../../../src/assets/sheep.svg';
import gatoImg from '../../../src/assets/cat.svg';
import cavaloImg from '../../../src/assets/horse.svg';
import porcoImg from '../../../src/assets/pig.svg';
import vacaImg from '../../../src/assets/cow.svg';
import cachorroImg from '../../../src/assets/doggy.png';
import Arrow from '@/assets/arrow_back_new.svg'
// Services
import { createPet } from '@/services/pet';
import { createAppointment } from '@/services/appointment';

const animalOptions = [
    { value: "Ovelha", label: "Ovelha", img: ovelhaImg },
    { value: "Gato", label: "Gato", img: gatoImg},
    { value: "Porco", label: "Porco", img: porcoImg },
    { value: "Vaca", label: "Vaca", img: vacaImg },
    { value: "Cavalo", label: "Cavalo", img: cavaloImg },
    { value: "Cachorro", label: "Cachorro", img: cachorroImg },
];

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();
    const [appData, setAppData] = React.useState<any>();
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isLoading, setIsLoading] = useState(false); // State for loading

    const onSubmit = async (data : any) => {
        setIsLoading(true); // When user click, define as true showing that the process has started

        try {
            // Pet data
            const petPayLoad = {
                petName: data.petName,
                ownerName: data.ownerName,
                petAge: Number(data.petAge),
                petSpecies: data.petSpecies
            }
            // Create pet
            
            const createdPet = await createPet(petPayLoad)
            console.log("Pet Criado:", petPayLoad);

            if (!createdPet || !createdPet.id) {
                throw new Error("Falha ao criar o Pet. O ID não retornou.")
            }
            // Appointment data
            const appointmentPayLoad = {
                petId: createdPet.id,
                appointmentType: data.appointmentType,
                doctorName: data.doctorName,
                appointmentDate: data.appointmentDate,
                appointmentTime: data.appointmentTime,
                problemDescription: data.problemDescription
            }
            // Create Appointment
            console.log("Enviando Consulta:", appointmentPayLoad)
            const createdAppointment = await createAppointment(appointmentPayLoad)

            if (createdAppointment) {
                setIsModalOpen(true); // Sucess
                setAppData(data)
            } else {
                throw new Error("Falha ao criar a Consulta."); // Error
            }
            
        } catch (error) {
            console.error("Erro no cadastro:", error);
            alert("Ocorreu um erro ao salvar. Verifique o console (F12) para detalhes.")
        } finally {
            setIsLoading(false); // Show that process has ended
        }
    };

    return(
        <>
            <Header />
            <div className="flex flex-col justify-center pb-4 px-6 max-w-6xl mx-auto">
                <div className="flex flex-row items-center gap-2">
                    <button type="button" onClick={() => router.push('/appointment')} className="mt-4 text-blue-500 mb-4">
                        <Image src={Arrow} alt="Voltar" />
                    </button>
                    
                    <h1 className="mb-1 text-[48px] font-bold">
                    Cadastro
                    </h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full">
                    <div className="flex gap-6 w-full">
                        <div className="flex flex-col gap-2 w-1/2 font-bold">
                            <p>Nome do Paciente</p>
                            <input {...register("petName", {required: "Preencha o nome do paciente"})} className={`p-4 h-[50px] rounded-[8px] border font-normal ${errors.petName ? 'border-red-500' : 'border-gray-300'}`} type="text" placeholder=" Digite aqui..."/>
                            {errors.petName && <span className="text-red-500 text-xs font-normal">{errors.petName.message as string}</span>}
                        </div>
                        <div className="flex flex-col gap-2 w-1/2 font-bold">
                            <p>Nome do Tutor</p>
                            <input {...register("ownerName", {required: "Preencha o nome do tutor"})} className={`p-4 h-[50px] rounded-[8px] border font-normal ${errors.ownerName ? 'border-red-500' : 'border-gray-300'}`} type="text" placeholder="Digite aqui..."/>
                            {errors.ownerName && <span className="text-red-500 text-xs font-normal">{errors.ownerName.message as string}</span>}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full font-bold"> {/* selection of species */}
                        <div className="flex flex-row items-center gap-2">
                            <p>Qual é a espécie do paciente?</p>
                            {errors.petSpecies && <span className="text-red-500 text-xs font-normal">{errors.petSpecies.message as string}</span>}
                        </div>
                        
                        <div className="grid grid-cols-3 min-[860px]:grid-cols-6 gap-4 w-full font-normal">
                            {animalOptions.map((animal) => (
                                <label key={animal.value} className="flex flex-col items-center p-4 cursor-pointer hover:shadow-lg hover:bg-gray-100 has-[:checked]:bg-blue-100 peer-checked:border-2 peer-checked:border-blue-500 rounded-lg ">
                                    <input {...register("petSpecies", {required: "Selecione a espécie do paciente"})} type="radio" name="petSpecies" value={animal.value} className={`peer hidden ${errors.petSpecies ? 'border-red-500' : 'border-gray-300'}`}/>
                                    <Image src={animal.img} alt={animal.label} width={80} height={50} />
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-7 w-full">
                        <div className="flex flex-col gap-2 w-1/2 font-bold">
                            <p>Idade do Paciente</p>
                            <input {...register("petAge", {required: "Preencha a idade do paciente"})} className={`p-4 h-[50px] rounded-[8px] border font-normal ${errors.petAge ? 'border-red-500' : 'border-gray-300'}`} type="text" placeholder="Digite aqui..."/>
                            {errors.petAge && <span className="text-red-500 text-xs font-normal">{errors.petAge.message as string}</span>}
                        </div>
                        <div className="flex flex-col gap-2 w-1/2 font-bold">
                            <p>Tipo de consulta</p>
                            <select {...register("appointmentType", {required: "Selecione o tipo de consulta"})} className={`px-4 h-[50px] rounded-[8px] border font-normal ${errors.appointmentType ? 'border-red-500' : 'border-gray-300'}`}>
                                <option value="">-- Selecione aqui --</option>
                                <option value="Checkup">Check-up</option>
                                <option value="Retorno">Retorno</option>
                                <option value="PrimeiraConsulta">Primeira Consulta</option>
                                <option value="Vacinacao">Vacinação</option>
                            </select> 
                            {errors.appointmentType && <span className="text-red-500 text-xs font-normal">{errors.appointmentType.message as string}</span>}
                        </div>
                    </div>
                    <div className="flex flex-col min-[860px]:flex-row md:gap-7 gap-2">
                        <div className="flex flex-col gap-2 min-[860px]:w-1/2 font-bold h-full">
                            <p>Médico Responsável</p>
                            <input {...register("doctorName", {required: "Preencha o nome do médico"})} className={`p-4 h-[50px] rounded-[8px] border font-normal ${errors.doctorName ? 'border-red-500' : 'border-gray-300'}`} type="text" placeholder="Digite aqui..."/>
                            {errors.doctorName && <span className="text-red-500 text-xs font-normal">{errors.doctorName.message as string}</span>}
                        </div>
                        <div className="flex flex-col gap-2 min-[860px]:w-1/4 font-bold h-full">
                            <p>Data do atendimento</p>
                            <input {...register("appointmentDate", {required: "Preencha a data do atendimento"})} className={`p-4 h-[50px] rounded-[8px] border font-normal ${errors.appointmentDate ? 'border-red-500' : 'border-gray-300'}`} type="date"/>
                            {errors.appointmentDate && <span className="text-red-500 text-xs font-normal">{errors.appointmentDate.message as string}</span>}
                        </div>
                        <div className="flex flex-col gap-2 min-[860px]:w-1/4 font-bold h-full">
                            <p>Horário do atendimento </p>
                            <input {...register("appointmentTime", {required: "Preencha o horário do atendimento"})} className={`p-4 h-[50px] rounded-[8px] border font-normal ${errors.appointmentTime ? 'border-red-500' : 'border-gray-300'}`} type="time" />
                            {errors.appointmentTime && <span className="text-red-500 text-xs font-normal">{errors.appointmentTime.message as string}</span>}
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-2 font-bold">
                        <p>Descrição do Problema</p>
                        <textarea {...register("problemDescription", {required: "Preencha a descrição do problema"})} className={`p-4 h-[104px] rounded-[8px] border w-full font-normal ${errors.problemDescription ? 'border-red-500' : 'border-gray-300'}`} />
                        {errors.problemDescription && <span className="text-red-500 text-xs font-normal">{errors.problemDescription.message as string}</span>}
                    </div>
                    <div className="text-right">
                        <button type="submit" disabled={isLoading} className={`w-[205px] h-12 rounded-3xl shadow-md border border-input inline-flex items-center justify-center text-white font-medium transition-colors ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#50E678] hover:bg-[#43C268]'}`}>
                            {isLoading ? 'Salvando' : 'Finalizar Cadastro'}
                        </button>
                    </div>
                </form>
                {/* Register modal */}
                <RegisterModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} appointmentData={appData}/>
            </div>
        </>
    )
}
