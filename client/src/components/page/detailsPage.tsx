"use client";
import React, { useEffect, useState } from "react";
import { useRouter} from "next/navigation";
import Header from "../header/header";
import HistoryCard from "../card/historyCard";
import ConsultationModal from "../modal/consultationModal";
import Image from "next/image";
import { getPetById } from "@/services/pet"; 
import { getAppointments, getAppointmentById, createAppointment } from "@/services/appointment"; 
import { dog, sheep, horse, cow, cat, pig} from "../../assets"
import Arrow from "../../../src/assets/arrow_back_new.svg";
import Check from "../../../src/assets/task_alt.svg";

interface DetailsPageProps {
  appointmentId: string; 
}
interface PetData {
    id: number;
    petName: string;
    ownerName: string;
    petAge: string; 
    petSpecies: string;
}

interface AppointmentData {
    id: number;
    petId: number;
    appointmentType: string;
    appointmentDate: string; 
    appointmentTime: string; 
    doctorName: string;
    problemDescription: string;
}
interface ConsultationFormValues {
  consultationType: string;
  doctorName: string;
  date: string;
  time: string;
  problemDescription: string;
}

// appointmentId as parameter in URL
export default function DetailsPage({ appointmentId }: DetailsPageProps) {
    const router = useRouter();
    // States to store Data
    const [petData, setPetData] = useState<PetData | null>(null);
    const [allPetAppointments, setAllPetAppointments] = useState<AppointmentData[]>([]); 
    const [displayedAppointment, setDisplayedAppointment] = useState<AppointmentData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    // Function to fetch Pet and Appointment Data
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const appointmentIdNumber = Number(appointmentId);
            // Get first appointment to show
            const initialAppointment = await getAppointmentById(appointmentIdNumber);
            // Set Appointment that will appear
            setDisplayedAppointment(initialAppointment);
            // PetId will be used to search others appointments
            const targetPetId = initialAppointment.petId;
            // Search Pet details with PetId
            const petResult = await getPetById(Number(targetPetId)); 
            setPetData(petResult);
            // Search all appointments and filter by PetId
            const allAppointmentsResult = await getAppointments(); 
            const filteredAppointments = allAppointmentsResult.filter(
                (appointment: AppointmentData) => String(appointment.petId) === String(targetPetId)
            );
            // Set All Appointments
            setAllPetAppointments(filteredAppointments);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            setPetData(null);
            setAllPetAppointments([]);
            setDisplayedAppointment(null);
        } finally {
            setIsLoading(false);
        }
    };

    // useEffect to start search Data
    useEffect(() => {
        if (appointmentId) {
            fetchData();
        }
        // Clean Data if Id change
        return () => {
            setPetData(null);
            setAllPetAppointments([]);
            setDisplayedAppointment(null);
        }
    }, [appointmentId]);

    // Function to change Appointment that appears
    const handleHistoryCardClick = (appointment: AppointmentData) => {
        setDisplayedAppointment(appointment);
    };
    // Function to deal with a creation of new appointment from the modal
    const handleNewAppointmentSubmit = async (data: ConsultationFormValues) => {
        const petId = displayedAppointment?.petId; 
        if (!petId) {
            alert("Erro: ID do pet não encontrado para criar o agendamento.");
            console.error("petId não encontrado, displayedAppointment:", displayedAppointment);
            return;
        }
        try {
            // Data to create new appointment with the Pet Id
            const newAppointmentData = {
                petId: petId,
                appointmentType: data.consultationType,
                doctorName: data.doctorName,
                appointmentDate: data.date, 
                appointmentTime: data.time, 
                problemDescription: data.problemDescription,
            };
            // Create new appointment
            const createdAppointment = await createAppointment(newAppointmentData);
            if (createdAppointment) {
                alert("Novo agendamento criado com sucesso!");
                // Insert on Appointment array
                setAllPetAppointments((prevAppointments) => [
                    ...prevAppointments,
                    createdAppointment as AppointmentData, 
                ]);
            }
        } catch (error) {
            console.error("Erro ao realizar novo agendamento:", error);
            alert("Ocorreu um erro inesperado ao tentar agendar. Verifique o console.");
        }
    };

    const now = new Date();
    const historyList = allPetAppointments
        .filter((appointment) => {
            const appointmentDateTime = new Date(`${appointment.appointmentDate}T${appointment.appointmentTime}`);
            // Must be Past Appointment
            const isPast = appointmentDateTime < now;
            // Must not be the appointment that appears
            const isNotDisplayed = appointment.id !== displayedAppointment?.id;
            return isPast && isNotDisplayed;
        })
        .sort((a, b) => {
            const dateA = new Date(`${a.appointmentDate}T${a.appointmentTime}`);
            const dateB = new Date(`${b.appointmentDate}T${b.appointmentTime}`);
            return dateB.getTime() - dateA.getTime();
        });

    function species (petSpecies : string) {
    switch (petSpecies) {  // switch case with the corresponding pet image depending on the species Prop
        case "cat": 
            return cat;
        case "sheep": 
            return sheep;
        case "horse":
            return horse;
        case "cow":
            return cow;
        case "dog":
            return dog;
        case "pig":
            return pig;
        case "Gato": 
            return cat;
        case "Ovelha": 
            return sheep;
        case "Cavalo":
            return horse;
        case "Vaca":
            return cow;
        case "Cachorro":
            return dog;
        case "Porco":
            return pig;
        default:
            return cat;
            }
        };

    const formatAppointmentType = (type: string | undefined) => {
        if (!type) return "-";
        switch (type) {
            case "PrimeiraConsulta": return "Primeira Consulta";
            case "Vacinacao": return "Vacinação";
            case "Checkup": return "Check-up";
            case "Retorno": return "Retorno";
            default: return type; // Se não achar, devolve o original
        }
    };

    const getAppointmentStyle = (type: string | undefined) => {
        switch (type) {
            case "Vacinacao":
                return "bg-[#AAE1FF]";
            case "PrimeiraConsulta":
                return "bg-[#BFB5FF]";
            case "Retorno":
                return "bg-[#FF6419]";
            case "Checkup":
                return "bg-[#9CFF95]"
            default:
                return "bg-[#BFB5FF]";
            }
    };

    if (isLoading) {
        return (
            <>
                <Header />
                <div className="flex justify-center items-center h-[calc(100vh-100px)]">
                    <div className="flex flex-col items-center gap-4">
                        {/* Spinner simples com Tailwind */}
                        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                        <p className="text-gray-500 text-lg animate-pulse">Carregando detalhes...</p>
                    </div>
                </div>
            </>
        );
    }

    // If doesn't find, error message will show
    if (!displayedAppointment) {
        return (
             <>
                <Header />
                <div className="text-center p-10 text-xl text-red-500 mt-20">
                    Consulta {appointmentId} não encontrada.
                </div>
            </>
        );
    }

    if (!petData) {
        return (
            <>
                <Header />
                <div className="text-center p-10 text-xl text-red-500 mt-20">
                    Dados do paciente não encontrados.
                </div>
            </>
        );
    }

    return (
        <>
        <Header />
        <div className="flex flex-col justify-center pb-4 px-6 py-12 max-w-7xl mx-auto">
            {/* Button and Title */}
            <div className="flex flex-row items-center gap-4 mb-6">
                <button type="button" onClick={() => router.push("/appointment")}>
                    <Image src={Arrow} alt="Back arrow" />
                </button>
                <h1 className="mb-1 text-4xl font-bold">Detalhes da Consulta</h1>
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
                                src={species(petData.petSpecies)} 
                                alt={petData.petName}
                                fill
                                className="object-cover"
                            />
                        </div>
                        {/* Pet Data */}
                        <div className="flex flex-col justify-between">
                            <div className="justify-start">
                                <p className="font-bold text-[16px] mt-4">{petData.petName}</p>
                                <p>{petData.petAge ? `${petData.petAge} anos` : 'Idade desconhecida'}</p> 
                            </div>
                            <div className="justify-end">
                                <p>{petData.ownerName}</p>
                                <p>{displayedAppointment.doctorName || "-"}</p>
                            </div>
                        </div>
                    </div>
                    {/* Problem Description */}
                    <div className="mt-4">
                        <p className="font-bold text-[15px] mb-2">Descrição do Problema:</p>
                        <p className="w-full text-[14px] leading-relaxed">{displayedAppointment.problemDescription || "Sem descrição."}</p>
                    </div>
                    {/* Appointment Type */}
                    <div className="mt-4 mr-20 flex flex-row items-center gap-6">
                        <p className="font-bold text-[15px]">Tipo de Consulta:</p>
                        <p className={`text-[15px] px-2 py-1 rounded-md ${getAppointmentStyle(displayedAppointment.appointmentType)}`}>{formatAppointmentType(displayedAppointment.appointmentType)}</p>
                    </div>
                    {/* Button to open modal */}
                    <div className="flex flex-col items-center mt-5 w-full border border-gray-300 rounded-2xl p-4 shadow-sm">
                        <p className="font-bold text-[15px] mb-2">Deseja realizar outra consulta?</p>
                        <ConsultationModal onDataSubmit={handleNewAppointmentSubmit}>
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
                                appointmentType={formatAppointmentType(appointment.appointmentType)}
                                onClick={() => handleHistoryCardClick(appointment)} 
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
