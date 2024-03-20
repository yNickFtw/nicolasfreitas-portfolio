import { IImage } from "../models/IImage";

export interface IImageRepository {
    add(image: IImage): Promise<void>;
    getAllImagesFromProjectById(projectId: string): Promise<IImage[]>
}