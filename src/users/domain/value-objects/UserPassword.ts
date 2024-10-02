export class UserPassword {
  private readonly value: string;

  constructor(password: string) {
    if (!this.validatePassword(password)) {
      throw new Error("Password does not meet security requirements");
    }
    this.value = password;
  }

  private validatePassword(password: string): boolean {
    return password.length >= 8 && /\d/.test(password);
  }

  getValue(): string {
    return this.value;
  }
}
