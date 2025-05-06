"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldIDNotExists = void 0;
class FieldIDNotExists extends Error {
    constructor(field) {
        super(`Field ID ${field} does not exist`);
        this.name = "FieldNotExists";
    }
}
exports.FieldIDNotExists = FieldIDNotExists;
