"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeListFillersController = makeListFillersController;
const ListFillerController_1 = require("../application/controllers/fillers/ListFillerController");
const ListFillerUseCase_1 = require("../application/useCases/fillers/ListFillerUseCase");
function makeListFillersController() {
    const listFillersUseCase = new ListFillerUseCase_1.ListFillersUseCase();
    return new ListFillerController_1.ListFillersController(listFillersUseCase);
}
