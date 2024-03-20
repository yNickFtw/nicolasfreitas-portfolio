"use client";

import { ILanguage } from "@/app/interfaces/models/ILanguage";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import TechnologyService from "@/app/services/technology-linker";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

interface IProps {
  technologyLinkerId: string;
  language: ILanguage;
}

export default function TableRowLanguages({
  technologyLinkerId,
  language,
}: IProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const technologyLinkerService = new TechnologyService();
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);

    const response = await technologyLinkerService.removeTechFromTechLinkerId(
      technologyLinkerId
    );

    if (response.statusCode === 200) {
      toast({
        title: response.data.message,
        variant: "default",
      });
      router.refresh();

      setOpen(false);
    }

    if (response.statusCode !== 200) {
      toast({
        title: response.data.message,
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <TableRow>
      <TableCell>{language?.name}</TableCell>
      <TableCell>{language?.slug}</TableCell>
      <TableCell>
        <i className={`${language?.icon} dark:colored text-2xl`}></i>
      </TableCell>
      <TableCell>
        <AlertDialog open={open}>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger>
              <DotsHorizontalIcon width={15} height={15} />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuLabel>Ações</DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={() => console.log(language)}>
                Ver detalhes
              </DropdownMenuItem>

              <AlertDialogTrigger onClick={() => setOpen(true)}>
                <DropdownMenuItem className="text-red-600">
                  Remover tecnologia
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
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading && <LoaderCircle className="animate-spin" />}
                  {!loading && <>Confirmar</>}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </DropdownMenu>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
}
