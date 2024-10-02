import { v4 as uuidv4 } from "uuid";

export class User {
  constructor(
    public id: number,
    public uuid: string = uuidv4(),
    public name: string,
    public email: string,
    public password: string,
    public phone: string | null,
    public isEmailVerified: boolean,
    public isPhoneVerified: boolean,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
