export class UserName {
  private readonly value: string;

  constructor(value: string) {
    this.validateName(value);
    this.value = value;
  }

  private validateName(name: string): void {
    if (name.trim().length < 3 || name.trim().length > 50) {
      throw new Error("Name must be between 3 and 50 characters");
    }
  }

  getValue(): string {
    return this.value;
  }
}
