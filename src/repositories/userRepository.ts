import { User } from "../models/userModel";
import { CreationAttributes } from "sequelize";

export class UserRepository {
  async createUser(data: CreationAttributes<User>): Promise<User> {
    return await User.create(data);
  }

  async getUserById(id: number): Promise<User | null> {
    return await User.findByPk(id);
  }

  async getUserByUuid(uuid: string): Promise<User | null> {
    return await User.findOne({ where: { uuid } });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { email } });
  }

  async updateUser(
    uuid: string,
    data: Partial<User>
  ): Promise<[number, User[]]> {
    return await User.update(data, { where: { uuid }, returning: true });
  }

  async deleteUser(id: number): Promise<number> {
    return await User.destroy({ where: { id } });
  }

  async getAllUsers(): Promise<User[]> {
    return await User.findAll();
  }
}
