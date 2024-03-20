import { ILanguage } from "./ILanguage";
import { IProject } from "./IProject";

export interface ITechnologiesLinker {
    id: string;
    projectId: string;
    project?: IProject;
    languageId: string;
    language?: ILanguage;
}