import { CreateFieldController } from "../application/controllers/fields/CreateFieldController";
import { ListFieldsController } from "../application/controllers/fields/ListFieldsController";
import { ListFillersController } from "../application/controllers/fillers/ListFillerController";
import { CreateFieldUseCase } from "../application/useCases/fields/CreateFieldUseCase";
import { ListFieldsUseCase } from "../application/useCases/fields/ListFieldsUseCase";
import { ListFillersUseCase } from "../application/useCases/fillers/ListFillerUseCase";

export function makeListFillersController() {
  const listFillersUseCase = new ListFillersUseCase();
  return new ListFillersController(listFillersUseCase);
}
