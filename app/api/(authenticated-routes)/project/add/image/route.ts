import { IImage } from "@/app/interfaces/models/IImage";
import { nextAuthOptions } from "@/app/options/nextAuthOptions";
import ImageRepository from "@/app/repositories/image-repository";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const imageRepository = new ImageRepository();

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(nextAuthOptions);

        if (!session) {
            return NextResponse.json({ message: "Não autorizado" }, { status: 401 })
        }

        const { imageUrl, description, filename, projectId } = await request.json();

        if (!imageUrl || !description || !filename || !projectId) {
            return NextResponse.json({ message: "Preencha todos os campos." }, { status: 400 })
        }

        const newImage: IImage = {
            description,
            imageUrl,
            filename,
            projectId
        }

        await imageRepository.add(newImage);

        return NextResponse.json({ message: "Imagem adicionada ao projeto" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}