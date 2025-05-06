import { IController, IRequest, IResponse } from "../../interfaces/IController";
import { ListFieldsUseCase } from "../../useCases/fields/ListFieldsUseCase";

export class ListFieldsController implements IController {
  constructor(private readonly listFieldsUseCase: ListFieldsUseCase) {}

  async handle(_: IRequest): Promise<IResponse> {
    try {
      const fields = await this.listFieldsUseCase.execute();

      return {
        statusCode: 200,
        body: fields,
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: {
          message: "Erro interno ao listar os campos.",
        },
      };
    }
  }
}
