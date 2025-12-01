import Image from "next/image";
import { Arrow } from "@/assets";

interface AppointmentCardProps {
  appointmentDate: string;
  appointmentTime: string;
  doctorName: string;
  appointmentType: string;
  onClick: () => void
}

export default function HistoryCard({
  appointmentDate,
  appointmentTime,
  doctorName,
  appointmentType,
  onClick
}: AppointmentCardProps) {
  return (
    <div>
      <div
        className="flex flex-col sm:flex-row items-center w-full max-w-[510px] min-h-[82px] rounded-[16px]
        py-4 px-6 gap-4 sm:gap-0 bg-[#F0F0F0]"
      >
        {/* Date and time box */}
        <div className="flex flex-col items-center justify-center w-[51px] h-[50px] rounded-[4px] p-[6px] gap-2 bg-white shrink-0">
          <span className="text-sm font-bold text-black leading-[110%]">
            {appointmentDate}
          </span>
          <span className="text-sm font-bold text-black leading-[110%]">
            {appointmentTime}
          </span>
        </div>
        {/* Appointment type */}
        <p className="flex items-center justify-center flex-1 text-sm font-bold text-black leading-[110%] text-center">
          {appointmentType}
        </p>
        {/* Doctor name */}
        <p className="flex items-center justify-center flex-1 text-sm font-normal text-black leading-[110%] text-center">
          {doctorName}
        </p>
        {/* Arrow */}
        <button 
            type="button" 
            onClick={onClick}
            className="flex items-center justify-center rotate-180 shrink-0">
          <Image src={Arrow} alt="Ver detalhes"/>
        </button>
      </div>
    </div>
  );
}
