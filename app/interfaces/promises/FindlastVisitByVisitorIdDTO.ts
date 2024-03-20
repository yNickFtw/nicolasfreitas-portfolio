import { IVisit } from "../models/IVisits";

export interface FindlastVisitByVisitorIdDTO {
    firstVisit: boolean;
    visit?: IVisit | null;
    lastVisitInLessThanAnHour: boolean;
}