import { nextAuthOptions } from "@/app/options/nextAuthOptions";
import LanguageRepository from "@/app/repositories/language-repository";
import { isValidJSONFormat } from "@/app/shared/utils/isValidJSONFormat";
import { getServerSession } from "next-auth";
import { type NextRequest, NextResponse } from "next/server";

const languageRepository = new LanguageRepository();

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(nextAuthOptions);
        
        if(!session) {
            return NextResponse.json({ message: "Não autorizado" }, { status: 401 })
        }

        const { languages } = await request.json();        

        if (languages.length < 1) {
            return NextResponse.json({ message: "O JSON está vazio." }, { status: 400 })
        }

        const isValidJSON = isValidJSONFormat(languages, false);        

        if(!isValidJSON) {
            return NextResponse.json({ message: "JSON inválido." }, { status: 400 })
        }

        for (let i = 0; i < languages.length; i++) {
            const element = languages[i];
            
            await languageRepository.create(element);
        }

        return NextResponse.json({ message: "Linguagens importadas com sucesso" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}
