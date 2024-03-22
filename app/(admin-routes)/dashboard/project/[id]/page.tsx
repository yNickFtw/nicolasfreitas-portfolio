import HeaderDashboard from "@/app/components/header-dashboard";
import ProjectRepository from "@/app/repositories/project-repository";
import TechnologieLinkerRepository from "@/app/repositories/technologie-linker-repository";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import AddLanguageToProjectDialog from "../_components/add-language-to-project-dialog";
import LanguageRepository from "@/app/repositories/language-repository";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddImageToProjectDialog from "../_components/add-image-to-project-dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableRowLanguages from "../_components/table-row-languages";
import ContainerImages from "../_components/container-images";
import { Skeleton } from "@/components/ui/skeleton";

interface IProps {
  params: {
    id: string;
  };
}

export default async function ProjectById({ params }: IProps) {
  const projectRepository = new ProjectRepository();

  const technologyLinkerRepository = new TechnologieLinkerRepository();

  const languageRepository = new LanguageRepository();

  const project = await projectRepository.findProjectById(params.id);

  if (!project) {
    redirect("/dashboard/projects");
  }

  const technologies =
    await technologyLinkerRepository.findAllTecnologiesByProjectId(params.id);

  let languagesIds: string[] = [];

  for (let index = 0; index < technologies.length; index++) {
    languagesIds.push(technologies[index].languageId);
  }

  const languages = await languageRepository.findAllLanguagesExceptByLanguageId(
    languagesIds
  );

  return (
    <>
      <HeaderDashboard />

      <Card className="m-auto mt-5 max-w-5xl">
        <section className="p-2">
          <h2 className="text-2xl font-medium">{project.name}</h2>
        </section>
        <Tabs defaultValue="technologies" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="technologies" className="rounded-md">
              Tecnologias
            </TabsTrigger>
            <TabsTrigger value="images" className="rounded-md">
              Imagens
            </TabsTrigger>
          </TabsList>

          <TabsContent value="technologies">
            <Card className="h-full">
              <CardHeader className="flex flex-row justify-between items-center">
                <section>
                  <CardTitle>Tecnologias do projeto</CardTitle>
                  <CardDescription>
                    Gerencie as tech-stack do projeto aqui.
                  </CardDescription>
                </section>

                <AddLanguageToProjectDialog
                  triggerText="Adicionar"
                  icon={<PlusIcon />}
                  languages={languages}
                  projectId={params.id}
                  widthFull={false}
                />
              </CardHeader>

              <CardContent>
                {technologies.length > 0 && (
                  <Table>
                    <TableCaption>Todas as linguages do projeto</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>Icon</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {technologies.map((tech) => (
                        <TableRowLanguages
                          technologyLinkerId={tech.id}
                          language={tech.language!}
                          key={tech.id}
                        />
                      ))}
                    </TableBody>
                  </Table>
                )}
                {technologies.length === 0 && (
                  <section>
                    <h2 className="text-sm text-center">
                      Sem tecnologias adicionas por enquanto
                    </h2>
                  </section>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="images">
            <Card className="h-full">
              <CardHeader className="flex flex-row justify-between items-center">
                <section>
                  <CardTitle>Imagens</CardTitle>
                  <CardDescription>
                    Gerencie suas imagens por aqui. (dê um duplo clique na image
                    que deseja editar.)
                  </CardDescription>
                </section>

                <AddImageToProjectDialog
                  triggerText="Adicionar"
                  icon={<PlusIcon />}
                  projectId={params.id}
                  widthFull={false}
                />
              </CardHeader>

              <CardContent>
                {project.images!?.length > 0 && (
                  <ContainerImages images={project.images!} />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Card>
    </>
  );
}
