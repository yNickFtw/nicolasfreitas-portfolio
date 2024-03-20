import { IProject } from "../models/IProject"
import { ITechnologiesLinker } from "../models/ITechnologiesLinker"
import { IFindAllProjectsByLanguageId } from "../promises/IFindAllProjectsByLanguageId"

export interface ITechnologieLinkerRepository {
    addLanguageToProject(languageId: string, projectId: string): Promise<void>
    findTechnologieLinkerByProjectAndLanguageId(projectId: string, languageId: string): Promise<ITechnologiesLinker | null>
    findAllTecnologiesByProjectId(projectId: string): Promise<ITechnologiesLinker[]>
    findAllProjectsByLanguageId(languageId: string): Promise<IFindAllProjectsByLanguageId>
}