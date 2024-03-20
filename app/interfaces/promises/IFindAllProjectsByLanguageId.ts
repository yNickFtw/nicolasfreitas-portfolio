import { ILanguage } from "../models/ILanguage";
import { IProject } from "../models/IProject";

export interface IFindAllProjectsByLanguageId {
    language: ILanguage;
    projects: IProject[]
}