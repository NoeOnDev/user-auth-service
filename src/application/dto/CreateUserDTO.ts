export interface CreateUserDTO {
  id: number;
  uuid?: string;
  name: string;
  email: string;
  password: string;
  location: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
}
