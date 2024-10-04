import { PhoneVerificationToken } from "../models/phoneVerificationTokenModel";
import { CreationAttributes } from "sequelize";

export class PhoneVerificationTokenRepository {
  async createToken(
    data: CreationAttributes<PhoneVerificationToken>
  ): Promise<PhoneVerificationToken> {
    return await PhoneVerificationToken.create(data);
  }

  async getToken(code: number): Promise<PhoneVerificationToken | null> {
    return await PhoneVerificationToken.findOne({ where: { code } });
  }

  async deleteToken(code: number): Promise<number> {
    return await PhoneVerificationToken.destroy({ where: { code } });
  }
}
