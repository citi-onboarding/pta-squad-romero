import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image";
import { Button } from "../button"
import { LogoPet } from "../../../assets"

export function RegisterModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-[205px] h-[48px] rounded-[24px] bg-[#50E678]">Finalizar Cadastro</Button>
      </DialogTrigger>
      <DialogContent className="w-[408px] h-[423px]">
        <div className="flex flex-col items-center gap-[29px]">
          <Image src={LogoPet} alt="Logo pet" />
          <p className="text-center w-[230px] h-[44px] font-[400] text-[16px]"><span className="font-[700]">Cadastro finalizado!</span> Envie o comprovante para o <span className="font-[700]">tutor</span></p>
          <div className="w-[312px] h-[80px] flex flex-col gap-[12px]">
            <p className="font-[700] w-[312px] h-[18px] text-[16px]">E-mail</p>
            <input type="email"></input>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}