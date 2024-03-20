import { prisma } from "@/prisma";
import { IVisitor } from "../interfaces/models/IVisitor";
import { IVisitorRepository } from "../interfaces/repositories/IVisitorRepository";

export default class VisitorRepository implements IVisitorRepository {
    public async create(): Promise<IVisitor> {
        const visitor = await prisma.visitor.create({
            data: {}
        })

        return visitor;
    }
    
    public async count(): Promise<number> {
        return await prisma.visitor.count();
    }

    public async findById(visitorId: string): Promise<IVisitor | null> {
        return await prisma.visitor.findUnique({
            where: {
                id: visitorId
            }
        })
    }
}