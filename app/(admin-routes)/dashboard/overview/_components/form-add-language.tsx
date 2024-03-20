"use client";

import { Input } from "@/components/ui/input";
import { ChangeEvent, ReactNode, FormEvent } from "react";

interface IProps {
  name: string;
  icon: string;
  slug: string;
  handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void>;
  handleNameChange(e: ChangeEvent<HTMLInputElement>): void;
  handleIconChange(e: ChangeEvent<HTMLInputElement>): void;
  handleSlugChange(e: ChangeEvent<HTMLInputElement>): void;
  children: ReactNode
}

export default function FormAddLanguage({
  name,
  icon,
  slug,
  handleSubmit,
  handleNameChange,
  handleIconChange,
  handleSlugChange,
  children
}: IProps) {
  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <div>
        <Input
          placeholder="Nome da tecnologia: "
          value={name}
          onChange={handleNameChange}
        />
      </div>

      <div>
        <Input
          placeholder="Digite o <i> do icon: "
          value={icon}
          onChange={handleIconChange}
        />
      </div>

      <div>
        <Input
          placeholder="Digite o slug da linguagem: "
          value={slug}
          onChange={handleSlugChange}
        />
      </div>

      {children}
    </form>
  );
}
