import { IVisit } from "../models/IVisits";
import { FindlastVisitByVisitorIdDTO } from "../promises/FindlastVisitByVisitorIdDTO";

export interface IVisitRepository {
    create(visitorId: string, userAgent: string, special_code: string): Promise<void>;
    count(): Promise<number>;
    findLastVisitByVisitorId(visitorId: string): Promise<FindlastVisitByVisitorIdDTO>
}