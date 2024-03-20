"use client";

import { ModeToggle } from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface IProps {
  isLogged: boolean
}

export default function Header({ isLogged }: IProps) {

  return (
    <header className="w-full flex flex-row justify-between items-center p-4 m-auto">
      <section>
        <h2 className="text-xl font-medium">Nicolas Freitas</h2>
      </section>

      <section className="flex items-center gap-2">
        <Button variant={"ghost"}>Quem eu sou?</Button>
        <Button variant={"ghost"}>Conhecimentos</Button>
        <Button variant={"ghost"}>Projetos</Button>
        <Button variant={"ghost"}>Fale comigo</Button>
        {isLogged && (
          <Link href={'/dashboard/overview'}>
          <Button variant={"ghost"}>
            Dashboard
          </Button>
          </Link>
        )}
        <ModeToggle fullscreen={false} />
      </section>
    </header>
  );
}
