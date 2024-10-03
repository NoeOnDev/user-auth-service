import { IUserRepository } from "../../domain/repository/IUserRepository";
import { User } from "../../domain/entity/User";

export class FindUserByUuidUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(uuid: string): Promise<User | null> {
    const user = await this.userRepository.findByUuid(uuid);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}
