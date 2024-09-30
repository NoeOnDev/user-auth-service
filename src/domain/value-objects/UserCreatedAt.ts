export class UserCreatedAt {
  private readonly value: Date;

  constructor(value: Date) {
    this.value = value;
    this.validateCreatedAt(value);
  }

  private validateCreatedAt(createdAt: Date): void {
    if (createdAt > new Date()) {
      throw new Error("User created at date cannot be in the future");
    }
  }

  getValue(): Date {
    return this.value;
  }
}
