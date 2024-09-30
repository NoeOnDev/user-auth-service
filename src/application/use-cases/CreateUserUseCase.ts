import { IUserRepository } from "../../domain/IUserRepository";
import { User } from "../../domain/User";
import { UserCreatedAt } from "../../domain/value-objects/UserCreatedAt";
import { UserEmail } from "../../domain/value-objects/UserEmail";
import { UserId } from "../../domain/value-objects/UserId";
import { UserName } from "../../domain/value-objects/UserName";
import { UserPassword } from "../../domain/value-objects/UserPassword";
import { UserPhone } from "../../domain/value-objects/UserPhone";
import { UserLocation } from "../../domain/value-objects/UserLocation";
import { UserUuid } from "../../domain/value-objects/UserUuid";
import { CreateUserDTO } from "../dto/CreateUserDTO";
import { UserUpdatedAt } from "../../domain/value-objects/UserUpdatedAt";

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(dto: CreateUserDTO): Promise<void> {
    const user = new User(
      new UserId(dto.id),
      new UserUuid(dto.uuid),
      new UserName(dto.name),
      new UserEmail(dto.email),
      new UserPassword(dto.password),
      new UserLocation(dto.location),
      new UserPhone(dto.phone),
      new UserCreatedAt(dto.createdAt || new Date()),
      new UserUpdatedAt(dto.updatedAt || new Date())
    );

    await this.userRepository.save(user);
  }
}
