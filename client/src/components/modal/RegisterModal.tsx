"use client";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import React, { useRef } from 'react';
import { Input } from "@/components/ui/input"
import Image from "next/image";
import { Button } from "../ui/button"
import { LogoCITiPet } from "@/assets";

export function RegisterModal() {
  const emailRef : any = useRef(); // By using ref, it gets the text inputed on the email field and tranfers it to the alert msg
  const onSubmit = (e : any) => {
    e.preventDefault(); // if the email field is empty, it shows the adequate message
    if (emailRef.current.value == "") {
      alert("Por favor, insira um email válido")
    } else alert(emailRef.current.value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-[205px] h-12 rounded-3xl bg-[#50E678] shadow-md border border-input inline-flex items-center justify-center font-medium transition-colors hover:bg-[#43C268]">
          Finalizar Cadastro
        </button>
      </DialogTrigger>
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