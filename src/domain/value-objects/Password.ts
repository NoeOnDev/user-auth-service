import argon2 from "argon2";

export class Password {
  private hashedValue: string;

  private constructor(hashedValue: string) {
    this.hashedValue = hashedValue;
  }

  static async create(value: string): Promise<Password> {
    const hashedValue = await Password.hashPassword(value);
    return new Password(hashedValue);
  }

  private static async hashPassword(password: string): Promise<string> {
    try {
      return await argon2.hash(password);
    } catch (err) {
      throw new Error("Error hashing password");
    }
  }

  getHashedValue(): string {
    return this.hashedValue;
  }

  async comparePassword(password: string): Promise<boolean> {
    try {
      return await argon2.verify(this.hashedValue, password);
    } catch (err) {
      throw new Error("Error verifying password");
    }
  }
}
