import { User } from "../entities/User";

export interface IUserRepository {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findByUuid(uuid: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(user: User): Promise<User>;
  delete(uuid: string): Promise<void>;
}
