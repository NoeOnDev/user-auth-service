import { EmailVerificationToken } from "../models/emailVerificationTokenModel";
import { CreationAttributes } from "sequelize";

export class EmailVerificationTokenRepository {
  async createToken(
    data: CreationAttributes<EmailVerificationToken>
  ): Promise<EmailVerificationToken> {
    return await EmailVerificationToken.create(data);
  }

  async getToken(token: string): Promise<EmailVerificationToken | null> {
    return await EmailVerificationToken.findOne({ where: { token } });
  }

  async deleteToken(token: string): Promise<number> {
    return await EmailVerificationToken.destroy({ where: { token } });
  }
}
