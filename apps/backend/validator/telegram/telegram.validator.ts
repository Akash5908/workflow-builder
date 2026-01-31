import z from "zod";

export const telegramValidator = z.object({
  chatID: z.string(),
  message: z.string(),
});
