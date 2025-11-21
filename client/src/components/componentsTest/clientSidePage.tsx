'use client'
import { RegisterModal } from "../modal/RegisterModal" 
import ConsultationModal from "../modal/consultationModal"
import { PetCard } from "../card/petCard"
import Header from "../header/header"
import HistoryCard from "../ui/card/historyCard"
import { useState } from "react"

export default function componentsTest(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    
    const handleDataSubmit = (data: any) => {
        console.log('Data submitted:', data);
        setIsModalOpen(false);
    };
    
    const handleDataSubmit2 = (data: any) => {
        console.log('Data submitted:', data);
        setIsModalOpen2(false);
    };
    
    return(
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Header on top */}
            <Header />
            
            {/* Main content with 3 equal sections */}
            <div className="flex-1 flex flex-row">
                {/* Left Section - Tela Atendimento */}
                <div className="flex-1 p-6 border-r border-gray-300">
                    <h2 className="text-2xl font-bold mb-6">Tela Atendimento</h2>
                    <div className="flex flex-col gap-6">
                        {/* 6 Pet Cards with different animals and appointment types */}
                        <PetCard 
                            appointmentDate="21/11/2025"
                            appointmentTime="09:00"
                            doctorName="Dr. João Silva"
                            AppointmentType="Primeira Consulta"
                            petSpecies="dog"
                            petName="Rex"
                            ownerName="Maria Santos"
                        />
                        <PetCard 
                            appointmentDate="21/11/2025"
                            appointmentTime="10:30"
                            doctorName="Dra. Ana Costa"
                            AppointmentType="Vacinação"
                            petSpecies="cat"
                            petName="Mimi"
                            ownerName="Pedro Lima"
                        />
                        <PetCard 
                            appointmentDate="21/11/2025"
                            appointmentTime="14:00"
                            doctorName="Dr. Carlos Souza"
                            AppointmentType="Retorno"
                            petSpecies="horse"
                            petName="Trovão"
                            ownerName="José Oliveira"
                        />
                        <PetCard 
                            appointmentDate="21/11/2025"
                            appointmentTime="15:30"
                            doctorName="Dra. Beatriz Alves"
                            AppointmentType="Check-up"
                            petSpecies="cow"
                            petName="Mimosa"
                            ownerName="Fernando Rocha"
                        />
                        <PetCard 
                            appointmentDate="22/11/2025"
                            appointmentTime="09:30"
                            doctorName="Dr. Ricardo Mendes"
                            AppointmentType="Primeira Consulta"
                            petSpecies="sheep"
                            petName="Dolly"
                            ownerName="Carla Dias"
                        />
                        <PetCard 
                            appointmentDate="22/11/2025"
                            appointmentTime="11:00"
                            doctorName="Dra. Lucia Fernandes"
                            AppointmentType="Vacinação"
                            petSpecies="pig"
                            petName="Babe"
                            ownerName="Roberto Martins"
                        />
                        
                        {/* Appointment Modal */}
                        <div className="mt-6">
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Abrir Modal de Consulta
                            </button>
                            <ConsultationModal 
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                onDataSubmit={handleDataSubmit}
                            />
                        </div>
                    </div>
                </div>

                {/* Middle Section - Tela Cadastro */}
                <div className="flex-1 p-6 border-r border-gray-300 flex flex-col items-center">
                    <h2 className="text-2xl font-bold mb-6">Tela Cadastro</h2>
                    <RegisterModal />
                </div>

                {/* Right Section - Tela Detalhamento */}
                <div className="flex-1 p-6">
                    <h2 className="text-2xl font-bold mb-6">Tela Detalhamento</h2>
                    <div className="flex flex-col gap-6">
                        {/* 5 History Cards */}
                        <HistoryCard 
                            appointmentDate="20/11"
                            appointmentTime="09:00"
                            doctorName="Dr. João Silva"
                            appointmentType="Primeira Consulta"
                        />
                        <HistoryCard 
                            appointmentDate="19/11"
                            appointmentTime="14:30"
                            doctorName="Dra. Ana Costa"
                            appointmentType="Vacinação"
                        />
                        <HistoryCard 
                            appointmentDate="18/11"
                            appointmentTime="10:00"
                            doctorName="Dr. Carlos Souza"
                            appointmentType="Check-up"
                        />
                        <HistoryCard 
                            appointmentDate="15/11"
                            appointmentTime="16:00"
                            doctorName="Dra. Beatriz Alves"
                            appointmentType="Retorno"
                        />
                        <HistoryCard 
                            appointmentDate="14/11"
                            appointmentTime="11:30"
                            doctorName="Dr. Ricardo Mendes"
                            appointmentType="Primeira Consulta"
                        />
                        
                        {/* Appointment Modal */}
                        <div className="mt-6">
                            <button 
                                onClick={() => setIsModalOpen2(true)}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Abrir Modal de Consulta
                            </button>
                            <ConsultationModal 
                                isOpen={isModalOpen2}
                                onClose={() => setIsModalOpen2(false)}
                                onDataSubmit={handleDataSubmit2}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}