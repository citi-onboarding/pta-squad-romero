import { dog, sheep, horse, cow, cat, pig, clock} from "../../assets"
import Image from "next/image";
type Props = {
  appointmentDate : string,
  appointmentTime : string,
  doctorName : string,
  appointmentType : string,
  petSpecies : string,
  petName : string,
  ownerName : string,
  status : string
}

export function PetCard({appointmentDate, appointmentTime, doctorName, appointmentType, petSpecies, petName, ownerName, status} : Props) {
    function species (petSpecies : string) {
    switch (petSpecies) {  // switch case with the corresponding pet image depending on the species Prop
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
    
    function background(status: string, appointmentType: string): string {

        if (status === "past") {
            return "bg-[#F0F0F0]";
        }

        switch (appointmentType) {
            case "Primeira Consulta":
                return "bg-[#BFB5FF]"; 
            case "Vacinacao":
                return "bg-[#AAE1FF]"; 
            case "Retorno":
                return "bg-[#FF6419]"; 
            case "Checkup":
                return "bg-[#9CFF95]"; 
            default:
                return "bg-[#BFB5FF]";
        }
    }

    const backgroundColor = background(status, appointmentType);
    return(
    <div className={`w-40 h-96 md:w-full md:h-[135px] flex justify-between rounded-2xl py-4 px-6 ${backgroundColor} items-center flex-col md:flex-row`}> 
        <div className="flex flex-col gap-2 bg-white bg-opacity-80 py-3 px-[6px] items-center justify-center rounded-sm">
            <Image src={clock} alt="clock" className="w-5 h-5" />  {/* div with the clock icon and texts */}
            <p className="font-bold text-sm text-center">{appointmentDate}</p>
            <p className="font-bold text-sm text-center">{appointmentTime}</p>
        </div>
        <p className="text-sm text-center"><span className="font-bold">{petName}</span> / {ownerName}</p>
        <p className="text-sm text-center">{doctorName}</p>
        <div className="gap-2 flex flex-col items-center"> {/* div with the pet image and the type of appointment */}
            <Image src={species(petSpecies)} alt="animal" className="w-[69px] h-[70px]" />
            <div className="rounded-sm p-[6px] gap-2 bg-white bg-opacity-80">
                <p className="text-xs text-center">{appointmentType}</p>
            </div>
        </div>
    </div>
    );
}