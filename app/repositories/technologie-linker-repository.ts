import { prisma } from "@/prisma";
import { ITechnologieLinkerRepository } from "../interfaces/repositories/ITechnologieLinkerRepository";
import { ITechnologiesLinker } from "../interfaces/models/ITechnologiesLinker";
import { IProject } from "../interfaces/models/IProject";
import { IFindAllProjectsByLanguageId } from "../interfaces/promises/IFindAllProjectsByLanguageId";

export default class TechnologieLinkerRepository implements ITechnologieLinkerRepository {
    public async addLanguageToProject(languageId: string, projectId: string): Promise<void> {
        await prisma.technologiesLinker.create({
            data: {
                languageId: languageId,
                projectId: projectId
            }
        })

        return;
    }

    public async findTechnologieLinkerByProjectAndLanguageId(projectId: string, languageId: string): Promise<ITechnologiesLinker | null> {
        const technologyLinker = await prisma.technologiesLinker.findFirst({
            where: {
                projectId: projectId,
                languageId: languageId,
            }
        })

        return technologyLinker;
    }

    public async findAllTecnologiesByProjectId(projectId: string): Promise<ITechnologiesLinker[]> {
        const technologiesLinker = await prisma.technologiesLinker.findMany({
            where: { projectId: projectId },
            include: {
                language: true
            }
        })

        return technologiesLinker;
    }

    public async findAllProjectsByLanguageId(languageId: string): Promise<IFindAllProjectsByLanguageId> {
        const language = await prisma.languages.findUnique({
            where: {
                id: languageId
            }
        })

        const techs = await prisma.technologiesLinker.findMany({
            where: { languageId },
            include: {
                project: {
                    include: {
                        images: true,
                        technologiesLinker: {
                            take: 3,
                            include: {
                                language: true
                            }
                        }
                    }
                },
            }
        })

        const projects = techs.map((tech) => tech.project)

        return { language: language, projects: projects } as IFindAllProjectsByLanguageId;
    }

    public async removeByTechLinkerId(techLinkerId: string): Promise<void> {
        await prisma.technologiesLinker.delete({
            where: { id: techLinkerId }
        })

        return
    }

}