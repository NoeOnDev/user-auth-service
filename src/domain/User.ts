import { v4 as uuidv4 } from "uuid";

export class User {
  constructor(
    public id: string,
    public uuid: string = uuidv4(),
    public name: string,
    public email: string,
    public phone: string,
    public age: number,
    public password: string,
    public location: string,
    public isVerified: boolean = false
  ) {}
}
