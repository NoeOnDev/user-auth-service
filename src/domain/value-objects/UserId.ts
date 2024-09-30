export class UserId {
  private readonly value: number;

  constructor(value: number) {
    this.validateId(value);
    this.value = value;
  }

  private validateId(id: number): void {
    if (id === null || id === undefined) {
      throw new Error("User ID cannot be null or undefined");
    }
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("User ID must be a positive integer");
    }
  }

  getValue(): number {
    return this.value;
  }
}
