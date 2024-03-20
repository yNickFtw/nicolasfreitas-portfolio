import { prisma } from "@/prisma";
import { IUser } from "../interfaces/models/IUser";
import { IUserRepository } from "../interfaces/repositories/IUserRepository";

export default class UserRepository implements IUserRepository {
    public async create(user: Partial<IUser>): Promise<void> {
        await prisma.user.create({
            data: {
                name: user.name!,
                email: user.email!,
                password: user.password!
            }
        })

        return;
    }

    public async findByEmail(email: string): Promise<IUser | null> {
        const user = await prisma.user.findFirst({ where: { email } });

        return user;
    }

}