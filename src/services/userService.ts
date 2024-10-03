import { UserRepository } from "../repositories/userRepository";
import { User } from "../models/userModel";
import { CreationAttributes } from "sequelize";

const userRepository = new UserRepository();

export class UserService {
  async createUser(data: CreationAttributes<User>): Promise<User> {
    return await userRepository.createUser(data);
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
