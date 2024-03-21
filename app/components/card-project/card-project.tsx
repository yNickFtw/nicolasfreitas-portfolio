"use client";

import { IProject } from "@/app/interfaces/models/IProject";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  project: IProject;
  isDashboard: boolean;
}

export default function CardProject({ project, isDashboard }: IProps) {
  function formatDate(date: string | Date): string {
    const dateInstance = new Date(date);

    const day = dateInstance.getDate();

    const month = dateInstance.getMonth() + 1;

    const year = dateInstance.getFullYear();

    const formatedDate = `${day}/${month < 10 && "0"}${month}/${year}`;

    return formatedDate;
  }

  return (
    <Card className="w-full max-w-xs rounded-xl border shadow-sm overflow-hidden">
      <div className="relative aspect-[1.5]">
        {project.images!.length < 1 ? (
          <div className="flex h-full justify-center items-center">
            <p>Sem imagens</p>
          </div>
        ) : (
          <Image
            alt="Project image"
            className="absolute inset-0 object-cover"
            height="250"
            src={project.images![0].imageUrl}
            style={{
              aspectRatio: "400/250",
              objectFit: "cover",
            }}
            width="400"
          />
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm">
          <span className="font-semibold text-gray-500">Criado em</span>
          <time className="font-semibold">
            {formatDate(project.dateProject!)}
          </time>
        </div>
        <section className="flex flex-row justify-between items-center">
          <h3 className="text-xl font-bold mt-4">{project.name}</h3>
          <Link
            href={project.repository}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="devicon-github-original dark:colored text-3xl flex items-center"></i>
          </Link>
        </section>
        <p className="text-sm text-gray-500 mt-2">{project.description}</p>
        <div className="flex gap-4 flex-wrap justify-center items-center mt-4">
          {project.technologiesLinker?.map((tech) => (
            <Link
              href={`/dashboard/language/${tech.languageId}`}
              className="rounded-full border text-xs dark:border-zinc-800 border-gray-200 px-3 py-1 bg-gray-50 dark:bg-transparent"
              key={tech.id}
            >
              {tech.language?.name}
            </Link>
          ))}
        </div>
      </div>

      <CardFooter>
        {isDashboard && (
          <section className="w-full flex justify-center">
            <Link href={`/dashboard/project/${project.id}`} className="hover:underline">
              Ver projeto
            </Link>
          </section>
        )}
      </CardFooter>
    </Card>
  );
}
