import { PhoneVerificationCodeRepository } from "../repositories/phoneVerificationCodeRepository";
import { UserRepository } from "../repositories/userRepository";
import { PhoneVerificationCode } from "../models/phoneVerificationCodeModel";
import { generateVerificationCode } from "../_utils/tokenUtil";
import { sendWhatsAppVerification } from "../helpers/whatsAppService";
import { CreationAttributes } from "sequelize";

const phoneVerificationTokenRepository = new PhoneVerificationCodeRepository();
const userRepository = new UserRepository();

export class PhoneVerificationTokenService {
  async createCode(
    phone: string,
    user_id: number
  ): Promise<PhoneVerificationCode> {
    const { code, expiresAt } = generateVerificationCode();
    const tokenData = {
      phone,
      code,
      expires_at: expiresAt,
      user_id,
    };

    const token = await phoneVerificationTokenRepository.createCode(
      tokenData as CreationAttributes<PhoneVerificationCode>
    );

    await sendWhatsAppVerification(phone, code.toString());

    return token;
  }

  async verifyPhone(code: number): Promise<boolean> {
    const token = await phoneVerificationTokenRepository.getCode(code);

    if (!token) {
      return false;
    }

    const user = await userRepository.getUserById(token.user_id);
    if (!user) {
      return false;
    }

    user.isPhoneVerified = true;
    user.phone = token.phone;
    await user.save();

    await phoneVerificationTokenRepository.deleteCodeByPhone(token.phone);

    return true;
  }

  async incrementFailedAttempts(phone: string): Promise<void> {
    await phoneVerificationTokenRepository.incrementFailedAttempts(phone);
  }
}
