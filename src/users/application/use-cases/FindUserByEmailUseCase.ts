import { IUserRepository } from "../../domain/repository/IUserRepository";
import { User } from "../../domain/entity/User";

export class FindUserByEmailUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(email: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}
