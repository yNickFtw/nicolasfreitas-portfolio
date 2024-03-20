export interface IBCryptService {
    encrypt(s: string): Promise<string>;
    match(hash: string, s: string): Promise<boolean>;
}