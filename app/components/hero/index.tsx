"use client";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="flex flex-col gap-5 w-[50%] m-10">
      <div>
        <h1 className="text-3xl">
          Desenvolvedor{" "}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
            Full-Stack.
          </span>
        </h1>
        <p className="text-lg mt-4 text-zinc-400">
          Apaixonado por transformar ideias em experiências digitais incríveis.
          Explore meu portfólio e entre em contato para começarmos a trabalhar
          juntos em seu próximo projeto.
        </p>
      </div>

      <section>
        <Button variant={"default"}>Vamos trabalhar juntos</Button>
      </section>
    </section>
  );
}
