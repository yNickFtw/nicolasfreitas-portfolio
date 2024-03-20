import VisitorRepository from "@/app/repositories/visitor-repository"
import { prisma } from "@/prisma"
import { type NextRequest, NextResponse } from "next/server"

const visitorRepository = new VisitorRepository();

export async function POST(request: NextRequest) {
    try {
        const visitor = await visitorRepository.create();

        return NextResponse.json({ message: "Visitante criado com sucesso", visitor }, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}