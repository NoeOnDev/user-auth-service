export class Phone {
  constructor(private readonly value: string) {
    if (!this.validatePhone(value)) {
      throw new Error("Invalid phone number");
    }
  }

  private validatePhone(phone: string): boolean {
    const re = /^\+?[1-9]\d{1,14}$/;
    return re.test(phone);
  }

  getValue(): string {
    return this.value;
  }
}
