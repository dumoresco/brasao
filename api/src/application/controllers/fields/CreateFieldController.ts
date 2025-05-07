import { z } from "zod";

import { IController, IRequest, IResponse } from "../../interfaces/IController";

import { CreateFieldUseCase } from "../../useCases/fields/CreateFieldUseCase";
import { campoSchema } from "../../schemas/field.schema";
import { FieldAlreadyExistsError } from "../../errors/FieldAlreadyExists";

export class CreateFieldController implements IController {
  constructor(private readonly createFieldUseCase: CreateFieldUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { name, datatype } = campoSchema.parse(body);
      const {
        id,
        createdAt,
        datatype: type,
        name: fieldName,
      } = await this.createFieldUseCase.execute({
        name,
        datatype,
      });

      return {
        statusCode: 200,
        body: {
          id,
          createdAt,
          datatype: type,
          name: fieldName,
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

      if (err instanceof FieldAlreadyExistsError) {
        return {
          statusCode: 400,
          body: {
            message: "Já existe um campo com esse nome",
          },
        };
      }

      throw err;
    }
  }
}
