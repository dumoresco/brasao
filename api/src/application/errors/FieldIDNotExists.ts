export class FieldIDNotExists extends Error {
  constructor(field: string) {
    super(`Field ID ${field} does not exist`);
    this.name = "FieldNotExists";
  }
}
