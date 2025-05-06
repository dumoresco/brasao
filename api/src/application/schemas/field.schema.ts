import { z } from "zod";

export const campoSchema = z.object({
  name: z.string().min(1),
  datatype: z.enum(["STRING", "NUMBER", "BOOLEAN", "DATE"]),
});
