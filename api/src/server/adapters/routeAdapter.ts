import { Request, Response } from "express";
import { IController } from "../../application/interfaces/IController";

export function routeAdapter(controller: IController) {
  return async (req: Request, res: Response) => {
    const { body, statusCode } = await controller.handle({
      body: req.body,
    });

    res.status(statusCode).json(body);
  };
}
