import { ModeToggle } from "@/components/toggle-theme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignJustify } from "lucide-react";
import Link from "next/link";

export default function MobileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AlignJustify />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-3">
        <DropdownMenuLabel>Barra de navegação</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={"/#whos-me"}>
          <DropdownMenuItem>Quem eu sou?</DropdownMenuItem>
        </Link>
        <Link href={"/#knowledge"}>
          <DropdownMenuItem>Conhecimentos</DropdownMenuItem>
        </Link>
        <Link href={"/#projects"}>
          <DropdownMenuItem>Projetos</DropdownMenuItem>
        </Link>
        <Link href={"/#talk-to-me"}>
          <DropdownMenuItem>Fale comigo</DropdownMenuItem>
        </Link>
        <ModeToggle fullscreen={true} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
