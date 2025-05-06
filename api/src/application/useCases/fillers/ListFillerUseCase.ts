import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ListFillersUseCase {
  async execute() {
    const fillers = await prisma.preenchimento.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return fillers;
  }
}
