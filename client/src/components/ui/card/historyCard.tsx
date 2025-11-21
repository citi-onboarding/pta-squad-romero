import Image from "next/image";
import { Arrow } from "@/assets";

interface AppointmentCardProps {
  appointmentDate: string;
  appointmentTime: string;
  doctorName: string;
  appointmentType: string;
}

export default function HistoryCard({
  appointmentDate,
  appointmentTime,
  doctorName,
  appointmentType,
}: AppointmentCardProps) {
  return (
    <div>
      <div
        className="flex flex-wrap flex-col sm:flex-row w-full max-w-[510px] min-h-[82px] rounded-[16px]
        py-4 px-6 gap-8 bg-[#F0F0F0]"
      >
        {/* Date and time box */}
        <div className="flex flex-col items-center justify-center mx-auto w-[51px] h-[50px] rounded-[4px] p-[6px] gap-2 bg-white">
          <span className="text-sm font-bold text-black leading-[110%]">
            {appointmentDate}
          </span>
          <span className="text-sm font-bold text-black leading-[110%]">
            {appointmentTime}
          </span>
        </div>
        {/* Appointment type */}
        <p className="flex items-center text-sm font-bold text-black leading-[110%]">
          {appointmentType}
        </p>
        {/* Doctor name */}
        <p className="flex items-center justify-center text-sm font-normal text-black leading-[110%]">
          {doctorName}
        </p>
        {/* Arrow */}
        <a href="#" className="flex items-center justify-center rotate-180">
          <Image src={Arrow} alt="Arrow"/>
        </a>
      </div>
    </div>
  );
}
