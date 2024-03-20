"use client";

import { IImage } from "@/app/interfaces/models/IImage";
import { useState } from "react";
import CardProjectImage from "./card-project-image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface IProps {
  images: IImage[];
}

export default function ContainerImages({ images }: IProps) {
  const [selectedImage, setSelectedImage] = useState<IImage | null>(null);
  const [dialogStatus, setDialogStatus] = useState<boolean>(false);

  const [description, setDescription] = useState<string>("");

  const handleSelectImage = (image: IImage): void => {
    if (image.id == selectedImage?.id) {
      setDialogStatus(false);
      setSelectedImage(null);
      setDescription("");

      return;
    }

    setSelectedImage(image);
    setDescription(image.description);
    setDialogStatus(true);
  };

  function onCloseDialog() {
    setDialogStatus(false);
    setSelectedImage(null);
    setDescription("");
  }

  return (
    <>
      <section className="flex flex-row flex-wrap gap-3">
        {images.map((image) => (
          <CardProjectImage
            image={image}
            handleSelectImage={handleSelectImage}
            selectedImage={selectedImage}
            key={image.id}
          />
        ))}
      </section>

      <Dialog
        open={dialogStatus}
        onOpenChange={onCloseDialog}
        modal
        defaultOpen={false}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar imagem</DialogTitle>
            <DialogDescription>
              Edite os campos que deseja alterar
            </DialogDescription>
          </DialogHeader>

          <form className="flex flex-col gap-2">
            <Input
              placeholder="Digite a descrição aqui."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Button>Editar</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
