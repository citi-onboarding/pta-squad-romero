"use client";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import React, { useRef } from 'react';
import { Input } from "@/components/ui/input"
import Image from "next/image";
import { Button } from "../button"
import { LogoPet } from "../../../assets"

export function RegisterModal() {
  const emailRef : any = useRef();
  const onSubmit = (e : any) => {
    e.preventDefault();
    if (emailRef.current.value == "") {
      alert("Por favor, insira um email válido")
    } else alert(emailRef.current.value);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-[205px] h-[48px] rounded-3xl bg-[#50E678]">Finalizar Cadastro</Button>
      </DialogTrigger>
      <DialogContent className="w-[408px] h-[423px] rounded-3xl">
        <form onSubmit={onSubmit} className="flex flex-col items-center gap-[29px] m-7">
          <Image src={LogoPet} alt="Logo pet" />
          <p className="text-center w-[230px] h-[44px] font-[400] text-[16px]"><span className="font-[700]">Cadastro finalizado!</span> Envie o comprovante para o <span className="font-[700]">tutor</span></p>
          <div className="w-[312px] h-[80px] flex flex-col gap-[12px]">
            <p className="font-[700] w-[312px] h-[18px] text-[16px]">E-mail</p>
            <Input ref={emailRef} type="email" placeholder="Digite aqui..." className="w-[312px] h-[50px] border-black placeholder-gray-400" />
          </div>
            <Button type="submit" className="w-[312px] h-[42px] rounded-3xl bg-[#50E678] shadow-md">Enviar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}