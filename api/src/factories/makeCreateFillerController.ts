import { CreateFillerController } from "../application/controllers/fillers/CreateFillerController";
import { CreateFillerUseCase } from "../application/useCases/fillers/CreateFillerUseCase";

export function makeCreateFillerController() {
  const createFillerUseCase = new CreateFillerUseCase();
  return new CreateFillerController(createFillerUseCase);
}
