import { EmailVerificationTokenRepository } from "../repositories/emailVerificationTokenRepository";
import { EmailVerificationToken } from "../models/emailVerificationTokenModel";
import { UserRepository } from "../repositories/userRepository";
import { CreationAttributes } from "sequelize";

const emailVerificationTokenRepository = new EmailVerificationTokenRepository();
const userRepository = new UserRepository();

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

  async verifyEmail(token: string): Promise<boolean> {
    const emailToken = await this.getToken(token);
    if (!emailToken) {
      return false;
    }

    const user = await userRepository.getUserById(emailToken.user_id);
    if (!user) {
      return false;
    }

    user.isEmailVerified = true;
    await user.save();

    await this.deleteToken(token);

    return true;
  }
}
