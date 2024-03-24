import { prisma } from "@/prisma";
import { IVisitor } from "../interfaces/models/IVisitor";
import { IVisitorRepository } from "../interfaces/repositories/IVisitorRepository";
import { IGetPaginatedItems } from "../interfaces/promises/IGetPaginatedItems";

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

    public async getPaginatedItems(page: number, pageSize: number): Promise<IGetPaginatedItems> {
        const offset = (page - 1) * pageSize;

        const visitors = await prisma.visitor.findMany({
            take: pageSize,
            skip: offset,
            include: {
                visits: {
                    take: 1,
                    orderBy: {
                        visitDate: 'asc'
                    }
                },
            },
            orderBy: {
                firstVisit: 'desc'
            },
        })

        const count = await prisma.visitor.count({})

        return { count: count, visitors: visitors };
    }

}