"use client";

import { IImage } from "@/app/interfaces/models/IImage";
import Image from "next/image";

interface IProps {
  image: IImage;
  handleSelectImage(image: IImage): void;
  selectedImage: IImage | null;
}

export default function CardProjectImage({
  image,
  handleSelectImage,
  selectedImage,
}: IProps) {
    
  return (
    <Image
      onDoubleClick={() => handleSelectImage(image)}
      src={image.imageUrl}
      alt={image.description}
      width={300}
      height={300}
      className={`rounded ${
        selectedImage?.id == image.id!
          ? "border-2 border-zinc-400 outline-none"
          : "border-2 border-transparent"
      }`}
    />
  );
}
