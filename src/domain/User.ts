export class User {
  id: string;
  uuid: string;
  name: string;
  email: string;
  password: string;
  location: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    uuid: string,
    name: string,
    email: string,
    password: string,
    location: string,
    phone: string,
    createdAt: Date,
    updatedAt: Date
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
