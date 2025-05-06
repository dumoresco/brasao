export class TypeOfDataIncorrect extends Error {
  constructor(field: string, type: string) {
    super(`Field ${field} is not of type ${type}`);
    this.name = "TypeOfDataIncorrect";
  }
}
