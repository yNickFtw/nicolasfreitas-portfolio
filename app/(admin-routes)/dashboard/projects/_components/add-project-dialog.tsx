"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import FormCreateProject from "./form-create-project";

interface IProps {
    triggerText: string;
    widthFull: boolean;
    icon: ReactNode | null;
}

export default function AddProjectDialog({ triggerText, widthFull, icon }: IProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={`${widthFull && "w-full"}`}>
          {icon && icon} {triggerText}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar projeto</DialogTitle>
          <DialogDescription>
            Preencha as informações abaixo para prosseguir
          </DialogDescription>
        </DialogHeader>
        <section className="w-full">
            <FormCreateProject />
        </section>
      </DialogContent>
    </Dialog>
  );
}
