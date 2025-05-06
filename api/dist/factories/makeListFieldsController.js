"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeListFieldsController = makeListFieldsController;
const ListFieldsController_1 = require("../application/controllers/fields/ListFieldsController");
const ListFieldsUseCase_1 = require("../application/useCases/fields/ListFieldsUseCase");
function makeListFieldsController() {
    const listFieldsUseCase = new ListFieldsUseCase_1.ListFieldsUseCase();
    return new ListFieldsController_1.ListFieldsController(listFieldsUseCase);
}
