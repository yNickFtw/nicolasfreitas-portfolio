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
import { ChangeEvent, ReactNode, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ILanguage } from "@/app/interfaces/models/ILanguage";
import { Input } from "@/components/ui/input";
import { isValidJSONFormat } from "@/app/shared/utils/isValidJSONFormat";
import { toast } from "@/components/ui/use-toast";
import LanguageService from "@/app/services/language";
import { Loader2 } from "lucide-react";

interface IProps {
  triggerText: string;
  widthFull: boolean;
  icon: ReactNode;
  languages: ILanguage[];
  handleChangeModal?: Function
}

interface IJSONLanguages {
  name: string;
  icon: string;
  slug: string;
}

export default function ImportLanguages({
  triggerText,
  widthFull,
  icon,
  languages,
  handleChangeModal
}: IProps) {
  const [file, setFile] = useState<any>(null);
  const [JSONLanguages, setJSONLanguages] = useState<IJSONLanguages[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const inputElement = useRef<HTMLInputElement | null>(null);

  const languageService = new LanguageService();

  const handleResetInput = () => {
    if (inputElement.current) {
      inputElement.current.value = "";
    }
  };

  const handleResetFileAndJSON = () => {
    setJSONLanguages([])
    setFile(null);
  }

  const router = useRouter();

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    if (file) {
      const reader = new FileReader();

      reader.readAsText(file);

      reader.onload = () => {
        const isJSONValid = isValidJSONFormat(reader.result as string, true);

        if (isJSONValid) {
          setFile(file);

          const jsonData = JSON.parse(reader.result as string);

          setJSONLanguages(jsonData);
        } else {
          toast({
            title: "Formato inválido.",
            description: "O arquivo que você fez o upload não é válido.",
            variant: "destructive",
          });
          handleResetInput();
        }
      };
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    if(JSONLanguages.length < 1) {
      toast({
        title: "O JSON está vazio.",
        variant: "destructive"
      })
      return
    }

    const objectAlreadyExists = JSONLanguages.some((item) =>
      languages.some(
        (language) =>
          language.name === item.name &&
          language.icon === item.icon &&
          language.slug === item.slug
      )
    );

    if (objectAlreadyExists) {
      toast({
        title:
          "Neste JSON contém uma linguagem que já está cadastrada no banco de dados.",
        variant: "destructive",
      });
      setLoading(false);

      handleResetInput();

      handleResetFileAndJSON();

      setLoading(false);
      return;
    }

    const response = await languageService.import(JSONLanguages);

    if (response.statusCode === 201) {
      toast({
        title: response.data.message,
        variant: "default",
      });

      setOpen(false);
      if(handleChangeModal) {
        handleChangeModal();
      }
      router.refresh();
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
    <Dialog open={open} modal={true} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button
          className={`${widthFull && "w-full"}`}
          onClick={() => setOpen(true)}
        >
          {icon && icon} {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Exportar Linguagens</DialogTitle>
          <DialogDescription>Faça o upload do arquivo JSON</DialogDescription>
        </DialogHeader>

        <Input
          type="file"
          onChange={handleChangeFile}
          accept="application/json"
          ref={inputElement}
        />

        <DialogFooter>
          <Button className="w-full" onClick={handleSubmit} disabled={loading || JSONLanguages.length < 1}>
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
              </>
            ) : (
              <>Importar</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
