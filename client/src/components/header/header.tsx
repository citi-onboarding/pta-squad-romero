'use client';

import Image from "next/image";
import { LogoCitiPet, MadeByCiti } from "@/assets";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    
    const pathname = usePathname()

    return (
    <header className="flex flex-row items-center w-full justify-between py-5 px-12 border-b border-[#D9D9D9] bg-white">
      {/* Logo CITi */}
      <div>
        <Image src={LogoCitiPet} alt="Logo citi pet" />
      </div>
      {/* Atendimento/Cadastro */}
      <div className="flex flex-1 justify-center md:flex flex-row gap-12">
        <Link href="http://localhost:3000/appointment" className={`pb-1 ${pathname === '/appointment' ? 'border-b-2 border-green-500' : ''}`}>
            Atendimento
        </Link>
        <Link href="/register" className={`pb-1 ${pathname === '/register' ? 'border-b-2 border-green-500' : ''}`}>
            Cadastro
        </Link>
      </div>
      {/* Made by CITi */}
      <div className="hidden md:block">
        <Image src={MadeByCiti} alt="Made by citi" />
      </div>
    </header>
  );
}
