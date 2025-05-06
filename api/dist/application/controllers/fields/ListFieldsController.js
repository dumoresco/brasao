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
exports.ListFieldsController = void 0;
class ListFieldsController {
    constructor(listFieldsUseCase) {
        this.listFieldsUseCase = listFieldsUseCase;
    }
    handle(_) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fields = yield this.listFieldsUseCase.execute();
                return {
                    statusCode: 200,
                    body: fields,
                };
            }
            catch (err) {
                return {
                    statusCode: 500,
                    body: {
                        message: "Erro interno ao listar os campos.",
                    },
                };
            }
        });
    }
}
exports.ListFieldsController = ListFieldsController;
