export class UserPassword {
  private readonly value: string;

  constructor(value: string) {
    this.validatePassword(value);
    this.value = value;
  }

  private validatePassword(password: string): void {
    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }
  }

  getValue(): string {
    return this.value;
  }
}
