export class UserPhone {
  private readonly value: string;

  constructor(value: string) {
    this.validatePhone(value);
    this.value = value;
  }

  private validatePhone(phone: string): void {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phone)) {
      throw new Error("Invalid phone number format");
    }
  }

  getValue(): string {
    return this.value;
  }
}
