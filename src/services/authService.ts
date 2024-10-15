import { UserRepository } from "../repositories/userRepository";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { env } from "../_config/env.config";
import { AppError } from "../_utils/appError";
import { PhoneVerificationTokenService } from "./phoneVerificationCodeService";

const userRepository = new UserRepository();
const phoneVerificationTokenService = new PhoneVerificationTokenService();

export class AuthService {
  async login(
    email: string,
    password: string
  ): Promise<{ userId: number; phone: string }> {
    const user = await userRepository.getUserByEmail(email);

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401);
    }

    if (!user.isEmailVerified) {
      throw new AppError("Email is not verified", 403);
    }

    if (!user.isPhoneVerified) {
      throw new AppError("Phone is not verified", 403);
    }

    await phoneVerificationTokenService.createCode(
      user.phone as string,
      user.id
    );

    return { userId: user.id, phone: user.phone as string };
  }

  async verify2FA(userId: number, code: number): Promise<string> {
    const isValid = await phoneVerificationTokenService.verifyPhone(code);

    if (!isValid) {
      throw new AppError("Invalid or expired 2FA code", 400);
    }

    const user = await userRepository.getUserById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      env.jwt.JWT_SECRET,
      {
        expiresIn: env.jwt.JWT_EXPIRATION,
      }
    );

    return token;
  }
}
