import { EmailVerificationTokenRepository } from "../repositories/emailVerificationTokenRepository";
import { EmailVerificationToken } from "../models/emailVerificationTokenModel";
import { CreationAttributes } from "sequelize";

const emailVerificationTokenRepository = new EmailVerificationTokenRepository();

export class EmailVerificationTokenService {
  async createToken(
    data: CreationAttributes<EmailVerificationToken>
  ): Promise<EmailVerificationToken> {
    return await emailVerificationTokenRepository.createToken(data);
  }

  async getToken(token: string): Promise<EmailVerificationToken | null> {
    return await emailVerificationTokenRepository.getToken(token);
  }

  async deleteToken(token: string): Promise<number> {
    return await emailVerificationTokenRepository.deleteToken(token);
  }
}
