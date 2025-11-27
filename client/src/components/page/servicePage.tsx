"use client";
import Header from "../header/header";
import { PetCard } from "../card/petCard";
import { ChevronLeft, CalendarIcon } from "lucide-react";
import ConsultationModal from "../modal/consultationModal";
import { Button } from "../ui/button";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar"; 
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils"; // Certifique-se de que este utilitário existe
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DateRange } from "react-day-picker"; 


const activeAppointmentsMock = [
  {
    id: 1,
    date: "26/11", 
    time: "13:00",
    doctor: "Dr. José Carlos",
    type: "Vacinação",
    species: "cat",
    name: "Luna",
    owner: "João Alves",
  },
  {
    id: 2,
    date: "27/11", 
    time: "14:00",
    doctor: "Dr. José Carlos",
    type: "Check-up",
    species: "cat",
    name: "Luna",
    owner: "João Alves",
  },
  {
    id: 3,
    date: "28/11",
    time: "15:00",
    doctor: "Dr. José Carlos",
    type: "Primeira Consulta",
    species: "cat",
    name: "Luna",
    owner: "João Alves",
  },
  {
    id: 4,
    date: "29/11",
    time: "16:00",
    doctor: "Dr. José Carlos",
    type: "Retorno",
    species: "dog",
    name: "Luna",
    owner: "João Alves",
  },
  {
    id: 5,
    date: "30/11",
    time: "17:00",
    doctor: "Dr. José Carlos",
    type: "Check-up",
    species: "dog",
    name: "Luna",
    owner: "João Alves",
  },
  {
    id: 6,
    date: "01/12", 
    time: "18:00",
    doctor: "Dr. José Carlos",
    type: "Vacinação",
    species: "cat",
    name: "Luna",
    owner: "João Alves",
  },
];

const historyAppointmentsMock = [
  {
    id: 7,
    date: "01/11", 
    time: "10:00",
    doctor: "Dr. José Carlos",
    type: "Vacinação",
    species: "dog",
    name: "Luna",
    owner: "João Alves",
  },
  {
    id: 8,
    date: "02/11", 
    time: "11:00",
    doctor: "Dr. José Carlos",
    type: "Retorno",
    species: "cat",
    name: "Luna",
    owner: "João Alves",
  },
  {
    id: 9,
    date: "03/11", 
    time: "12:00",
    doctor: "Dr. José Carlos",
    type: "Primeira Consulta",
    species: "dog",
    name: "Luna",
    owner: "João Alves",
  },
  {
    id: 10,
    date: "04/11", 
    time: "13:00",
    doctor: "Dr. José Carlos",
    type: "Vacinação",
    species: "cat",
    name: "Luna",
    owner: "João Alves",
  },
  {
    id: 11,
    date: "05/11", 
    time: "14:00",
    doctor: "Dr. José Carlos",
    type: "Check-up",
    species: "dog",
    name: "Luna",
    owner: "João Alves",
  },
  {
    id: 12,
    date: "06/11", 
    time: "15:00",
    doctor: "Dr. José Carlos",
    type: "Retorno",
    species: "cat",
    name: "Luna",
    owner: "João Alves",
  },
];


const allAppointments = [...activeAppointmentsMock, ...historyAppointmentsMock];

// Converte "DD/MM" para um objeto Date.
const parseDate = (dateString: string) => {
  const [day, month] = dateString.split('/').map(Number);
  // Usa o ano atual para garantir a comparação
  const year = new Date().getFullYear();
  return new Date(year, month - 1, day); 
};

export default function ServicePage() {
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [searchText, setSearchText] = useState(""); 
  const [appliedSearch, setAppliedSearch] = useState("");

  // Data de hoje
  const today = new Date();
  today.setHours(0, 0, 0, 0);


  const filteredAppointments = allAppointments.filter(appointment => {
    const appointmentDate = parseDate(appointment.date);
    const normalizedAppointmentDate = new Date(appointmentDate.setHours(0, 0, 0, 0));

    if (activeTab === "active") {
      return normalizedAppointmentDate >= today;
    } else {
      return normalizedAppointmentDate < today;
    }
  });

  const dateFilteredAppointments = filteredAppointments.filter(appointment => {
    // Se não há filtro de data, retorna tudo
    if (!dateRange || !dateRange.from) {
      return true; 
    }

    const appointmentDate = parseDate(appointment.date);
    const normalizedAppointmentDate = new Date(appointmentDate.setHours(0, 0, 0, 0));
    const normalizedStartDate = new Date(dateRange.from.setHours(0, 0, 0, 0));
    
    const normalizedEndDate = dateRange.to 
      ? new Date(dateRange.to.setHours(0, 0, 0, 0))
      : normalizedStartDate;

    const isAfterStart = normalizedAppointmentDate >= normalizedStartDate;
    const isBeforeEnd = normalizedAppointmentDate <= normalizedEndDate;

    return isAfterStart && isBeforeEnd;
  });

const normalizedSearchText = appliedSearch.toLowerCase().trim();

const appointmentsToShow = dateFilteredAppointments.filter(appointment => {
  if (!normalizedSearchText) {
    return true; 
  }
  const doctorMatch = appointment.doctor.toLowerCase().includes(normalizedSearchText);

  return doctorMatch
});

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
                value={searchText} 
                onChange={(e) => setSearchText(e.target.value)} 
              />

              <Button 
              onClick={() => setAppliedSearch(searchText)}
              className="py-3 px-8 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-3xl shadow-md">
                Buscar
              </Button>
            </div>
          </div>

          <div className="flex items-center mt-8 mb-6">

            <div className="flex bg-gray-100 rounded-lg w-fit p-1 shadow-inner mr-4">
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

            <div className="flex items-center ml-auto">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[120px] justify-start text-left font-normal border-gray-300 h-10",
                      !dateRange?.from && "text-muted-foreground"
                    )}
                  >
                    {dateRange?.from ? (
                      format(dateRange.from, "dd/MM/yy", { locale: ptBR })
                    ) : (
                      <span className="text-sm  text-black">dd/mm/aa</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-50" align="start">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    locale={ptBR}
                    numberOfMonths={2} //mostra dois meses
                  />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[120px] justify-start text-left font-normal border-gray-300 ml-2 h-10",
                      !dateRange?.to && "text-muted-foreground"
                    )}
                  >
                    {dateRange?.to ? (
                      format(dateRange.to, "dd/MM/yy", { locale: ptBR })
                    ) : (
                      <span className="text-sm text-black">dd/mm/aa</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-50" align="start">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    locale={ptBR}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
              
              {dateRange?.from && (
                <Button 
                    variant="ghost" 
                    onClick={() => setDateRange(undefined)} 
                    className="ml-2 h-10 px-3 text-red-500 hover:text-red-700"
                >
                    Limpar
                </Button>
              )}
            </div>
            
          </div>

        </div>
        <div className="max-w-screen-2xl mx-auto w-full px-8 grid lg:grid-cols-3 md:grid-cols-2 gap-6 mb-12">
          {appointmentsToShow.length > 0 ? (
            appointmentsToShow.map((appointment) => {
              // Calcula o status dinamicamente para passar ao PetCard
              const appointmentStatus = 
                parseDate(appointment.date).setHours(0, 0, 0, 0) >= today.getTime() ? "present" : "past";
              
              return (
                <PetCard
                  key={appointment.id}
                  appointmentDate={appointment.date}
                  appointmentTime={appointment.time}
                  doctorName={appointment.doctor}
                  appointmentType={appointment.type}
                  petSpecies={appointment.species}
                  petName={appointment.name}
                  ownerName={appointment.owner}
                  status={appointmentStatus} 
                />
              );
            })
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