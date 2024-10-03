import { v4 as uuidv4 } from "uuid";

export class VerificationToken {
  constructor(
    public id: number,
    public uuid: string = uuidv4(),
    public userId: number,
    public token: string,
    public createdAt: Date,
    public expiresAt: Date
  ) {}
}
