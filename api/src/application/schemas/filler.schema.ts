import { z } from "zod";

export const preenchimentoSchema = z.object({
  value: z.union([z.string(), z.number(), z.boolean(), z.date()]),
  fieldId: z.string().uuid(),
});
