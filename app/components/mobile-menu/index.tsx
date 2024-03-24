import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ModeToggle } from "@/components/toggle-theme";

interface IProps {
  isLogged: boolean;
}

export default function MobileMenu({ isLogged }: IProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className={`bg-black opacity-50 ${isOpen ? "fixed inset-0" : ""}`}
        onClick={toggleMenu}
      ></div>
      <button onClick={toggleMenu} className="fixed top-0 right-0 m-4 z-50">
        <svg
          className="w-8 h-8 text-gray-600 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          )}
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
            className="fixed inset-y-0 right-0 w-64 dark:bg-zinc-950 bg-white shadow-lg"
          >
            <nav className="w-full flex flex-col items-start p-4">
              <a href="#" className="py-2 w-full">
                <Button
                  className="w-full"
                  variant={"ghost"}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Quem sou eu?
                </Button>
              </a>
              <a href="#knowledge" className="py-2 w-full">
                <Button
                  className="w-full"
                  variant={"ghost"}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Conhecimentos
                </Button>
              </a>
              <a href="#" className="py-2 w-full">
                <Button
                  className="w-full"
                  variant={"ghost"}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Projetos
                </Button>
              </a>
              <a href="#" className="py-2 w-full">
                <Button
                  className="w-full"
                  variant={"ghost"}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Fale comigo
                </Button>
              </a>
              {isLogged && (
                <Link href="/dashboard/overview" className="py-2 w-full">
                  <Button className="w-full" variant={"ghost"}>
                    Dashboard
                  </Button>
                </Link>
              )}
              <ModeToggle fullscreen={true} />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
