import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ListFieldsUseCase {
  async execute() {
    const fields = await prisma.campo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return fields;
  }
}
