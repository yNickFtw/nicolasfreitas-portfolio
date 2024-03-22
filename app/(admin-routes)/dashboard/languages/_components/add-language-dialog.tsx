"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormAddLanguage from "../../overview/_components/form-add-language";
import { Button } from "@/components/ui/button";
import { ChangeEvent, FormEvent, ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import LanguageService from "@/app/services/language";
import { toast } from "@/components/ui/use-toast";

interface IProps {
  triggerText: string;
  widthFull: boolean;
  icon: ReactNode;
  handleModalChange?: Function
}

export default function AddLanguageDialog({
  triggerText,
  widthFull,
  icon,
  handleModalChange
}: IProps) {
  const [name, setName] = useState<string>("");
  const [iconLanguage, setIcon] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const languageService = new LanguageService();
  const router = useRouter();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);

    e.preventDefault();

    const response = await languageService.create({
      name,
      icon: iconLanguage,
      slug,
    });

    if (response.statusCode === 201) {
      toast({
        title: response.data.message,
        description: `Agora você pode acessar a linguagem ${name}.`,
        variant: "default",
      });
      router.refresh();
      
      setOpen(false)

      if(handleModalChange) {
        handleModalChange();
      }

      setName("");
      setIcon("")
      setSlug("")

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
        <Button className={`${widthFull && "w-full"}`}>
          {icon && icon} {triggerText}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar linguagem</DialogTitle>
          <DialogDescription>
            Preencha as informações abaixo para prosseguir
          </DialogDescription>
        </DialogHeader>
        <section className="w-full">
          <FormAddLanguage
            handleNameChange={handleNameChange}
            handleIconChange={(e) => setIcon(e.target.value)}
            handleSlugChange={(e) => setSlug(e.target.value)}
            name={name}
            icon={iconLanguage}
            slug={slug}
            handleSubmit={handleSubmit}
          >
            <DialogClose>
              <Button type="submit" disabled={loading || !name || !iconLanguage || !slug} className="w-full">
                Adicionar
              </Button>
            </DialogClose>
          </FormAddLanguage>
        </section>
      </DialogContent>
    </Dialog>
  );
}
