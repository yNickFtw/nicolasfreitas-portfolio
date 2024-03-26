"use client";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
      <section className="w-2/3 max-sm:w-full flex flex-col gap-5 p-2">
        <div>
          <h1 className="text-3xl font-medium">
            Desenvolvedor{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
              Full-Stack.
            </span>{" "}
          </h1>
          <p className="text-lg mt-4 text-zinc-400">
            Sou um desenvolvedor Full-Stack apaixonado por criar soluções
            inovadoras e escaláveis para desafios complexos. Com experiência
            tanto no frontend quanto no backend, estou sempre buscando aprender
            e me aprimorar. Vamos construir algo incrível juntos!
          </p>
        </div>

        <section>
          <Button variant={"default"}>Conheça meu trabalho</Button>
        </section>
      </section>
  );
}
