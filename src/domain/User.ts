import { v4 as uuidv4 } from "uuid";

export class User {
  constructor(
    public id: string,
    public uuid: string = uuidv4(),
    public name: string,
    public email: string,
    public age: number,
    public location: string,
    public isVerified: boolean = false
  ) {}
}
