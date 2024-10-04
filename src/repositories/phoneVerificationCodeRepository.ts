import { PhoneVerificationCode } from "../models/phoneVerificationCodeModel";
import { CreationAttributes } from "sequelize";

export class PhoneVerificationCodeRepository {
  async createCode(
    data: CreationAttributes<PhoneVerificationCode>
  ): Promise<PhoneVerificationCode> {
    return await PhoneVerificationCode.create(data);
  }

  async getCode(code: number): Promise<PhoneVerificationCode | null> {
    return await PhoneVerificationCode.findOne({ where: { code } });
  }

  async getCodeByPhone(phone: string): Promise<PhoneVerificationCode | null> {
    return await PhoneVerificationCode.findOne({ where: { phone } });
  }

  async deleteCodeByPhone(phone: string): Promise<number> {
    return await PhoneVerificationCode.destroy({ where: { phone } });
  }

  async incrementFailedAttempts(phone: string): Promise<void> {
    const token = await this.getCodeByPhone(phone);
    if (token) {
      token.failed_attempts += 1;
      await token.save();
    }
  }
}
