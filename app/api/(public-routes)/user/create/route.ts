import { prisma } from "@/prisma";

import BCryptService from "@/app/shared/utils/bcrypt-service/bcrypt-service";
import UserRepository from "@/app/repositories/user-repository";
import { IUser } from "@/app/interfaces/models/IUser";
import { NextResponse } from "next/server";
const bcryptService = new BCryptService();

const userRepository = new UserRepository();

export async function POST(request: Request) {
    try {
        const { name, email, password, confirmPassword } = await request.json();

        if(!name || !email || !password || !confirmPassword) {
            return NextResponse.json({ message: "Preencha todos os campos" }, { status: 400 })
        }

        if(password !== confirmPassword) {
            return NextResponse.json({ message: "As senhas estão incorretas" }, { status: 400 })
        }

        const userAlreadyExists = await userRepository.findByEmail(email);

        if(userAlreadyExists) {
            return NextResponse.json({ message: 'Ocorreu um erro, tente com outro email' }, { status: 400 })
        }

        const passwordHash = await bcryptService.encrypt(password);

        const newUser: Partial<IUser> = {
            name: name,
            email: email,
            password: passwordHash,
        }

        await userRepository.create(newUser);

        return NextResponse.json({ message: "Usuário criado com sucesso" }, { status: 201 });
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({ message: "Ocorreu algum erro.", error }, { status: 500 })
    }
}
