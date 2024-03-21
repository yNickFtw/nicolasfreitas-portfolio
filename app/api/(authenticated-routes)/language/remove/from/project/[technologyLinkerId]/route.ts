import { nextAuthOptions } from "@/app/options/nextAuthOptions";
import TechnologieLinkerRepository from "@/app/repositories/technologie-linker-repository";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
    params: { technologyLinkerId: string }
}

const technologieLinkerRepository = new TechnologieLinkerRepository();

export async function DELETE(request: NextRequest, { params }: IParams): Promise<NextResponse> {
    try {
        if (!params.technologyLinkerId) {
            return NextResponse.json({ message: "Parâmetros inválidos." })
        }

        const session = await getServerSession(nextAuthOptions);

        if (!session) {
            return NextResponse.json({ message: "Você não tem autorização para usar esta rota" }, { status: 401 })
        }

        await technologieLinkerRepository.removeByTechLinkerId(params.technologyLinkerId);

        return NextResponse.json({ message: "Tecnologia removida com sucesso" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}