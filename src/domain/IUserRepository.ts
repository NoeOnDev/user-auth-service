import { User } from "./User";

export interface IUserRepository {
  save(user: User): Promise<void>;
}
