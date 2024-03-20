import HeaderDashboard from "@/app/components/header-dashboard";
import VisitRepository from "@/app/repositories/visit-repository";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormAddLanguage from "./_components/form-add-language";
import LanguageRepository from "@/app/repositories/language-repository";
import AddLanguageDialog from "../languages/_components/add-language-dialog";
import { PlusIcon } from "lucide-react";

export default async function Dashboard() {
  const visitRepository = new VisitRepository();
  const languageRepository = new LanguageRepository();

  const [countVisitsData, countLanguages] = await Promise.all([
    visitRepository.count(),
    languageRepository.countLanguages()
  ])

  return (
    <>
      <HeaderDashboard />

      <main className="max-w-7xl m-auto">
        <section className="p-2 flex justify-center flex-wrap gap-5">
          <Card className="w-[350px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de visitas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{countVisitsData}</div>
            </CardContent>

            <CardFooter>
              <Button className="w-full">Ver detalhes</Button>
            </CardFooter>
          </Card>

          <Card className="w-[350px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de projetos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{countVisitsData}</div>
            </CardContent>

            <CardFooter>
              <Button className="w-full">Adicionar projeto</Button>
            </CardFooter>
          </Card>

          <Card className="w-[350px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de linguagens
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{countLanguages}</div>
            </CardContent>

            <CardFooter>
              <AddLanguageDialog triggerText="Adicionar" icon={<PlusIcon />} widthFull={true} />
            </CardFooter>
          </Card>
        </section>
      </main>
    </>
  );
}
