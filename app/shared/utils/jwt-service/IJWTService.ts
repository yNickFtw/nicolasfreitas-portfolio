import { JwtPayload } from "jsonwebtoken";

export interface IJWTService {
    generateToken(payload: {}, expIn: string): string;
    decodeToken(token: string, isBearer: boolean): JwtPayload;
}