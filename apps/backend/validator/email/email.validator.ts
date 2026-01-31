import z from "zod";

export const emailValidator = z.object({
  recipentEmail: z.string(),
  subject: z.string(),
  message: z.string(),
});
