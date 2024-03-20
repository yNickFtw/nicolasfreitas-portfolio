import { IVisitor } from "../models/IVisitor";

export interface IVisitorRepository {
    create(): Promise<IVisitor>;
    findById(visitorId: string): Promise<IVisitor | null>;
    count(): Promise<number>;
}