import { EmailVerificationTokenRepository } from "../repositories/emailVerificationTokenRepository";
import { EmailVerificationToken } from "../models/emailVerificationTokenModel";
import { UserRepository } from "../repositories/userRepository";
import { CreationAttributes } from "sequelize";
import { AppError } from "../_utils/appError";

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
      throw new AppError("Invalid or expired token", 400);
    }

    const user = await userRepository.getUserById(emailToken.user_id);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    user.isEmailVerified = true;
    await user.save();

    await this.deleteToken(token);

    return true;
  }
}
