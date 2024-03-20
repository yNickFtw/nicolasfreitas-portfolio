import { IJWTService } from "./IJWTService";
import jwt, { JwtPayload } from 'jsonwebtoken'

export default class JWTService implements IJWTService {
    private JWT_SECRET: string;

    constructor() {
        this.JWT_SECRET = process.env.JWT_SECRET as string;
    }
    
    generateToken(payload: {}, expIn: string): string {
        return jwt.sign(payload, this.JWT_SECRET, {
            expiresIn: expIn
        })
    }

    decodeToken(token: string, isBearer: boolean): JwtPayload {
        try {
            if (isBearer) {
                token = token.split('Bearer ')[1];
            }
    
            const decoded = jwt.verify(token, this.JWT_SECRET)
    
            return decoded as JwtPayload;
        } catch (error) {
            throw error;
        }
    }
}