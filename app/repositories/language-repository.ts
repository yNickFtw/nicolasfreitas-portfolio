import { prisma } from "@/prisma";
import { ILanguage } from "../interfaces/models/ILanguage";
import { ILanguageRepository } from "../interfaces/repositories/ILanguageRepository";

export default class LanguageRepository implements ILanguageRepository {
    public async create(language: ILanguage): Promise<void> {
        await prisma.languages.create({
            data: {
                name: language.name,
                icon: language.icon,
                slug: language.slug
            }
        })

        return;
    }

    public async countLanguages(): Promise<number> {
        return await prisma.languages.count();
    }

    public async findAllLanguages(): Promise<ILanguage[]> {
        const languages = await prisma.languages.findMany();

        return languages;
    }

    public async findAllLanguagesExceptByLanguageId(languageIds: string[]): Promise<ILanguage[]> {
        const languages = await prisma.languages.findMany({
            where: { 
                NOT: {
                    id: {
                        in: languageIds
                    }
                }
             }
        })

        return languages;
    }

}