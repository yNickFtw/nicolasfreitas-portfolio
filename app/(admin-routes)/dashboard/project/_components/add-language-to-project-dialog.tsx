"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReactNode, useState } from "react";
import { ILanguage } from "@/app/interfaces/models/ILanguage";
import { ScrollArea } from "@/components/ui/scroll-area";
import TechnologyService from "@/app/services/technology-linker";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface IProps {
  triggerText: string;
  widthFull: boolean;
  icon: ReactNode;
  languages: ILanguage[];
  projectId: string;
}

export default function AddLanguageToProjectDialog({
  triggerText,
  widthFull,
  icon,
  languages,
  projectId,
}: IProps) {
  const [languagesSelected, setLanguagesSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const technologyService = new TechnologyService();

  const router = useRouter()

  function handleSelectLanguage(languageId: string): void {
    let newLanguagesSelected;

    if (languagesSelected.includes(languageId)) {
      newLanguagesSelected = languagesSelected.filter(
        (id) => id !== languageId
      );
    } else {
      newLanguagesSelected = [...languagesSelected, languageId];
    }

    setLanguagesSelected(newLanguagesSelected);
  }

  const handleSendToApi = async () => {
    setLoading(true);

    const response = await technologyService.addTechToProject(
      languagesSelected,
      projectId
    );

    if (response.statusCode === 201) {
      toast({
        title: response.data.message,
        variant: "default",
      });

      router.refresh();

      setLanguagesSelected([])
      setLoading(false)
    }

    if (response.statusCode === 400) {
      toast({
        title: response.data.message,
        variant: "destructive",
      });
    }

    setLoading(false);
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
          <DialogTitle>Adicionar linguagem</DialogTitle>
          <DialogDescription>
            Selecione as tecnologias que deseja adicionar
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-96">
          <main className="flex flex-col w-full gap-2">
            {languages.map((language) => (
              <div
                key={language.id}
                className={`flex flex-row justify-normal items-center select-none gap-2 p-2 border rounded-sm border-zinc-800 transition ${
                  languagesSelected.includes(language.id!) &&
                  "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
                }`}
                onClick={() => handleSelectLanguage(language.id!)}
              >
                <h2>{language.name}</h2>
                <i className={`${language.icon} dark:colored`}></i>
              </div>
            ))}
          </main>
        </ScrollArea>

        <DialogFooter>
          <DialogClose className="w-full">
            <Button
              className="w-full transition"
              onClick={handleSendToApi}
              disabled={
                languagesSelected.length >= 1 && !loading ? false : true
              }
            >
              Adicionar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
