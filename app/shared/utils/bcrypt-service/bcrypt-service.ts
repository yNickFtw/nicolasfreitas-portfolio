import { IBCryptService } from "./IBCryptService";
import bcrypt from 'bcryptjs';

export default class BCryptService implements IBCryptService {
    public async encrypt(s: string): Promise<string> {
        const salt = await bcrypt.genSalt(12)
        
        return await bcrypt.hash(s, salt);
    }

    public async match(hash: string, s: string): Promise<boolean> {
        const matches = await bcrypt.compare(s, hash)
        
        return matches;
    }
}