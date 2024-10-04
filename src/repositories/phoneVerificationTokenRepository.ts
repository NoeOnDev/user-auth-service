import { PhoneVerificationToken } from "../models/phoneVerificationTokenModel";
import { CreationAttributes } from "sequelize";

export class PhoneVerificationTokenRepository {
  async createToken(
    data: CreationAttributes<PhoneVerificationToken>
  ): Promise<PhoneVerificationToken> {
    return await PhoneVerificationToken.create(data);
  }

  async getToken(token: string): Promise<PhoneVerificationToken | null> {
    return await PhoneVerificationToken.findOne({ where: { token } });
  }

  async deleteToken(token: string): Promise<number> {
    return await PhoneVerificationToken.destroy({ where: { token } });
  }
}
