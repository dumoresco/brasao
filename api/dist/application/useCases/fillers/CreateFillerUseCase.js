"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFillerUseCase = void 0;
const prismaClient_1 = require("../../libs/prismaClient");
const FieldIDNotExists_1 = require("../../errors/FieldIDNotExists");
const TypeOfDataIncorret_1 = require("../../errors/TypeOfDataIncorret");
class CreateFillerUseCase {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ fieldId, value, }) {
            const fieldExists = yield prismaClient_1.prismaClient.campo.findUnique({
                where: {
                    id: fieldId,
                },
            });
            if (!fieldExists) {
                throw new FieldIDNotExists_1.FieldIDNotExists(fieldId);
            }
            // Valida se o value é do tipo correto
            const fieldType = fieldExists.datatype;
            const typeMapping = {
                STRING: "string",
                NUMBER: "number",
                BOOLEAN: "boolean",
                DATE: "object",
            };
            if (typeof value !== typeMapping[fieldType]) {
                throw new TypeOfDataIncorret_1.TypeOfDataIncorrect(fieldExists.name, typeof value);
            }
            const filler = yield prismaClient_1.prismaClient.preenchimento.create({
                data: {
                    value,
                    campo: {
                        connect: {
                            id: fieldId,
                        },
                    },
                    createdAt: new Date(),
                },
            });
            return {
                id: filler.id,
                fieldId: fieldId,
                value: filler.value,
                createdAt: filler.createdAt,
            };
        });
    }
}
exports.CreateFillerUseCase = CreateFillerUseCase;
