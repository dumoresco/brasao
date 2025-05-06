import { CreateFieldController } from "../application/controllers/fields/CreateFieldController";
import { ListFieldsController } from "../application/controllers/fields/ListFieldsController";
import { CreateFieldUseCase } from "../application/useCases/fields/CreateFieldUseCase";
import { ListFieldsUseCase } from "../application/useCases/fields/ListFieldsUseCase";

export function makeListFieldsController() {
  const listFieldsUseCase = new ListFieldsUseCase();
  return new ListFieldsController(listFieldsUseCase);
}
