import { CreateFieldController } from "../application/controllers/fields/CreateFieldController";
import { CreateFieldUseCase } from "../application/useCases/fields/CreateFieldUseCase";

export function makeCreateFieldController() {
  const createFieldUseCase = new CreateFieldUseCase();
  return new CreateFieldController(createFieldUseCase);
}
