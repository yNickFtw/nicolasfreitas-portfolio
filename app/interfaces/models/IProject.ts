import { IImage } from "./IImage";
import { ITechnologiesLinker } from "./ITechnologiesLinker";
import { IUser } from "./IUser";

export interface IProject {
    id?: string
    name: string
    description: string
    repository: string
    slug: string
    isAvailable?: boolean
    status?: string
    dateProject?: Date | string
    technologiesLinker?: ITechnologiesLinker[]
    images?: IImage[];
    userId?: string;
    user?: IUser
}