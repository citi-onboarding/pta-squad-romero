import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../button"

export function RegisterModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-[205px] h-[48px] rounded-[24px] bg-[#50E678]">Finalizar Cadastro</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Title</DialogTitle>
        </DialogHeader>
        <div>

        </div>
      </DialogContent>
    </Dialog>
  );
}