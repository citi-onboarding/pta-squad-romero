import Image from "next/image";

import { LogoCITi } from "../assets";
import { RegisterModal } from '../components/ui/modal/RegisterModal';
import { PetCard } from '../components/ui/card/petCard';

export default function Home() {
  return (
    <div className="flex flex-1 flex-col h-full justify-around items-center bg-black">
      <PetCard appointmentDate="18/02" appointmentTime="13:00" doctorName="Dr. José Carlos" AppointmentType="Check-up" petName="Luna" ownerName="João Alves" petSpecies="sheep" />
      <div>
        <Image src={LogoCITi} alt="Logo citi" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-white text-4xl font-bold">NextJS Boilerplate</h1>
        <p className="text-white text-xl">
          Made with <strong>&lt; &#x0002F; &gt;</strong> and{" "}
          <strong>&hearts;</strong> by CITi
        </p>
      </div>
    </div>
  );
}
