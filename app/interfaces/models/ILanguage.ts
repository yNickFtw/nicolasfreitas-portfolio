import { ITechnologiesLinker } from "./ITechnologiesLinker";

export interface ILanguage {
    id?: string;
    name: string;
    icon: string;
    slug: string;
    technologiesLinker?: ITechnologiesLinker[]
}