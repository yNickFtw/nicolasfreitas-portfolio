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
import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { ILanguage } from "@/app/interfaces/models/ILanguage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Copy, Download, Upload } from "lucide-react";

interface IProps {
  triggerText: string;
  widthFull: boolean;
  icon: ReactNode;
  languages: ILanguage[];
}

export default function ExportLanguages({
  triggerText,
  widthFull,
  icon,
  languages,
}: IProps) {
  const [languagesSelected, setLanguagesSelected] = useState<string[]>([]);
  const [languagesObjSelected, setLanguagesObjSelected] = useState<ILanguage[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [exported, setExported] = useState<boolean>(false);

  const router = useRouter();

  function handleSelectLanguage(languageId: string, language: ILanguage): void {
    let newLanguagesSelected;
    let newLanguagesObjSelected;

    if (languagesSelected.includes(languageId)) {
      newLanguagesSelected = languagesSelected.filter(
        (id) => id !== languageId
      );

      newLanguagesObjSelected = languagesObjSelected.filter(
        (language) => language.id !== languageId
      );
    } else {
      newLanguagesSelected = [...languagesSelected, languageId];
      newLanguagesObjSelected = [...languagesObjSelected, language];
    }

    setLanguagesSelected(newLanguagesSelected);
    setLanguagesObjSelected(newLanguagesObjSelected);
  }

  const handleExport = () => {
    setExported(true);
  };

  const handleBack = () => {
    setExported(false);
  };

  const handleSelectAll = () => {
    let newArrayLanguagesIds: string[] = [];

    for (let i = 0; i < languages.length; i++) {
      const element = languages[i];

      newArrayLanguagesIds.push(element.id!);
    }

    setLanguagesSelected(newArrayLanguagesIds);
    setLanguagesObjSelected(languages);
  };

  const handleUnselectAll = () => {
    setLanguagesSelected([]);
    setLanguagesObjSelected([]);
  };

  const handleDownloadJSON = () => {
    const languagesToJSON = languagesObjSelected.map((language) => {
      return { name: language.name, icon: language.icon, slug: language.slug };
    });

    const jsonData = JSON.stringify(languagesToJSON);

    const blob = new Blob([jsonData], { type: "application/json" });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "languages.json";
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    setLanguagesObjSelected([]);
    setLanguagesSelected([]);
    handleBack();
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
          <DialogDescription>
            Escolha as linguagens que você gostaria de exportar.
          </DialogDescription>

          <section
            className={`flex ${
              exported ? "justify-between" : "justify-end"
            } items-center gap-3`}
          >
            {exported && (
              <Button
                variant={"ghost"}
                className="text-xl"
                onClick={handleBack}
              >
                <ArrowLeft />
              </Button>
            )}
            {!exported && (
              <>
                <Button variant={"default"} onClick={handleSelectAll}>
                  Selecionar todos
                </Button>
                <Button variant={"default"} onClick={handleUnselectAll}>
                  Desmarcar todos
                </Button>{" "}
              </>
            )}
          </section>
        </DialogHeader>

        <ScrollArea className="h-96">
          {exported && (
            <pre className="bg-zinc-800 p-2 rounded-md">
              <code>
                {languagesObjSelected.map((language, index) => (
                  <div>
                    {`{ 
    "name": "${language.name}", 
    "icon": "${language.icon}", 
    "slug": "${language.slug}"
}${index === languages.length - 1 ? "" : ","}`}
                  </div>
                ))}
              </code>
            </pre>
          )}
          {!exported && (
            <main className="flex flex-col w-full gap-2">
              {languages.map((language) => (
                <div
                  key={language.id}
                  className={`flex flex-row justify-normal items-center select-none gap-2 p-2 border rounded-sm border-zinc-800 transition ${
                    languagesSelected.includes(language.id!) &&
                    "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
                  }`}
                  onClick={() => handleSelectLanguage(language.id!, language)}
                >
                  <h2>{language.name}</h2>
                  <i className={`${language.icon} dark:colored`}></i>
                </div>
              ))}
            </main>
          )}
        </ScrollArea>

        <DialogFooter>
          {!exported && (
            <Button
              variant={"default"}
              className="w-full"
              onClick={handleExport}
              disabled={languagesObjSelected.length < 1}
            >
              <Upload /> Exportar
            </Button>
          )}
          {exported && (
            <Button
              variant={"default"}
              className="w-full flex items-center gap-2"
              onClick={handleDownloadJSON}
            >
              <Download /> Download JSON
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
