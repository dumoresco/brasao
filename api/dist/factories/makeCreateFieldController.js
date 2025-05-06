"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreateFieldController = makeCreateFieldController;
const CreateFieldController_1 = require("../application/controllers/fields/CreateFieldController");
const CreateFieldUseCase_1 = require("../application/useCases/fields/CreateFieldUseCase");
function makeCreateFieldController() {
    const createFieldUseCase = new CreateFieldUseCase_1.CreateFieldUseCase();
    return new CreateFieldController_1.CreateFieldController(createFieldUseCase);
}
