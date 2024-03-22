"use client";

import { ModeToggle } from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MainNav from "../main-nav";
import MobileMenu from "../mobile-menu";

interface IProps {
  isLogged: boolean;
}

export default function Header({ isLogged }: IProps) {
  return (
    <header className="w-full flex flex-row justify-between items-center p-4 m-auto">
      <section>
        <h2 className="text-xl font-medium">Nicolas Freitas</h2>
      </section>

      <div className="hidden md:block">
        <MainNav isLogged={isLogged} />
      </div>

      <div className="md:hidden">
        <MobileMenu />
      </div>
    </header>
  );
}
