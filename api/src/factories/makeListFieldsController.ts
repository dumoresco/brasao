import { ListFieldsController } from "../application/controllers/fields/ListFieldsController";
import { ListFieldsUseCase } from "../application/useCases/fields/ListFieldsUseCase";

export function makeListFieldsController() {
  const listFieldsUseCase = new ListFieldsUseCase();
  return new ListFieldsController(listFieldsUseCase);
}
