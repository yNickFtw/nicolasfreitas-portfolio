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
    <header
      className="max-w-7xl flex flex-row justify-between items-center p-4 m-auto"
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        backdropFilter: "blur(10px)",
      }}
    >
      <section>
        <h2 className="text-xl font-medium">Nicolas Freitas</h2>
      </section>

      <div className="hidden md:block">
        <MainNav isLogged={isLogged} />
      </div>

      <div className="md:hidden">
        <MobileMenu isLogged={isLogged} />
      </div>
    </header>
  );
}
