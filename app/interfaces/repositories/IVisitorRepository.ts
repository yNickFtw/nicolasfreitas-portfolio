import { IVisitor } from "../models/IVisitor";
import { IGetPaginatedItems } from "../promises/IGetPaginatedItems";

export interface IVisitorRepository {
    create(): Promise<IVisitor>;
    findById(visitorId: string): Promise<IVisitor | null>;
    count(): Promise<number>;
    getPaginatedItems(page: number, pageSize: number): Promise<IGetPaginatedItems>
}