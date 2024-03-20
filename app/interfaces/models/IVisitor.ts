import { IVisit } from "./IVisits";

export interface IVisitor {
    id?: string;
    firstVisit?: Date;
    visits?: IVisit[]
}