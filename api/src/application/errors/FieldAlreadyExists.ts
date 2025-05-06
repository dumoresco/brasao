export class FieldAlreadyExistsError extends Error {
  constructor() {
    super("Já existe um campo com esse nome");
    this.name = "UserNotFound";
  }
}
