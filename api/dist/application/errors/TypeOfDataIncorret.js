"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOfDataIncorrect = void 0;
class TypeOfDataIncorrect extends Error {
    constructor(field, type) {
        super(`Field ${field} is not of type ${type}`);
        this.name = "TypeOfDataIncorrect";
    }
}
exports.TypeOfDataIncorrect = TypeOfDataIncorrect;
