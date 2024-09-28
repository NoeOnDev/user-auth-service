export class Location {
  constructor(
    private readonly address: string,
    private readonly city: string,
    private readonly country: string
  ) {}

  getAddress(): string {
    return this.address;
  }

  getCity(): string {
    return this.city;
  }

  getCountry(): string {
    return this.country;
  }
}
