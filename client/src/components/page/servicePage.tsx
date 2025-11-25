'use client'
import Header from "../header/header"
import { PetCard } from "../card/petCard"
import { ArrowLeft } from "lucide-react"
import ConsultationModal from "../modal/consultationModal"
import { Button } from "../ui/button"
import { useState } from 'react';

const activeAppointments = [
    {
        id: 1,
        date: "20/08/2024",
        time: "14:30",
        doctor: "Dr. João Silva",
        type: "Vacinação",
        species: "dog",
        name: "Rex",
        owner: "Maria Oliveira",
        status: "active"
    },
    {
        id: 2,
        date: "22/08/2024",
        time: "10:00",
        doctor: "Dr. Ana Souza",
        type: "Consulta",
        species: "cat",
        name: "Miau",
        owner: "João Pereira",
        status: "active"
    }
];

const historyAppointments = [
    {
        id: 3,
        date: "18/02/2024",
        time: "13:00",
        doctor: "Dr. José Carlos",
        type: "Primeira Consulta",
        species: "cat",
        name: "Luna",
        owner: "João Alves",
        status: "past"
    },
    {
        id: 4,
        date: "18/02/2024",
        time: "13:00",
        doctor: "Dr. José Carlos",
        type: "Retorno",
        species: "cat",
        name: "Luna",
        owner: "João Alves",
        status: "past"
    },
];


export default function ServicePage() {
    const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
    const appointmentsToShow = activeTab === 'active' 
        ? activeAppointments 
        : historyAppointments;

    return(
        <div className="w-full min-h-screen flex flex-col bg-white">
            <Header />

            <div className="max-w-7xl mx-auto w-full px-8 py-4">
                {/* --- Cabeçalho e Título --- */}
                <h1 className="text-4xl font-bold gap-4 flex items-center mt-4">
                    <ArrowLeft className="inline-block text-gray-500 cursor-pointer"/>
                    Atendimento
                </h1>

                {/* --- Busca do Médico (Ajustes de Altura e Borda) --- */}
                <div className="mt-6">
                    <h2 className="text-lg font-medium text-gray-800">Qual o médico?</h2>
                    <div className="flex items-center space-x-4 mt-2">
                        {/* 1. Barra de Pesquisa: Borda preta, altura fixa (h-12) e largura padrão (max-w-md) */}
                        <input 
                            type="text" 
                            className="p-2 border border-black rounded-lg flex-grow max-w-sm" 
                            placeholder="Pesquise aqui..." 
                        />
                        <Button className="py-3 px-8 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-3xl shadow-md">
                            Buscar
                        </Button>
                    </div>
                </div>

                {/* --- Tabs de Navegação (Design Cinza Claro) --- */}
                <div className="flex mt-8 mb-6 bg-gray-100 rounded-lg w-fit p-1 shadow-inner">
                    {/* Botão Agendamento */}
                    <Button 
                        onClick={() => setActiveTab('active')}
                        className={`
                            ${activeTab === 'active' ? 'bg-gray-300 text-black font-semibold shadow-md' : 'bg-transparent text-gray-600 hover:bg-gray-200'} 
                            rounded-lg px-6 py-2 transition-all duration-150
                        `}
                    >
                        Agendamento
                    </Button>
                    {/* Botão Histórico */}
                    <Button 
                        onClick={() => setActiveTab('history')}
                        className={`
                            ${activeTab === 'history' ? 'bg-gray-300 text-black font-semibold shadow-md' : 'bg-transparent text-gray-600 hover:bg-gray-200'} 
                            rounded-lg px-6 py-2 transition-all duration-150
                        `}
                    >
                        Historico
                    </Button>
                </div>
            </div>

            {/* --- Cards de Agendamento --- */}
            <div className="max-w-7xl mx-auto w-full px-8 flex flex-wrap gap-6 mb-12">
                {appointmentsToShow.length > 0 ? (
                    appointmentsToShow.map((appointment) => (
                        <PetCard 
                            key={appointment.id}
                            appointmentDate={appointment.date}
                            appointmentTime={appointment.time}
                            doctorName={appointment.doctor}
                            AppointmentType={appointment.type}
                            petSpecies={appointment.species}
                            petName={appointment.name}
                            ownerName={appointment.owner}
                        />
                    ))
                ) : (
                    <p className="text-gray-500 px-8">Nenhum agendamento encontrado nesta seção.</p>
                )}
            </div>      

            {/* --- Botão Nova Consulta --- */}
            <div className="max-w-7xl mx-auto w-full px-8 mb-12">
                <ConsultationModal>
                    <Button className="w-[180px] h-[48px] rounded-full py-3 px-8 bg-[#50E678] hover:bg-[#43C268] text-white font-bold shadow-md">
                        Nova Consulta
                    </Button>
                </ConsultationModal>
            </div>
        </div>
    )
}
