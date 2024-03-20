import { IProject } from "@/app/interfaces/models/IProject";
import ProjectRepository from "@/app/repositories/project-repository";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const projectRepository = new ProjectRepository();

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession()

        if (!session) {
            return NextResponse.json({ message: "Não autorizado!" }, { status: 401 })
        }

        const { name, description, slug, repository } = await request.json();

        if (!name || !description || !slug || !repository) {
            return NextResponse.json({ message: "Preencha todos os campos." }, { status: 400 })
        }

        const projectAlreadyExistsBySlug = await projectRepository.findBySlug(slug)

        if (projectAlreadyExistsBySlug) {
            return NextResponse.json({ message: "Já existe um projeto com este slug" }, { status: 400 })
        }

        const newProject: IProject = {
            name,
            description,
            slug,
            repository,
            userId: session.id
        }

        const project = await projectRepository.create(newProject);

        return NextResponse.json({ message: "Projeto criado com sucesso", description: "Agora finalize os últimos detalhes", project: project }, { status: 201 })
    } catch (error: any) {
        console.log(error);
        

        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}