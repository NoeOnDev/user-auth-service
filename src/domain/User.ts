import { UserEmail } from "./value-objects/UserEmail";
import { UserId } from "./value-objects/UserId";
import { UserPasswordHash } from "./value-objects/UserPasswordHash";

export class User {
  constructor(
    public id: UserId,
    public uuid: string,
    public name: string,
    public email: UserEmail,
    public passwordHash: UserPasswordHash,
    public phone: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
