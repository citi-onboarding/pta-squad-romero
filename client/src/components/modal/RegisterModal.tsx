"use client";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import React, { useRef } from 'react';
import { Input } from "@/components/ui/input"
import Image from "next/image";
import { Button } from "../ui/button"
import { LogoCITiPet } from "@/assets";
import { sendAppointmentConfirmation } from "@/services/appointment";

interface AppointmentData {
    petName: string;
    ownerName: string;
    doctorName: string;
    appointmentType: string;
    appointmentDate: string; 
    appointmentTime: string; 
}

interface RegisterModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    appointmentData: AppointmentData | null;
}

export function RegisterModal({ isOpen, setIsOpen, appointmentData }: RegisterModalProps) {
  const emailRef : any = useRef(); // By using ref, it gets the text inputed on the email field and tranfers it to the alert msg
  
  const onSubmit = async (e : React.FormEvent) => {
    e.preventDefault(); // if the email field is empty, it shows the adequate message
    e.stopPropagation();

    const email = emailRef.current?.value;

    if (!email || email === "") {
      alert("Por favor, insira um email válido");
      return ;
    } 

    if (!appointmentData) {
        alert("Erro: Dados da consulta não encontrados. Recarregue a página.");
        return; 
    }

    const emailSubject = {
        userEmail: email,
        petName: appointmentData.petName,
        ownerName: appointmentData.ownerName,
        doctorName: appointmentData.doctorName,
        appointmentType: appointmentData.appointmentType,
        appointmentDate: appointmentData.appointmentDate,
        appointmentTime: appointmentData.appointmentTime, 
    };
    
    try {
        await sendAppointmentConfirmation(emailSubject); 
        alert(`E-mail de confirmação enviado para: ${email}`);
        setIsOpen(false); 
        
    } catch (error) {
        alert("Falha ao enviar e-mail de confirmação. Verifique o console.");
        console.error("Erro ao enviar e-mail:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[408px] h-[423px] rounded-3xl  shadow-md">
        <form onSubmit={onSubmit} className="flex flex-col items-center gap-[29px] m-7"> {/* beginning of form with an email input element */}
          <Image src={LogoCITiPet} alt="Logo pet" />
          <p className="text-center w-[230px] h-11 font-[400] text-base"><span className="font-[700]">Cadastro finalizado!</span> Envie o comprovante para o <span className="font-[700]">tutor</span></p>
          <div className="w-[312px] h-20 flex flex-col gap-3"> {/* div that contains the email text and input element */}
            <p className="font-[700] w-[312px] h-[18px] text-base">E-mail</p>
            <Input ref={emailRef} type="email" placeholder="Digite aqui..." className="w-[312px] h-[50px] border-black placeholder-gray-400" />
          </div>
            <Button type="submit" className="w-[312px] h-[42px] rounded-3xl bg-[#50E678] shadow-md">Enviar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}