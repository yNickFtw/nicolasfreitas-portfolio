import { prisma } from "@/prisma";
import { IImage } from "../interfaces/models/IImage";
import { IImageRepository } from "../interfaces/repositories/IImageRepository";

export default class ImageRepository implements IImageRepository {
    public async add(image: IImage): Promise<void> {
        await prisma.image.create({
            data: {
                description: image.description,
                imageUrl: image.imageUrl,
                filename: image.filename,
                projectId: image.projectId
            }
        })

        return;
    }

    public async getAllImagesFromProjectById(projectId: string): Promise<IImage[]> {
        return await prisma.image.findMany({
            where: { projectId: projectId }
        })
    }

}