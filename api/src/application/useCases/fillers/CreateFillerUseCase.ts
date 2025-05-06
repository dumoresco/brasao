import { TipoDado } from "@prisma/client";
import { prismaClient } from "../../libs/prismaClient";
import { FieldAlreadyExistsError } from "../../errors/FieldAlreadyExists";
import { FieldIDNotExists } from "../../errors/FieldIDNotExists";
import { TypeOfDataIncorrect } from "../../errors/TypeOfDataIncorret";

interface IInputCreateFillerUseCase {
  fieldId: string;
  value: string | number | boolean | Date;
}

interface IOutputCreateFillerUseCase {
  id: string;
  fieldId: string;
  value: string | number | boolean | Date;
  createdAt: Date;
}

export class CreateFillerUseCase {
  async execute({
    fieldId,
    value,
  }: IInputCreateFillerUseCase): Promise<IOutputCreateFillerUseCase> {
    const fieldExists = await prismaClient.campo.findUnique({
      where: {
        id: fieldId,
      },
    });

    if (!fieldExists) {
      throw new FieldIDNotExists(fieldId);
    }

    const fieldType = fieldExists.datatype;
    const typeMapping: Record<TipoDado, string> = {
      STRING: "string",
      NUMBER: "number",
      BOOLEAN: "boolean",
      DATE: "object",
    };

    if (fieldType === "DATE" && typeof value === "string") {
      value = new Date(value);
      if (isNaN(value.getTime())) {
        throw new TypeOfDataIncorrect(fieldExists.name, typeof value);
      }
    }

    if (typeof value !== typeMapping[fieldType] && !(value instanceof Date)) {
      throw new TypeOfDataIncorrect(fieldExists.name, typeof value);
    }

    const filler = await prismaClient.preenchimento.create({
      data: {
        value,
        campo: {
          connect: {
            id: fieldId,
          },
        },
        createdAt: new Date(),
      },
    });
    return {
      id: filler.id,
      fieldId: fieldId,
      value: filler.value as string | number | boolean | Date,
      createdAt: filler.createdAt,
    };
  }
}
