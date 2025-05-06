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
exports.CreateFieldUseCase = void 0;
const prismaClient_1 = require("../../libs/prismaClient");
const FieldAlreadyExists_1 = require("../../errors/FieldAlreadyExists");
class CreateFieldUseCase {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, datatype, }) {
            const fieldExists = yield prismaClient_1.prismaClient.campo.findUnique({
                where: {
                    name,
                },
            });
            if (fieldExists) {
                throw new FieldAlreadyExists_1.FieldAlreadyExistsError();
            }
            const field = yield prismaClient_1.prismaClient.campo.create({
                data: {
                    name,
                    datatype: datatype,
                },
            });
            return {
                id: field.id,
                name: field.name,
                datatype: field.datatype,
                createdAt: field.createdAt,
            };
        });
    }
}
exports.CreateFieldUseCase = CreateFieldUseCase;
