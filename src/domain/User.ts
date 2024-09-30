import { UserCreatedAt } from "./value-objects/UserCreatedAt";
import { UserEmail } from "./value-objects/UserEmail";
import { UserId } from "./value-objects/UserId";
import { UserLocation } from "./value-objects/UserLocation";
import { UserName } from "./value-objects/UserName";
import { UserPassword } from "./value-objects/UserPassword";
import { UserPhone } from "./value-objects/UserPhone";
import { UserUpdatedAt } from "./value-objects/UserUpdatedAt";
import { UserUuid } from "./value-objects/UserUuid";

export class User {
  id: UserId;
  uuid: UserUuid;
  name: UserName;
  email: UserEmail;
  password: UserPassword;
  location: UserLocation;
  phone: UserPhone;
  createdAt: UserCreatedAt;
  updatedAt: UserUpdatedAt;

  constructor(
    id: UserId,
    uuid: UserUuid,
    name: UserName,
    email: UserEmail,
    password: UserPassword,
    location: UserLocation,
    phone: UserPhone,
    createdAt: UserCreatedAt,
    updatedAt: UserUpdatedAt
  ) {
    this.id = id;
    this.uuid = uuid;
    this.name = name;
    this.email = email;
    this.password = password;
    this.location = location;
    this.phone = phone;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
