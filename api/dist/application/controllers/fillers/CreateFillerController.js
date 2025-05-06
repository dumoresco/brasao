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
exports.CreateFillerController = void 0;
const zod_1 = require("zod");
const filler_schema_1 = require("../../schemas/filler.schema");
const FieldIDNotExists_1 = require("../../errors/FieldIDNotExists");
const TypeOfDataIncorret_1 = require("../../errors/TypeOfDataIncorret");
class CreateFillerController {
    constructor(createFillerUseCase) {
        this.createFillerUseCase = createFillerUseCase;
    }
    handle(_a) {
        return __awaiter(this, arguments, void 0, function* ({ body }) {
            try {
                const { fieldId, value } = filler_schema_1.preenchimentoSchema.parse(body);
                const { id, createdAt, fieldId: field_id, value: filler_value, } = yield this.createFillerUseCase.execute({
                    fieldId,
                    value,
                });
                return {
                    statusCode: 200,
                    body: {
                        id,
                        createdAt,
                        fieldId: field_id,
                        value: filler_value,
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
                if (err instanceof TypeOfDataIncorret_1.TypeOfDataIncorrect) {
                    return {
                        statusCode: 400,
                        body: {
                            message: err.message,
                        },
                    };
                }
                if (err instanceof FieldIDNotExists_1.FieldIDNotExists) {
                    return {
                        statusCode: 400,
                        body: {
                            message: "Esse campo não existe",
                        },
                    };
                }
                throw err;
            }
        });
    }
}
exports.CreateFillerController = CreateFillerController;
