'use client'

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import FirebaseService from "@/app/services/firebase";
import Image from "next/image";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import ProjectService from "@/app/services/project";
import { useRouter } from "next/navigation";

interface IProps {
  triggerText: string;
  widthFull: boolean;
  icon: ReactNode;
  projectId: string;
}

export default function AddImageToProjectDialog({
  triggerText,
  widthFull,
  icon,
  projectId,
}: IProps) {
  const [fileSelected, setFileSelected] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<any>(null);
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const firebaseService = new FirebaseService();
  const projectService = new ProjectService();
  const router = useRouter();

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    if (file) {
      setFileSelected(file);

      const reader = new FileReader();

      reader.onload = () => {
        setPreviewImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const fileToBuffer = async (file: File): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const buffer = event.target?.result as ArrayBuffer;
        resolve(Buffer.from(buffer));
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (!fileSelected) {
      setLoading(false);
      return;
    }

    const filename = uuidv4();
    const buffer = await fileToBuffer(fileSelected);
    const mimetype = fileSelected.type;

    try {
      const url = await firebaseService.uploadImage(filename, 'projects', buffer, mimetype);
      
      const data = {
        description,
        filename,
        imageUrl: url,
        projectId
      }

      const response = await projectService.addImage(data)

      if(response.statusCode === 201) {
        router.refresh();
        toast({
          title: response.data.message,
          variant: "default"
        })

        setDescription("");
        setFileSelected(null);
        setPreviewImage(null)

        setLoading(false)

        return
      }

      if(response.statusCode === 400) {
        toast({
          title: response.data.message,
          variant: "destructive"
        })
        setLoading(false)
        return
      }
    } catch (error) {
      // Lidar com erros
      console.error('Erro ao enviar imagem para o Firebase:', error);
    }

    setLoading(false);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={`${widthFull && "w-full"}`}>
          {icon && icon} {triggerText}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar imagem</DialogTitle>
          <DialogDescription>
            Selecione uma imagem para adicionar ao projeto
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-72 flex flex-col gap-5">
          <section className="p-2 flex flex-col gap-2">
            <Input
              type="text"
              placeholder="Digite uma descrição para esta imagem (Ex: Homepage)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Input type="file" accept="image/*" onChange={handleChangeFile} />
          </section>

          {previewImage && fileSelected && (
            <section className="flex mt-3 justify-center items-center">
              <Image
                src={previewImage}
                alt="Preview image"
                width={300}
                height={300}
              />
            </section>
          )}
        </ScrollArea>

        <DialogFooter>
          <Button
            className="w-full"
            disabled={
              loading || !description || !fileSelected
            }
            onClick={handleSubmit}
          >
            Adicionar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
