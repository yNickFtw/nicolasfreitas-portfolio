"use client";

import { ILanguage } from "@/app/interfaces/models/ILanguage";
import LanguageService from "@/app/services/language";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface IProps {
  language: ILanguage;
}

export default function LanguageCard({ language }: IProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const languageService = new LanguageService();

  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);

    const response = await languageService.delete(language.id!);

    if (response.statusCode === 200) {
      toast({
        title: response.data.message,
        variant: "default",
      });

      router.refresh();
      setOpen(false);
    }

    if(response.statusCode === 403) {
      toast({
        title: response.data.message,
        description: response.data.description,
        variant: "destructive",
      });
      setOpen(false);
    }

    if (response.statusCode === 404) {
      toast({
        title: response.data.message,
        variant: "destructive",
      });
    }

    if (response.statusCode === 401) {
      await signOut({
        redirect: false,
      });

      router.replace("/user/login");
    }

    setLoading(false);
  };

  return (
    <Card className="w-[250px]" key={language.id}>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>{language.name}</CardTitle>

        <AlertDialog open={open}>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger>
              <DotsHorizontalIcon width={15} height={15} />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuLabel>Ações</DropdownMenuLabel>

              <DropdownMenuSeparator />

              <AlertDialogTrigger onClick={() => setOpen(true)}>
                <DropdownMenuItem className="text-red-600">
                  Remover linguagem
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Você tem certeza disso?</AlertDialogTitle>
                <AlertDialogDescription>
                  Se você remover esta tecnologia você poderá adicionar ela
                  novamente.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setOpen(false)}>
                  Cancelar
                </AlertDialogCancel>
                <Button
                  variant={"destructive"}
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {loading && <Loader2 className="animate-spin" />}
                  {!loading && <>Confirmar</>}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </DropdownMenu>
        </AlertDialog>
      </CardHeader>

      <CardContent className="w-full flex flex-col justify-center items-center">
        <section key={language.id}>
          <i className={`${language.icon} dark:colored text-8xl`}></i>
        </section>
      </CardContent>

      <CardFooter>
        <Button className="w-full">Editar</Button>
      </CardFooter>
    </Card>
  );
}
