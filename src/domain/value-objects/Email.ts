export class Email {
  constructor(private readonly value: string) {
    if (!this.validateEmail(value)) {
      throw new Error("Invalid email address");
    }
  }

  private validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  getValue(): string {
    return this.value;
  }
}
