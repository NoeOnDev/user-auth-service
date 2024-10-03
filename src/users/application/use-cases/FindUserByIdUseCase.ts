import { IUserRepository } from "../../domain/repository/IUserRepository";
import { User } from "../../domain/entity/User";

export class FindUserByIdUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(id: number): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}
