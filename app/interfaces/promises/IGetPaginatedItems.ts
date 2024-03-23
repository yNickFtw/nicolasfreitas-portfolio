import { IVisitor } from "../models/IVisitor";

export interface IGetPaginatedItems {
    count: number;
    visitors: IVisitor[]
}