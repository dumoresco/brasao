import { TipoDado } from "@prisma/client";
import { prismaClient } from "../../libs/prismaClient";
import { FieldAlreadyExistsError } from "../../errors/FieldAlreadyExists";

interface IInputCreateFieldUseCase {
  name: string;
  datatype: TipoDado;
}

interface IOutputCreateFieldUseCase {
  id: string;
  name: string;
  datatype: TipoDado;
  createdAt: Date;
}

export class CreateFieldUseCase {
  async execute({
    name,
    datatype,
  }: IInputCreateFieldUseCase): Promise<IOutputCreateFieldUseCase> {
    const fieldExists = await prismaClient.campo.findUnique({
      where: {
        name,
      },
    });

    console.log("Field exists:", fieldExists);
    if (fieldExists) {
      throw new FieldAlreadyExistsError();
    }

    const field = await prismaClient.campo.create({
      data: {
        name,
        datatype: datatype,
      },
    });

    console.log("Field created:", field);
    return {
      id: field.id,
      name: field.name,
      datatype: field.datatype,
      createdAt: field.createdAt,
    };
  }
}
