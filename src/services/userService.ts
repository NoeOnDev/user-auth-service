import { UserRepository } from "../repositories/userRepository";
import { User } from "../models/userModel";
import { CreationAttributes } from "sequelize";
import { EmailVerificationTokenRepository } from "../repositories/emailVerificationTokenRepository";
import { v4 as uuidv4 } from "uuid";
import { sendVerificationEmail } from "./emailService";
import { EmailVerificationToken } from "../models/emailVerificationTokenModel";

const userRepository = new UserRepository();
const emailVerificationTokenRepository = new EmailVerificationTokenRepository();

export class UserService {
  async createUser(data: CreationAttributes<User>): Promise<User> {
    const user = await userRepository.createUser(data);

    const token = uuidv4();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    const tokenData = {
      user_id: user.id,
      token,
      expires_at: expiresAt,
    } as Partial<EmailVerificationToken>;

    await emailVerificationTokenRepository.createToken(
      tokenData as CreationAttributes<EmailVerificationToken>
    );

    await sendVerificationEmail(user.email, token);

    return user;
  }

  async getUserById(id: number): Promise<User | null> {
    return await userRepository.getUserById(id);
  }

  async getUserByUuid(uuid: string): Promise<User | null> {
    return await userRepository.getUserByUuid(uuid);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await userRepository.getUserByEmail(email);
  }

  async updateUser(id: number, data: Partial<User>): Promise<[number, User[]]> {
    return await userRepository.updateUser(id, data);
  }

  async deleteUser(id: number): Promise<number> {
    return await userRepository.deleteUser(id);
  }

  async getAllUsers(): Promise<User[]> {
    return await userRepository.getAllUsers();
  }
}
