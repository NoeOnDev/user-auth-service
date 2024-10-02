export class User {
  constructor(
    public id: number,
    public uuid: string,
    public name: string,
    public email: string,
    public password: string,
    public phone: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
