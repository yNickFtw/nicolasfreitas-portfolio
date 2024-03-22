import { nextAuthOptions } from "@/app/options/nextAuthOptions";
import LanguageRepository from "@/app/repositories/language-repository";
import TechnologieLinkerRepository from "@/app/repositories/technologie-linker-repository";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
    params: { languageId: string };
}

const languageRepository = new LanguageRepository();
const technologyLinkerRepository = new TechnologieLinkerRepository();

export async function DELETE(request: NextRequest, { params }: IParams) {
    try {
        const session = await getServerSession(nextAuthOptions)

        if (!session) {
            return NextResponse.json({ message: "Não autorizado" }, { status: 401 })
        }

        const languageId = params.languageId;

        const language = await languageRepository.findById(languageId);

        if (!language) {
            return NextResponse.json({ message: "Linguagem não encontrada." }, { status: 404 })
        }

        const languageIsRegisteredInSomeProject = await technologyLinkerRepository.findAllProjectsByLanguageId(languageId);

        if (languageIsRegisteredInSomeProject.projects.length > 0) {
            return NextResponse.json({
                message: "Não autorizado.",
                description: "Você não pode deletar uma linguagem que está registrada em um ou mais projetos."
            }, { status: 403 })
        }

        await languageRepository.delete(languageId);

        return NextResponse.json({ message: "Linguagem deletada com sucesso." }, { status: 200 })

    } catch (error) {
        console.log(error);

        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}
