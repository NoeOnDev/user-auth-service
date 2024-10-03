import { IUserRepository } from "../../domain/repository/IUserRepository";
import { User } from "../../domain/entity/User";

export class FindAllUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
