'use client';
import Header from "../header/header";
import { PetCard } from "../card/petCard";
import { ChevronLeft } from "lucide-react"; 
import ConsultationModal from "../modal/consultationModal";
import { Button } from "../ui/button";
import { useState } from "react";

const activeAppointments = [
  {
    id: 1,
    date: "18/02",
    time: "13:00",
    doctor: "Dr. José Carlos",
    type: "Vacinação",
    species: "cat",
    name: "Luna",
    owner: "João Alves",
    status: "present",
  },
  {
    id: 2,
    date: "18/02",
    time: "13:00",
    doctor: "Dr. José Carlos",
    type: "Vacinação",
    species: "cat",
    name: "Luna",
    owner: "João Alves",
    status: "present",
  },
  {
    id: 3,
    date: "18/02",
    time: "13:00",
    doctor: "Dr. José Carlos",
    type: "Primeira Consulta",
    species: "cat",
    name: "Luna",
    owner: "João Alves",
    status: "present",
  },
  {
    id: 4,
    date: "18/02",
    time: "13:00",
    doctor: "Dr. José Carlos",
    type: "Check-up",
    species: "cat",
    name: "Luna",
    owner: "João Alves",
    status: "present",
  },
  {
    id: 5,
    date: "18/02",
    time: "13:00",
    doctor: "Dr. José Carlos",
    type: "Retorno",
    species: "cat",
    name: "Luna",
    owner: "João Alves",
    status: "present",
  },
  {
    id: 6,
    date: "18/02",
    time: "13:00",
    doctor: "Dr. José Carlos",
    type: "Primeira Consulta",
    species: "cat",
    name: "Luna",
    owner: "João Alves",
    status: "present",
  },
];

const historyAppointments = [
  {
    id: 7,
    date: "18/02",
    time: "13:00",
    doctor: "Dr. José Carlos",
    type: "Vacinação",
    species: "cat",
    name: "Luna",
    owner: "João Alves",
    status: "past",
  },
  {
    id: 8,
    date: "18/02",
    time: "13:00",
    doctor: "Dr. José Carlos",
    type: "Retorno",
    species: "cat",
    name: "Luna",
    owner: "João Alves",
    status: "past",
  },
  {
    id: 9,
    date: "18/02",
    time: "13:00",
    doctor: "Dr. José Carlos",
    type: "Primeira Consulta",
    species: "cat",
    name: "Luna",
    owner: "João Alves",
    status: "past",
  },
  {
    id: 10,
    date: "18/02",
    time: "13:00",
    doctor: "Dr. José Carlos",
    type: "Primeira Consulta",
    species: "cat",
    name: "Luna",
    owner: "João Alves",
    status: "past",
  },
  {
    id: 11,
    date: "18/02",
    time: "13:00",
    doctor: "Dr. José Carlos",
    type: "Check-up",
    species: "cat",
    name: "Luna",
    owner: "João Alves",
    status: "past",
  },
  {
    id: 12,
    date: "18/02",
    time: "13:00",
    doctor: "Dr. José Carlos",
    type: "Vacinação",
    species: "cat",
    name: "Luna",
    owner: "João Alves",
    status: "past",
  },
];

export default function ServicePage() {
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");

  const appointmentsToShow =
    activeTab === "active" ? activeAppointments : historyAppointments;

  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      <Header />
      <div className="px-10 py-6">
        <div className="max-w-screen-2xl mx-auto w-full px-8 py-4">
          <h1 className="text-4xl font-bold gap-4 flex items-center mt-4">
            <ChevronLeft className="inline-block text-gray-500 cursor-pointer" />
            Atendimento
          </h1>

          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-800">
              Qual o médico?
            </h2>

            <div className="flex items-center space-x-4 mt-2">

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
          <div className="flex mt-8 mb-6 bg-gray-100 rounded-lg w-fit p-1 shadow-inner">
            <Button
              onClick={() => setActiveTab("active")}
              className={`
                ${
                  activeTab === "active"
                    ? "bg-gray-300 text-black font-semibold shadow-md"
                    : "bg-transparent text-gray-600 hover:bg-gray-200"
                }
                rounded-lg px-6 py-2 transition-all duration-150
              `}
            >
              Agendamento
            </Button>
            <Button
              onClick={() => setActiveTab("history")}
              className={`
                ${
                  activeTab === "history"
                    ? "bg-gray-300 text-black font-semibold shadow-md"
                    : "bg-transparent text-gray-600 hover:bg-gray-200"
                }
                rounded-lg px-6 py-2 transition-all duration-150
              `}
            >
              Historico
            </Button>
          </div>
        </div>
        <div className="max-w-screen-2xl mx-auto w-full px-8 grid lg:grid-cols-3 md:grid-cols-2 gap-6 mb-12">
          {appointmentsToShow.length > 0 ? (
            appointmentsToShow.map((appointment) => (
              <PetCard
                key={appointment.id}
                appointmentDate={appointment.date}
                appointmentTime={appointment.time}
                doctorName={appointment.doctor}
                appointmentType={appointment.type}
                petSpecies={appointment.species}
                petName={appointment.name}
                ownerName={appointment.owner}
                status={appointment.status}
              />
            ))
          ) : (
            <p className="text-gray-500 px-8">
              Nenhum agendamento encontrado nesta seção.
            </p>
          )}
        </div>
        
        <div className="max-w-screen-2xl mx-auto w-full px-8 mb-12">
          <ConsultationModal>
            <Button className="w-[180px] h-[48px] rounded-full py-3 px-8 bg-[#50E678] hover:bg-[#43C268] text-white font-bold shadow-md">
              Nova Consulta
            </Button>
          </ConsultationModal>
        </div>
      </div>
    </div>
  );
}