"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChangeEvent, ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { ILanguage } from "@/app/interfaces/models/ILanguage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Copy, Download, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";

interface IProps {
  triggerText: string;
  widthFull: boolean;
  icon: ReactNode;
  languages: ILanguage[];
}

export default function ImportLanguages({
  triggerText,
  widthFull,
  icon,
  languages,
}: IProps) {
  const [file, setFile] = useState<any>(null);
  const [jsonLanguages, setJsonLanguages] = useState<string>("");

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    if (file) {
      setFile(file);

      const reader = new FileReader();

      reader.readAsText(file);
    
      reader.onload = () => {
        console.log(reader.result);

        const jsonData = JSON.parse(reader.result as string);

        console.log(jsonData);
        

      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={`${widthFull && "w-full"}`}>
          {icon && icon} {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Exportar Linguagens</DialogTitle>
          <DialogDescription>Faça o upload do arquivo JSON</DialogDescription>
        </DialogHeader>

        <Input type="file" onChange={handleChangeFile} />

        <DialogFooter>
          <Button className="w-full">Importar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
