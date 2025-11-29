"use client"
import React from "react"
import { useRouter } from "next/navigation"
import Header from "../header/header"
import HistoryCard from "../card/historyCard"
import Image from "next/image"

import Arrow from "../../../src/assets/arrow_back_new.svg"

export default function DetailsPage() {
    const router = useRouter()

    const mockAppointment = {
        appointmentDate: "12/08",
        appointmentTime: "14:00",
        doctorName: "Dr. João Silva",
        appointmentType: "Consulta de rotina",
    }

    return (
        <>
            <Header />
            <div className="flex flex-col justify-center pb-4 px-6 py-6 max-w-6xl mx-auto">
                {/* Button and Title */}
                <div className="flex flex-row items-center gap-4">
                    <button type="button" onClick={() => router.push('/appointment')}>
                        <Image src={Arrow} alt="Back arrow" />
                    </button>
                    
                    <h1 className="mb-1 text-[48px] font-bold">
                    Detalhes da Consulta
                    </h1>
                </div>
                {/* History Card */}
                <div className="flex flex-col items-center mt-8">
                    <HistoryCard
                    appointmentDate={mockAppointment.appointmentDate}
                    appointmentTime={mockAppointment.appointmentTime}
                    doctorName={mockAppointment.doctorName}
                    appointmentType={mockAppointment.appointmentType}
                />
                </div>
                
                
            



            </div>
            
            
        </>
    )
    }