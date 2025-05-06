import { IController, IRequest, IResponse } from "../../interfaces/IController";
import { ListFieldsUseCase } from "../../useCases/fields/ListFieldsUseCase";
import { ListFillersUseCase } from "../../useCases/fillers/ListFillerUseCase";

export class ListFillersController implements IController {
  constructor(private readonly listFillersUseCase: ListFillersUseCase) {}

  async handle(_: IRequest): Promise<IResponse> {
    try {
      const fillers = await this.listFillersUseCase.execute();

      return {
        statusCode: 200,
        body: fillers,
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: {
          message: "Erro interno ao listar os preenchimentos.",
        },
      };
    }
  }
}
