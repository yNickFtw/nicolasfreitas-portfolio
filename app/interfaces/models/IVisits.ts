import { IVisitor } from "./IVisitor";

export interface IVisit {
    id?: string;
    visitDate?: Date | string;
    visitorId: string;
    visitor?: IVisitor
    userAgent?: string | null;
}