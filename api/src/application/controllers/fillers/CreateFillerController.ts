import { z } from "zod";

import { IController, IRequest, IResponse } from "../../interfaces/IController";

import { CreateFillerUseCase } from "../../useCases/fillers/CreateFillerUseCase";
import { preenchimentoSchema } from "../../schemas/filler.schema";
import { FieldIDNotExists } from "../../errors/FieldIDNotExists";
import { TypeOfDataIncorrect } from "../../errors/TypeOfDataIncorret";

export class CreateFillerController implements IController {
  constructor(private readonly createFillerUseCase: CreateFillerUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { fieldId, value } = preenchimentoSchema.parse(body);

      const {
        id,
        createdAt,
        fieldId: field_id,
        value: filler_value,
      } = await this.createFillerUseCase.execute({
        fieldId,
        value,
      });

      return {
        statusCode: 200,
        body: {
          id,
          createdAt,
          fieldId: field_id,
          value: filler_value,
        },
      };
    } catch (err) {
      if (err instanceof z.ZodError) {
        return {
          statusCode: 400,
          body: {
            message: err.issues,
          },
        };
      }

      if (err instanceof TypeOfDataIncorrect) {
        return {
          statusCode: 400,
          body: {
            message: err.message,
          },
        };
      }

      if (err instanceof FieldIDNotExists) {
        return {
          statusCode: 400,
          body: {
            message: "Esse campo não existe",
          },
        };
      }

      throw err;
    }
  }
}
