import { IProject } from "../models/IProject";

export interface IProjectRepository {
    create(project: Partial<IProject>): Promise<IProject>;
    findAllProjects(): Promise<IProject[]>;
    findProjectById(id: string): Promise<IProject | null>;
    findBySlug(slug: string): Promise<IProject | null>;
    count(): Promise<number>;
}