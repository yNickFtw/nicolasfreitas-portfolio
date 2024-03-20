import HeaderDashboard from "@/app/components/header-dashboard";
import LanguageRepository from "@/app/repositories/language-repository";
import LanguageCard from "./_components/LanguageCard";
import { PlusIcon } from "lucide-react";
import AddLanguageDialog from "./_components/add-language-dialog";

export default async function Languages() {
  const languageRepository = new LanguageRepository();

  const languages = await languageRepository.findAllLanguages();

  return (
    <>
      <HeaderDashboard />

      <section className="max-w-7xl m-auto">
        <header className="w-full flex flex-row justify-between items-center p-2">
          <h2 className="text-xl font-semibold">Todas as linguagens</h2>

          <AddLanguageDialog
            triggerText="Adicionar"
            widthFull={false}
            icon={<PlusIcon />}
          />
        </header>

        <div className="w-full flex flex-row flex-wrap justify-center gap-2 p-2">
          {languages.map((language) => (
            <LanguageCard language={language} key={language.id} />
          ))}
        </div>
      </section>
    </>
  );
}
