import { VerificationToken } from "../entities/VerificationToken";

export interface IVerificationTokenRepository {
  create(verificationToken: VerificationToken): Promise<VerificationToken>;
  findByToken(token: string): Promise<VerificationToken | null>;
  delete(token: VerificationToken): Promise<void>;
}
