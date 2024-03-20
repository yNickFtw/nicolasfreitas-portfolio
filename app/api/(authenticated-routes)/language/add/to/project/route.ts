import TechnologieLinkerRepository from "@/app/repositories/technologie-linker-repository";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const technologyLinkerRepository = new TechnologieLinkerRepository();

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession();

        if (!session) {
            return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })
        }

        const { languages, projectId } = await request.json();

        if (languages.length < 1 || !projectId) {
            return NextResponse.json({ message: "Você precisa passar as informações necessárias" }, { status: 400 })
        }

        for (const language of languages) {
            const languageAlreadyExists = await technologyLinkerRepository.findTechnologieLinkerByProjectAndLanguageId(projectId, language);

            if (languageAlreadyExists) {
                return NextResponse.json({ message: "A linguagem em vermelho já existe no seu projeto", languageThatExists: language }, { status: 400 });
            } else {
                await technologyLinkerRepository.addLanguageToProject(language, projectId);
            }
        }

        return NextResponse.json({ message: "Tecnologia adicionada com sucesso." }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}