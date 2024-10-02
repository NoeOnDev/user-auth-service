import { v4 as uuidv4 } from "uuid";
import { UserEmail } from "../value-objects/UserEmail";
import { UserPassword } from "../value-objects/UserPassword";
import { UserPhone } from "../value-objects/UserPhone";

export class User {
  constructor(
    public id: number,
    public uuid: string = uuidv4(),
    public name: string,
    public email: UserEmail,
    public password: UserPassword,
    public phone: UserPhone,
    public isEmailVerified: boolean,
    public isPhoneVerified: boolean,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
