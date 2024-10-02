export class UserPhone {
  private readonly value: string;

  constructor(value: string) {
    if (!this.validatePhone(value)) {
      throw new Error("Invalid phone number format");
    }
    this.value = value;
  }

  private validatePhone(phone: string): boolean {
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(phone);
  }

  getValue(): string {
    return this.value;
  }
}
