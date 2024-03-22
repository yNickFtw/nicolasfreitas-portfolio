import { ModeToggle } from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface IProps {
  isLogged: boolean;
}

export default function MainNav({ isLogged }: IProps) {
  return (
    <section className="flex items-center gap-2">
      <a href={"/#whos-me"}>
        <Button variant={"ghost"}>Quem eu sou?</Button>
      </a>
      <a href={"/#knowledge"}>
        <Button variant={"ghost"}>Conhecimentos</Button>
      </a>
      <a href={"/#projects"}>
        <Button variant={"ghost"}>Projetos</Button>
      </a>
      <a href={"/#talk-to-me"}>
        <Button variant={"ghost"}>Fale comigo</Button>
      </a>
      {isLogged && (
        <Link href={"/dashboard/overview"}>
          <Button variant={"ghost"}>Dashboard</Button>
        </Link>
      )}
      <ModeToggle fullscreen={false} />
    </section>
  );
}
