"use client";

import { ILanguage } from "@/app/interfaces/models/ILanguage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface IProps {
  language: ILanguage;
}

export default function LanguageCard({ language }: IProps) {
  return (
    <Card className="w-[250px]" key={language.id}>
      <CardHeader>
        <CardTitle>{language.name}</CardTitle>
      </CardHeader>

      <CardContent className="w-full flex flex-col justify-center items-center">
        <section key={language.id}>
          <i className={`${language.icon} dark:colored text-8xl`}></i>
        </section>
      </CardContent>

      <CardFooter>
        <Button className="w-full">Editar</Button>
      </CardFooter>
    </Card>
  );
}
