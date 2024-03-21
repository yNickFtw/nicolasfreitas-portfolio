import HeaderDashboard from "@/app/components/header-dashboard";
import { PlusIcon } from "lucide-react";
import AddProjectDialog from "./_components/add-project-dialog";
import ProjectRepository from "@/app/repositories/project-repository";
import CardProject from "@/app/components/card-project/card-project";

export default async function Projects() {
  const userRepository = new ProjectRepository();

  const projects = await userRepository.findAllProjects();

  return (
    <>
      <HeaderDashboard />

      <main className="max-w-7xl m-auto">
        <header className="w-full flex flex-row justify-between items-center p-2">
          <h2 className="text-xl font-semibold">Todos os projetos</h2>

          <AddProjectDialog
            triggerText="Adicionar Projeto"
            icon={<PlusIcon />}
            widthFull={false}
          />
        </header>

          <section className="flex justify-center md:justify-normal flex-row flex-wrap gap-3 p-2">
            {projects.map((project) => (
              <CardProject project={project} isDashboard={true} key={project.id} />
            ))}
          </section>
      </main>
    </>
  );
}
