import { v4 as uuidv4 } from "uuid";
import { Email } from "./value-objects/Email";
import { Phone } from "./value-objects/Phone";
import { Location } from "./value-objects/Location";
import { Password } from "./value-objects/Password";

export class User {
  constructor(
    public id: string,
    public uuid: string = uuidv4(),
    public name: string,
    public email: Email,
    public phone: Phone,
    public age: number,
    public location: Location,
    public password: Password,
    public isVerified: boolean = false
  ) {}
}
