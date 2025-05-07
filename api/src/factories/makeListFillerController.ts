import { ListFillersController } from "../application/controllers/fillers/ListFillerController";
import { ListFillersUseCase } from "../application/useCases/fillers/ListFillerUseCase";

export function makeListFillersController() {
  const listFillersUseCase = new ListFillersUseCase();
  return new ListFillersController(listFillersUseCase);
}
