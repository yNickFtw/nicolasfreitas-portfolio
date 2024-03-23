'use client'

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
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MobileMenuDashboard() {

  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AlignJustify />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-3">
        <DropdownMenuLabel>Barra de navegação</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <section className="flex flex-col gap-2">
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
        <Link href={"/"}>
          <DropdownMenuItem>Página principal</DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={() => {
          signOut({
            redirect: false
          });

          router.replace('/user/login')
          router
        }}>Logout</DropdownMenuItem>
        <ModeToggle fullscreen={true} />
        </section>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
