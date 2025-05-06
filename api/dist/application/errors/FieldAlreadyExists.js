"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldAlreadyExistsError = void 0;
class FieldAlreadyExistsError extends Error {
    constructor() {
        super("Já existe um campo com esse nome");
        this.name = "UserNotFound";
    }
}
exports.FieldAlreadyExistsError = FieldAlreadyExistsError;
