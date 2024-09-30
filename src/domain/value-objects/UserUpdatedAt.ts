export class UserUpdatedAt {
  private readonly value: Date;

  constructor(value: Date) {
    this.value = value;
    this.validateUpdatedAt(value);
  }

  private validateUpdatedAt(updatedAt: Date): void {
    if (updatedAt > new Date()) {
      throw new Error("User updated at date cannot be in the future");
    }
  }

  getValue(): Date {
    return this.value;
  }
}
