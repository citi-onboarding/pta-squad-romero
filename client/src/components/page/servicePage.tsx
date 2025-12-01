"use client";
import Header from "../header/header";
import { PetCard } from "../card/petCard";
import { ChevronLeft, CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import Link from "next/link";
import { getAppointments } from "@/services/appointment";
import { getPetById } from "@/services/pet";
// Function to format Data from yyyy-mm-dd to dd/mm if the year is the current or dd/mm/aaaa if is not the current year
const formatDisplayDate = (dateObject: Date): string => {
  const currentYear = new Date().getFullYear();
  // Verify if the Date year is the same as the current year
  if (dateObject.getFullYear() === currentYear) {
    return format(dateObject, "dd/MM", { locale: ptBR });
  } else {
    return format(dateObject, "dd/MM/yyyy", { locale: ptBR });
  }
};
// Turn date string (only yyyy-mm-dd format) into an object Date
const parseDate = (dateString: string | null | undefined): Date => {
  if (!dateString || typeof dateString !== "string") {
    // if Date is invalid, return Nan
    return new Date(NaN);
  }
  if (dateString.includes("-")) {
    const parts = dateString.split("-").map(Number);
    if (parts.length === 3 && !parts.some(isNaN)) {
      const [year, month, day] = parts;
      if (month >= 1 && month <= 12) {
        // Constructor Date uses 0 to 11 months, that's why we subtracte 1
        return new Date(year, month - 1, day);
      }
    }
  }
  // return Nan if Date is not on the expected format (ex.: dd/mm/yyyy)
  return new Date(NaN);
};

export default function ServicePage() {
  const [allAppointments, setAllAppointments] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [searchText, setSearchText] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");

  // Today's Date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const fetchData = async () => {
    try {
      // Fetch all Appointments.
      const appointments = await getAppointments();
      // Fetch Pet data for each appointment
      const combinedDataPromises = appointments.map(
        async (appointment: any) => {
          try {
            // Fetch pet data using the ID from the appointment
            const petData = await getPetById(appointment.petId);
            return {
              ...appointment,
              petName: petData.petName,
              ownerName: petData.ownerName,
              petSpecies: petData.petSpecies,
              petAge: petData.petAge,
            };
          } catch (petError) {
            console.log(`Pet ID ${appointment.petId} not found.`, petError);
            return null;
          }
        }
      );
      const combinedData = await Promise.all(combinedDataPromises);
      setAllAppointments(combinedData);
    } catch (error) {
      console.error( "ERROR during fetchData:",error);
      setAllAppointments([]);
    }
  };
  // useEffect to call the data fetching function only once on mount
  useEffect(() => {
    fetchData();
  }, []);
  // Date Filter
  const filteredAppointments = allAppointments.filter((appointment) => {
    const appointmentDate = parseDate(appointment.appointmentDate);
    const normalizedAppointmentDate = new Date(
      appointmentDate.setHours(0, 0, 0, 0)
    );

    if (activeTab === "active") {
      return normalizedAppointmentDate >= today;
    } else {
      return normalizedAppointmentDate < today;
    }
  });
  // Calendar filter
  const dateFilteredAppointments = filteredAppointments.filter(
    (appointment) => {
      // If calendar is empty, returns all
      if (!dateRange || !dateRange.from) {
        return true;
      }

      const appointmentDate = parseDate(appointment.appointmentDate);
      const normalizedAppointmentDate = new Date(
        appointmentDate.setHours(0, 0, 0, 0)
      );
      const normalizedStartDate = new Date(dateRange.from.setHours(0, 0, 0, 0));

      const normalizedEndDate = dateRange.to
        ? new Date(dateRange.to.setHours(0, 0, 0, 0))
        : normalizedStartDate;

      const isAfterStart = normalizedAppointmentDate >= normalizedStartDate;
      const isBeforeEnd = normalizedAppointmentDate <= normalizedEndDate;

      return isAfterStart && isBeforeEnd;
    }
  );
  // Text Filter
  const normalizedSearchText = appliedSearch.toLowerCase().trim();

  const appointmentsToShow = dateFilteredAppointments.filter((appointment) => {
    if (!normalizedSearchText) {
      return true;
    }
    const doctorMatch = appointment.doctorName
      .toLowerCase()
      .includes(normalizedSearchText);

    return doctorMatch;
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
                className="py-3 px-8 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-3xl shadow-md"
              >
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
                        ? "bg-gray-300 text-black font-semibold shadow-md hover:bg-gray-400"
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
                        ? "bg-gray-300 text-black font-semibold shadow-md hover:bg-gray-400"
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
                    numberOfMonths={1}
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
                    numberOfMonths={1}
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
        <div className="max-w-7xl lg:max-w-screen-2xl mx-auto w-full pl-8 grid lg:grid-cols-3 grid-cols-2 gap-14 mb-12">
          {appointmentsToShow.length > 0 ? (
            appointmentsToShow.map((appointment) => {
              // Turn appointmentDate (from DB) into Object
              const appointmentDateObject = parseDate( appointment.appointmentDate );
              // Format Date
              const displayDate = formatDisplayDate(appointmentDateObject);
              // Checks Status
              const appointmentStatus =
                appointmentDateObject.setHours(0, 0, 0, 0) >=
                today.getTime()
                  ? "present"
                  : "past";

              return (
                <Link href={`/detailing[id]`}>
                  <PetCard
                    key={appointment.id}
                    appointmentDate={displayDate}
                    appointmentTime={appointment.appointmentTime}
                    doctorName={appointment.doctorName}
                    appointmentType={appointment.appointmentType}
                    petSpecies={appointment.petSpecies}
                    petName={appointment.petName}
                    ownerName={appointment.ownerName}
                    status={appointmentStatus}
                  />
                </Link>
              );
            })
          ) : (
            <p className="text-gray-500 px-8">
              Nenhum agendamento encontrado nesta seção.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}