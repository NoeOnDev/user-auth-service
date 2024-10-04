import { UserRepository } from "../repositories/userRepository";
import { User } from "../models/userModel";
import { CreationAttributes } from "sequelize";
import { EmailVerificationTokenRepository } from "../repositories/emailVerificationTokenRepository";
import { sendVerificationEmail } from "../helpers/emailService";
import { EmailVerificationToken } from "../models/emailVerificationTokenModel";
import { generateVerificationToken } from "../_utils/tokenUtil";

const userRepository = new UserRepository();
const emailVerificationTokenRepository = new EmailVerificationTokenRepository();

export class UserService {
  async createUser(data: CreationAttributes<User>): Promise<User> {
    const user = await userRepository.createUser(data);

    const { token, expiresAt } = generateVerificationToken();

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

  async updateUser(
    uuid: string,
    data: Partial<User>
  ): Promise<[number, User[]]> {
    return await userRepository.updateUser(uuid, data);
  }

  async deleteUser(id: number): Promise<number> {
    return await userRepository.deleteUser(id);
  }

  async getAllUsers(): Promise<User[]> {
    return await userRepository.getAllUsers();
  }
}
