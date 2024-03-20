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

export default function MobileMenuDashboard() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AlignJustify />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-3">
        <DropdownMenuLabel>Barra de navegação</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={"/dashboard/overview"}>
          <DropdownMenuItem>Visão geral</DropdownMenuItem>
        </Link>
        <Link href={"/dashboard/visitors"}>
          <DropdownMenuItem>Visitantes</DropdownMenuItem>
        </Link>
        <Link href={"/dashboard/projects"}>
          <DropdownMenuItem>Projetos</DropdownMenuItem>
        </Link>
        <Link href={"/dashboard/languages"}>
          <DropdownMenuItem>Linguagens</DropdownMenuItem>
        </Link>
        <ModeToggle fullscreen={true} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
