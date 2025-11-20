import { dog, sheep, horse, cow, cat, pig, clock} from "../../../assets"
import Image from "next/image";
type Props = {
  appointmentDate : string,
  appointmentTime : string,
  doctorName : string,
  AppointmentType : string,
  petSpecies : string,
  petName : string,
  ownerName : string
}

export function PetCard({appointmentDate, appointmentTime, doctorName, AppointmentType, petSpecies, petName, ownerName} : Props) {
    function species (petSpecies : string) {
    switch (petSpecies) {
        case "cat": 
            return cat;
        case "sheep":
            return sheep;
        case "horse":
            return horse;
        case "cow":
            return cow;
        case "dog":
            return dog;
        case "pig":
            return pig;
        default: 
            return cat;
            }
        };
    
    function background (AppointmentType : string) {
    switch (AppointmentType) {
        case "Primeira Consulta":
            return "bg-[#BFB5FF]";
        case "Vacinação":
            return "bg-[#AAE1FF]";
        case "Retorno":
            return "bg-[#FF6419]";
        case "Check-up":
            return "bg-[#9CFF95]";
        default:
            return "bg-[#BFB5FF]";
    }
}
    
    const backgroundColor = background(AppointmentType);
    return(
    <div className={`w-[494.67px] h-[135px] flex justify-between rounded-2xl pt-[16px] pb-[16px] pl-[24px] pr-[24px] ${backgroundColor} items-center`}>
        <div className="flex flex-col gap-2 bg-white bg-opacity-80 pt-[12px] pb-[12px] pl-[6px] pr-[6px] items-center justify-center rounded-sm">
            <Image src={clock} alt="clock" className="w-5 h-5" />
            <p className="font-bold text-sm text-center">{appointmentDate}</p>
            <p className="font-bold text-sm text-center">{appointmentTime}</p>
        </div>
        <p className="text-sm text-center"><span className="font-bold">{petName}</span> / {ownerName}</p>
        <p className="text-sm text-center">{doctorName}</p>
        <div className="gap-2 flex flex-col items-center">
            <Image src={species(petSpecies)} alt="animal" className="w-[69px] h-[70px]" />
            <div className="rounded-sm p-[6px] gap-2 bg-white bg-opacity-80">
                <p className="text-xs text-center">{AppointmentType}</p>
            </div>
        </div>
    </div>
    );
}