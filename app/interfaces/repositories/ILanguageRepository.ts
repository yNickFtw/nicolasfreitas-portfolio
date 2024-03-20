import { ILanguage } from "../models/ILanguage";

export interface ILanguageRepository {
    create(language: ILanguage): Promise<void>;
    countLanguages(): Promise<number>;
    findAllLanguages(): Promise<ILanguage[]>;
    findAllLanguagesExceptByLanguageId(languageIds: string[]): Promise<ILanguage[]>
}