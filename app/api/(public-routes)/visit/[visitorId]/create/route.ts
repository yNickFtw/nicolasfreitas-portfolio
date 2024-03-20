import VisitRepository from "@/app/repositories/visit-repository";
import { type NextRequest, NextResponse, userAgent } from "next/server";

interface IProps {
    params: {
        visitorId: string
    }
}

const visitRepository = new VisitRepository();

export async function POST(request: NextRequest, { params }: IProps) {
    try {
        const { userAgent, special_code } = await request.json();

        const visitorId = params.visitorId;

        if(!userAgent || !visitorId) {
            return NextResponse.json({ message: "Dados inválidos." }, { status: 400 })
        }
        
        const lastVisit = await visitRepository.findLastVisitByVisitorId(visitorId)

        if(lastVisit.lastVisitInLessThanAnHour && !lastVisit.firstVisit) {
            return NextResponse.json({ message: "Visitante já esteve no site pela ultima 1 hora" }, { status: 200 })
        }

        await visitRepository.create(visitorId, userAgent, special_code);

        return NextResponse.json({ message: "Visita registrada com sucesso" }, { status: 201 })
    } catch (error) {
        console.log(error);
        

        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}