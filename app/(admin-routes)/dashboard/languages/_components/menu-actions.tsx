"use client";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ILanguage } from "@/app/interfaces/models/ILanguage";
import { PlusIcon, UploadIcon } from "lucide-react";
import AddLanguageDialog from "./add-language-dialog";
import ExportLanguages from "./export-languages";
import ImportLanguages from "./import-languages";
import { useState } from "react";

interface IProps {
  languages: ILanguage[];
}

export function MenuActions({ languages }: IProps) {
    const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} modal={true} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger>
        <DotsHorizontalIcon />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>Ações</DialogHeader>
        <DialogDescription>O que deseja fazer?</DialogDescription>

        <ImportLanguages
          languages={languages}
          icon={<UploadIcon />}
          triggerText="Importar linguagens"
          widthFull={false}
          handleChangeModal={() => setOpen(!open)}
        />

        <ExportLanguages
          languages={languages}
          icon={<UploadIcon />}
          triggerText="Exportar linguagens"
          widthFull={false}
        />

        <AddLanguageDialog
          triggerText="Adicionar"
          widthFull={false}
          icon={<PlusIcon />}
          handleModalChange={() => setOpen(!open)}
        />
      </DialogContent>
    </Dialog>
  );
}
