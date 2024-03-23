import { prisma } from "@/prisma";
import { IVisit } from "../interfaces/models/IVisits";
import { IVisitRepository } from "../interfaces/repositories/IVisitRepository";
import { FindlastVisitByVisitorIdDTO } from "../interfaces/promises/FindlastVisitByVisitorIdDTO";

export default class VisitRepository implements IVisitRepository {
    public async create(visitorId: string, userAgent: string, special_code?: string): Promise<void> {
        await prisma.visit.create({
            data: {
                visitorId: visitorId,
                userAgent: userAgent,
                special_code: special_code
            }
        })

        return;
    }

    public async count(): Promise<number> {
        const countVisit = await prisma.visit.count();

        return countVisit;
    }

    public async findLastVisitByVisitorId(visitorId: string): Promise<FindlastVisitByVisitorIdDTO> {
        try {
            const lastVisit = await prisma.visit.findFirst({
                where: {
                    visitorId: visitorId,
                },
                orderBy: {
                    visitDate: 'desc',
                },
            });
    
            if (!lastVisit) {
                return {
                    firstVisit: true,
                    visit: null,
                    lastVisitInLessThanAnHour: false
                }
            };
    
            const dateNow = new Date();
            const dateNowUTC = new Date(dateNow);
            const dateHourUTCObj = new Date(lastVisit.visitDate);
    
            if ((dateNowUTC.getTime() - dateHourUTCObj.getTime()) < 3600000) {
                return {
                    firstVisit: false,
                    visit: lastVisit,
                    lastVisitInLessThanAnHour: true
                }
            }
    
            return {
                firstVisit: false,
                visit: lastVisit,
                lastVisitInLessThanAnHour: false
            }
        } catch (error) {
            throw error
        }
    }

}