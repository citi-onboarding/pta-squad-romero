"use client";
import Header from "../header/header";
import { PetCard } from "../card/petCard"; // Final rendering component
import { ChevronLeft, CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import Link from "next/link";
import { getAppointments } from "@/service/appointment"; 
import { getPetById } from "@/service/pet"; 


const parseDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        console.error("Invalid appointment date. Check API format (expected YYYY-MM-DD):", dateString);
        return new Date(0); 
    }
    return date;
};


export default function ServicePage() {
    const [allAppointments, setAllAppointments] = useState<any[]>([]); 
    const [activeTab, setActiveTab] = useState("active");
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
    const [searchText, setSearchText] = useState("");
    const [appliedSearch, setAppliedSearch] = useState("");


    // Fetch appointment and pet Data
    const fetchData = async () => {
        try {
            // Fetch all Appointments. 
            const appointments = await getAppointments()
            console.log(` Appointments fetched: ${appointments.length}`);

            // Fetch Pet data for each appointment 
            const combinedDataPromises = appointments.map(async (appointment: any) => {
                try {
                    // Fetch pet data using the ID from the appointment
                    const petData: any = await getPetById(appointment.petId);
                    return {
                        ...appointment,
                        petName: petData.petName,
                        ownerName: petData.ownerName,
                        petSpecies: petData.petSpecies,
                        petAge: petData.petAge,
                    };
                } catch (petError) {
                    console.warn(`[DEBUG] Step 2 Error: Pet ID ${appointment.petId} not found. Using fallback.`, petError);
                    return null;
                }
            });

            const combinedData = await Promise.all(combinedDataPromises);
            setAllAppointments(combinedData);
            console.log(`Final combined data set. Total items: ${combinedData.length}`);

        } catch (error) {
            console.error("ERROR during fetchData (check getAppointments service):", error);
            setAllAppointments([]);
        }
    };


    // useEffect to call the data fetching function only once on mount
    useEffect(() => {
        fetchData();
    }, []); 

    // Today's date for filtering
    const today = new Date();
    today.setHours(0, 0, 0, 0);


    // Filtering Logic

    const filteredAppointments = allAppointments.filter((appointment: any) => {
        const appointmentDate = parseDate(appointment.date);
        const normalizedAppointmentDate = new Date(
            appointmentDate.setHours(0, 0, 0, 0)
        );

        if (activeTab === "active") {
            return normalizedAppointmentDate >= today;
        } else {
            return normalizedAppointmentDate < today;
        }
    });

    const dateFilteredAppointments = filteredAppointments.filter(
        (appointment: any) => {
            if (!dateRange || !dateRange.from) {
                return true;
            }

            const appointmentDate = parseDate(appointment.date);
            const normalizedAppointmentDate = new Date(
                appointmentDate.setHours(0, 0, 0, 0)
            );
            const normalizedStartDate = dateRange.from ? new Date(dateRange.from.getTime()) : null;
            if(normalizedStartDate) normalizedStartDate.setHours(0, 0, 0, 0);

            const normalizedEndDate = dateRange.to ? new Date(dateRange.to.getTime()) : normalizedStartDate;
            if(normalizedEndDate) normalizedEndDate.setHours(0, 0, 0, 0);
            
            if (!normalizedStartDate) return true;

            const isAfterStart = normalizedAppointmentDate >= normalizedStartDate;
            const isBeforeEnd = normalizedAppointmentDate <= normalizedEndDate!;

            return isAfterStart && isBeforeEnd;
        }
    );

    const normalizedSearchText = appliedSearch.toLowerCase().trim();

    const appointmentsToShow = dateFilteredAppointments.filter((appointment: any) => {
        if (!normalizedSearchText) {
            return true;
        }
        const doctorMatch = appointment.doctor
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
                        appointmentsToShow.map((appointment: any) => {
                            // Calculate status for PetCard
                            const appointmentStatus =
                                parseDate(appointment.date).setHours(0, 0, 0, 0) >=
                                today.getTime()
                                    ? "present"
                                    : "past";

                            return (
                                <Link key={appointment.id} href={`/detailing[id]`}>
                                    <PetCard
                                        // Appointment data 
                                        appointmentDate={parseDate(appointment.date).toLocaleDateString('pt-BR')}
                                        appointmentTime={appointment.time}
                                        doctorName={appointment.doctor}
                                        appointmentType={appointment.type}
                                        status={appointmentStatus}
                                        // Combined Pet data 
                                        petSpecies={appointment.petSpecies}
                                        petName={appointment.petName}
                                        ownerName={appointment.ownerName}
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