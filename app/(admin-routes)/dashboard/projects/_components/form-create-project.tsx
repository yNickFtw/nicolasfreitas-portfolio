"use client";

import { IProject } from "@/app/interfaces/models/IProject";
import ProjectService from "@/app/services/project";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function FormCreateProject() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [repository, setRepository] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const projectService = new ProjectService();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const newProject: IProject = {
      name,
      description,
      repository,
      slug
    }

    const response = await projectService.create(newProject)    

    if(response.statusCode === 201) {
      toast({
        title: response.data.message,
        description: response.data.description,
        variant: "default"
      })

      router.push(`/dashboard/project/${response.data.project.id}`)
    }

    if(response.statusCode === 400) {
      toast({
        title: response.data.message,
        variant: "destructive"
      })
    }

    setLoading(false);
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <div>
        <Input placeholder="Nome do projeto: " value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div>
        <Textarea placeholder="Digite a descrição do projeto aqui" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div>
        <Input placeholder="Digite o slug do projeto: " value={slug} onChange={(e) => setSlug(e.target.value)} />
      </div>
      
      <div>
        <Input placeholder="Digite o repositório do projeto: " value={repository} onChange={(e) => setRepository(e.target.value)} />
      </div>

      <Button type="submit" disabled={loading}>Criar projeto</Button>
    </form>
  );
}
