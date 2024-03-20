import { IProject } from "./IProject";

export interface IImage {
    id?: string;
    description: string;
    projectId: string;
    project?: IProject;
    imageUrl: string;
    filename: string;
    createdAt?: Date | string;
}
