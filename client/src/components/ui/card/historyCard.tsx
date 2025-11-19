interface AppointmentCardProps {
    appointmentDate: string;
    appointmentTime: string;
    doctorName: string;
    appointmentType: string;
}

export default function AppointmentCard({
    appointmentDate,
    appointmentTime,
    doctorName,
    appointmentType
}: AppointmentCardProps) {

    return (
    <div>
        <div className="flex flex-row w-[510px] h-[82px] rounded-[16px]
         justify-between pt-[16px] pr-[24px] pl-[24px] pb-[16px]
          gap-[32px] bg-[#F0F0F0]">
            {/* Date and time box */}
            <div className="flex flex-col items-center justify-center w-[51px] h-[50px] rounded-[4px] p-[6px] gap-[8px] bg-[#FFFFFF] ">
                <span className="text-[14px] font-bold text-[#000000] leading-[110%]">
                    {appointmentDate}
                </span>
                <span className="text-[14px] font-bold text-[#000000] leading-[110%]">
                    {appointmentTime}
                </span>
            </div>
            {/* Appointment type */}
            <p className="flex items-center text-[14px] font-bold text-[#000000] leading-[110%]">
                {appointmentType}
            </p>
            {/* Doctor name */}
            <p className="flex items-center text-[14px] font-normal text-[#000000] leading-[110%]">
                {doctorName}
            </p>    
            {/* Arrow */}
            <a href="#" className="flex items-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform rotate-180">
                    <path d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z" fill="#101010"/>
                </svg>
            </a>
        </div>
    </div>)
    
}