import { UserRepository } from "../repositories/userRepository";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { env } from "../_config/env.config";
import { AppError } from "../_utils/appError";

const userRepository = new UserRepository();

export class AuthService {
  async login(email: string, password: string): Promise<string> {
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
