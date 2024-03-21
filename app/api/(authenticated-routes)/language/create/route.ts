import { ILanguage } from "@/app/interfaces/models/ILanguage";
import { nextAuthOptions } from "@/app/options/nextAuthOptions";
import LanguageRepository from "@/app/repositories/language-repository";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const languageRepository = new LanguageRepository();

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(nextAuthOptions);
        
        if(!session) {
            return NextResponse.json({ message: "Não autorizado" }, { status: 401 })
        }
        
        const { name, icon, slug } = await request.json();
    
        if(!name || !icon || !slug) {
            return NextResponse.json({ message: "Preencha todos os campos." }, { status: 400 })
        }
    
        const newLanguage: ILanguage = {
            name: name,
            icon: icon,
            slug: slug
        }
    
        await languageRepository.create(newLanguage)
    
        return NextResponse.json({ message: "Linguagem criada com sucesso." }, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({ message: "Internal server error" }, { status: 202 })
    }
}
