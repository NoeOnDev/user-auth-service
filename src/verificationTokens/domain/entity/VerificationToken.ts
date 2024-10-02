export class VerificationToken {
  constructor(
    public id: number,
    public userId: number,
    public token: string,
    public createdAt: Date,
    public expiresAt: Date
  ) {}
}
