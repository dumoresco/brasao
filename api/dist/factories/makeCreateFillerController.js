"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreateFillerController = makeCreateFillerController;
const CreateFillerController_1 = require("../application/controllers/fillers/CreateFillerController");
const CreateFillerUseCase_1 = require("../application/useCases/fillers/CreateFillerUseCase");
function makeCreateFillerController() {
    const createFillerUseCase = new CreateFillerUseCase_1.CreateFillerUseCase();
    return new CreateFillerController_1.CreateFillerController(createFillerUseCase);
}
