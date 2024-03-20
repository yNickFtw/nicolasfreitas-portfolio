import { IUser } from "../models/IUser";

export interface IUserRepository {
    create(user: Partial<IUser>): Promise<void>;
    findByEmail(email: string): Promise<IUser | null>;
}