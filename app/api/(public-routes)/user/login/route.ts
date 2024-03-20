import BCryptService from "@/app/shared/utils/bcrypt-service/bcrypt-service";
import { prisma } from "@/prisma";

const bcryptService = new BCryptService();

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if(!email || !password) {
            return Response.json({ message: "Preencha todos os campos" }, { status: 400 })
        }

        const user = await prisma.user.findFirst({ where: { email } })
        
        if(!user) {
            return Response.json({ message: "Dados inválidos" }, { status: 401 })
        }

        const passwordMatch = await bcryptService.match(user.password, password);

        if(!passwordMatch) {
            return Response.json({ message: "Dados inválidos" }, { status: 401 })
        }

        const userToLogin = { id: user.id, email: user.email, name: user.name }

        return Response.json({ user: userToLogin }, { status: 200 });
    } catch (error) {
        return Response.json({ message: "Ocorreu um erro interno, por favor tente novamente mais tarde" }, { status: 500 })
    }
}