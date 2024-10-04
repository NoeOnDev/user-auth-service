import { PhoneVerificationCodeRepository } from "../repositories/phoneVerificationCodeRepository";
import { UserRepository } from "../repositories/userRepository";
import { PhoneVerificationCode } from "../models/phoneVerificationCodeModel";
import { generateVerificationCode } from "../_utils/tokenUtil";
import { sendWhatsAppVerification } from "../helpers/whatsAppService";
import { CreationAttributes } from "sequelize";
import { AppError } from "../_utils/appError";

const phoneVerificationCodeRepository = new PhoneVerificationCodeRepository();
const userRepository = new UserRepository();

export class PhoneVerificationTokenService {
  async createCode(
    phone: string,
    user_id: number
  ): Promise<PhoneVerificationCode> {
    const user = await userRepository.getUserById(user_id);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (!user.isEmailVerified) {
      throw new AppError("User email is not verified", 403);
    }

    const { code, expiresAt } = generateVerificationCode();
    const tokenData = {
      phone,
      code,
      expires_at: expiresAt,
      user_id,
    };

    const token = await phoneVerificationCodeRepository.createCode(
      tokenData as CreationAttributes<PhoneVerificationCode>
    );

    await sendWhatsAppVerification(phone, code.toString());

    return token;
  }

  async verifyPhone(code: number): Promise<boolean> {
    const token = await phoneVerificationCodeRepository.getCode(code);

    if (!token) {
      throw new AppError("Invalid or expired code", 400);
    }

    const user = await userRepository.getUserById(token.user_id);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    user.isPhoneVerified = true;
    user.phone = token.phone;
    await user.save();

    await phoneVerificationCodeRepository.deleteCodeByPhone(token.phone);

    return true;
  }
}
