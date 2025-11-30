"use client";
import React, { useEffect, useState } from "react";
import { useRouter} from "next/navigation";
import Header from "../header/header";
import HistoryCard from "../card/historyCard";
import ConsultationModal from "../modal/consultationModal";
import Image from "next/image";

// Images
import gatoImg from '../../../src/assets/cat.svg';
import cachorroImg from '../../../src/assets/doggy.png';
import Arrow from "../../../src/assets/arrow_back_new.svg";
import Check from "../../../src/assets/task_alt.svg";

// Mock data for backend
const mockPatients = [
  {
    id: "1",
    petName: "Rex",
    ownerName: "Carlos Silva",
    petAge: "5 anos",   
    image: cachorroImg
  },

  {
    id: "2",
    petName: "Félix",
    ownerName: "Pedro Costa",
    petAge: "3 anos",
    image: gatoImg
  },
];

const mockAllAppointments = [
  {
    id: 101,
    petId: "1",
    appointmentDate: "2025-08-12",
    appointmentTime: "14:00",
    doctorName: "Dr. João Paulo",
    appointmentType: "Consulta de rotina",
    problemDescription: "O animal apresenta falta de apetite e cansaço excessivo há 2 dias.",
  },
  {
    id: 102,
    petId: "1",
    appointmentDate: "2025-08-13",
    appointmentTime: "09:30",
    doctorName: "Dra. Camila Andrade",
    appointmentType: "Vacinação",
    problemDescription: "O animal está com tosse persistente e secreção nasal."
  },
  {
    id: 103,
    petId: "1",
    appointmentDate: "2025-08-14",
    appointmentTime: "11:00",
    doctorName: "Dr. Rafael Moura",
    appointmentType: "Retorno",
    problemDescription: "O animal tem febre, coceira na orelha e machucados na pele.",
  },
  {
    id: 104,
    petId: "1",
    appointmentDate: "2025-08-15",
    appointmentTime: "16:20",
    doctorName: "Dra. Ana Beatriz",
    appointmentType: "Exame de sangue",
    problemDescription: "O animal possui sintomas como enjoo, dificuldade em andar e fraqueza.",
  }
];
// This componente expects a ID prop to identify the pet
interface DetailsPageProps {
  petId: string;
}

export default function DetailsPage({ petId }: DetailsPageProps) {
    const router = useRouter();
    const currentPatient = mockPatients.find((p) => p.id === petId);

    const petAppointments = mockAllAppointments.filter(app => app.petId === petId);
    const sortedAppointments = petAppointments.sort((a, b) => {
        const dateA = new Date(`${a.appointmentDate}T${a.appointmentTime}`);
        const dateB = new Date(`${b.appointmentDate}T${b.appointmentTime}`);
        return dateB.getTime() - dateA.getTime(); 
    });
    // Controls wich appointment is on screen
    const [displayedAppointment, setDisplayedAppointment] = useState(sortedAppointments[0] || null);

    // If data changes, state reset
    useEffect(() => {
        if (sortedAppointments.length > 0) {
            setDisplayedAppointment(sortedAppointments[0])
        }
    }, [petId]);
    // Filter history based on current patient
    const now = new Date();
    const historyList = mockAllAppointments.filter((appointment) => {
        const isSamePet = appointment.petId === petId;
        const appointmentDateTime = new Date(`${appointment.appointmentDate}T${appointment.appointmentTime}`);
        const isPast = appointmentDateTime < now;
        const isNotDisplayed = appointment.id !== displayedAppointment?.id;
        return isSamePet && isPast && isNotDisplayed;
    });

    // Order history by date descending
    historyList.sort((a, b) => {
        const dateA = new Date(`${a.appointmentDate} ${a.appointmentTime}`);
        const dateB = new Date(`${b.appointmentDate} ${b.appointmentTime}`);
        return dateB.getTime() - dateA.getTime();
    });

    if (!currentPatient) {
        return <div>Paciente não encontrado.</div>;
    }
    
    return (
        <>
        <Header />
        <div className="flex flex-col justify-center pb-4 px-6 py-6 max-w-6xl mx-auto">
            {/* Button and Title */}
            <div className="flex flex-row items-center gap-4">
                <button type="button" onClick={() => router.push("/appointment")}>
                    <Image src={Arrow} alt="Back arrow" />
                </button>
                <h1 className="mb-1 text-[32px] sm:text-[40px] md:text-[48px] font-bold">Detalhes da Consulta</h1>
            </div>

            {/* Pacient and History */}
            <div className="flex flex-col lg:flex-row justify-between gap-8">
                <div className="flex flex-col w-full lg:w-[500px]">
                    {/* Pacient */}
                    <p className="font-bold text-[24px]">Paciente</p>
                    {/* Pet and data */}
                    <div className="flex flex-row gap-8 mt-4">
                        <div className="w-[150px] h-[180px] sm:w-[200px] sm:h-[250px] relative mt-4">
                            <Image
                                src={currentPatient.image}
                                alt={currentPatient.petName}
                                fill
                                className="object-cover"
                            />
                        </div>
                        {/* Pet Data */}
                        <div className="flex flex-col justify-between">
                            <div className="justify-start">
                                <p className="font-bold text-[16px] mt-4">{currentPatient.petName}</p>
                                <p>{currentPatient.petAge}</p>
                            </div>
                            <div className="justify-end">
                                <p>{currentPatient.ownerName}</p>
                                <p>{displayedAppointment?.doctorName || "-"}</p>
                            </div>
                        </div>
                    </div>
                    {/* Problem Description */}
                    <div className="mt-4">
                        <p className="font-bold text-[15px] mb-2">Descrição do Problema:</p>
                        <p className="w-full text-[14px] leading-relaxed">{displayedAppointment?.problemDescription || "Sem descrição."}</p>
                    </div>
                    {/* Appointment Type */}
                    <div className="mt-4 mr-20 flex flex-row items-center gap-6">
                        <p className="font-bold text-[15px]">Tipo de Consulta:</p>
                        <p className="text-[15px] bg-blue-200 px-2 py-1 rounded-md">{displayedAppointment?.appointmentType || "-"}</p>
                    </div>
                    {/* Button to open modal */}
                    <div className="flex flex-col items-center mt-5 w-full border border-gray-300 rounded-2xl p-4 shadow-sm">
                        <p className="font-bold text-[15px] mb-2">Deseja realizar outra consulta?</p>
                        <ConsultationModal>
                            <button className="bg-[#50E678] text-white rounded-full w-full py-2 flex flex-row items-center justify-center gap-2 shadow-sm hover:bg-[#43C268] transition-colors">
                                <Image src={Check} alt="Check" className="brightness-0 invert"/>
                                Agendamento
                            </button>
                        </ConsultationModal>
                    </div>
                    
                </div> 
                
                {/* History Card */}
                <div className="flex flex-col w-full lg:items-end lg:w-auto items-center mt-4 lg:mt-0">
                    <div className="w-full max-w-md lg:w-[510px] mx-auto lg:mx-0">
                        <p className="font-bold text-[24px] mb-4 text-center lg:text-left">Histórico de Consultas</p>
                        <div className="space-y-4 border border-gray-300 rounded-2xl p-4 shadow-sm">
                            {historyList.length > 0 ? (
                            historyList.map((appointment) => (
                            <HistoryCard
                                key={appointment.id}
                                appointmentDate={new Date(appointment.appointmentDate + 'T' + appointment.appointmentTime)
                                .toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                                appointmentTime={appointment.appointmentTime}
                                doctorName={appointment.doctorName}
                                appointmentType={appointment.appointmentType}
                                onClick={() => setDisplayedAppointment(appointment)}
                            />
                            ))
                        ) : (
                            <p className="text-center">Nenhum histórico de consultas encontrado.</p>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
);
}
