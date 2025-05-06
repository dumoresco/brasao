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
exports.CreateFieldController = void 0;
const zod_1 = require("zod");
const field_schema_1 = require("../../schemas/field.schema");
const FieldAlreadyExists_1 = require("../../errors/FieldAlreadyExists");
class CreateFieldController {
    constructor(createFieldUseCase) {
        this.createFieldUseCase = createFieldUseCase;
    }
    handle(_a) {
        return __awaiter(this, arguments, void 0, function* ({ body }) {
            try {
                const { name, datatype } = field_schema_1.campoSchema.parse(body);
                const { id, createdAt, datatype: type, name: fieldName, } = yield this.createFieldUseCase.execute({
                    name,
                    datatype,
                });
                return {
                    statusCode: 200,
                    body: {
                        id,
                        createdAt,
                        datatype: type,
                        name: fieldName,
                    },
                };
            }
            catch (err) {
                if (err instanceof zod_1.z.ZodError) {
                    return {
                        statusCode: 400,
                        body: {
                            message: err.issues,
                        },
                    };
                }
                if (err instanceof FieldAlreadyExists_1.FieldAlreadyExistsError) {
                    return {
                        statusCode: 400,
                        body: {
                            message: "Já existe um campo com esse nome",
                        },
                    };
                }
                throw err;
            }
        });
    }
}
exports.CreateFieldController = CreateFieldController;
