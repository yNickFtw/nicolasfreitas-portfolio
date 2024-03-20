import CardProject from "@/app/components/card-project/card-project";
import HeaderDashboard from "@/app/components/header-dashboard";
import TechnologieLinkerRepository from "@/app/repositories/technologie-linker-repository";

interface IProps {
  params: {
    id: string;
  };
}

export default async function LanguageById({ params }: IProps) {
  const technologyLinkerRepository = new TechnologieLinkerRepository();

  const projects = await technologyLinkerRepository.findAllProjectsByLanguageId(
    params.id
  );

  return (
    <>
      <HeaderDashboard />

      <header className="max-w-7xl mx-auto mt-5">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          Todos os projetos com {projects.language.name}{" "}
          <i className={`text-5xl ${projects.language.icon} dark:colored`}></i>
        </h2>
      </header>

      <section className="max-w-7xl mx-auto flex flex-row flex-wrap gap-3 p-2">
        {projects.projects.map((project) => (
          <CardProject isDashboard={true} project={project} key={project.id} />
        ))}
      </section>
    </>
  );
}
