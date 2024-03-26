import VisitorRepository from "@/app/repositories/visitor-repository";
import { NextRequest, NextResponse } from "next/server";

const visitorRepository = new VisitorRepository();

export async function GET(request: NextRequest, params: { visitorId: string }) {
    try {
        if(!params.visitorId) {
            return NextResponse.json({ message: "o ID do visitante não foi informado." }, { status: 400 })
        }

        const visitor = await visitorRepository.findById(params.visitorId);

        if(!visitor) {
            return NextResponse.json({ message: "Visitante não encontrado." }, { status: 404, })
        }

        return NextResponse.json(visitor, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}