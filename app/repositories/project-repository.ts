import { prisma } from "@/prisma";
import { IProject } from "../interfaces/models/IProject";
import { IProjectRepository } from "../interfaces/repositories/IProjectRepository";

export default class ProjectRepository implements IProjectRepository {
    public async create(project: Partial<IProject>): Promise<IProject> {
        const projectCreated = await prisma.project.create({
            data: {
                name: project.name!,
                description: project.description!,
                repository: project.repository!,
                slug: project.slug!,
                userId: project.userId!,
            }
        })

        return projectCreated;
    }

    public async findAllProjects(): Promise<IProject[]> {        
        return await prisma.project.findMany({
            include: {
                technologiesLinker: {
                    take: 3,
                    include: {
                        language: true
                    },
                },
                images: true,
            },
            orderBy: {
                dateProject: 'asc',
            }
        });
    }

    public async findProjectById(id: string): Promise<IProject | null> {
        const project = await prisma.project.findUnique({ where: { id }, include: {
            images: true
        } });

        return project;
    }

    public async findBySlug(slug: string): Promise<IProject | null> {
        const project = await prisma.project.findUnique({
            where: { slug }
        });

        return project;
    }

    public async count(): Promise<number> {
        return await prisma.project.count();
    }
}