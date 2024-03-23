"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function MainNavDashboard({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex items-center gap-3", className)} {...props}>
      <Link
        href="/dashboard/overview"
        className={`text-sm font-medium transition-colors ${
          pathname! === "/dashboard/overview"
            ? "dark:text-zinc-50"
            : "text-zinc-500"
        } hover:text-zinc-950 dark:hover:text-zinc-50`}
      >
        Visão geral
      </Link>
      <Link
        href="/dashboard/visitors"
        className={`text-sm font-medium transition-colors ${
          pathname! === "/dashboard/visitors"
            ? "dark:text-zinc-50"
            : "text-zinc-500"
        } hover:text-zinc-950 dark:hover:text-zinc-50`}
      >
        Visitantes
      </Link>
      <Link
        href="/dashboard/projects"
        className={`text-sm font-medium transition-colors ${
          pathname.startsWith("/dashboard/project")
            ? "dark:text-zinc-50"
            : "text-zinc-500"
        } hover:text-zinc-950 dark:hover:text-zinc-50`}
      >
        Projetos
      </Link>
      <Link
        href="/dashboard/languages"
        className={`text-sm font-medium transition-colors ${
          pathname.startsWith("/dashboard/language")
            ? "dark:text-zinc-50"
            : "text-zinc-500"
        } hover:text-zinc-950 dark:hover:text-zinc-50`}
      >
        Linguagens
      </Link>
      <Link
        href="/"
        className={`text-sm font-medium transition-colors text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50`}
      >
        Página principal
      </Link>
    </nav>
  );
}
