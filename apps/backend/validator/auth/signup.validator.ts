import z from "zod";

export const signupValidator = z.object({
  username: z.string(),
  password: z.string(),
  name: z.string(),
  email: z.email(),
});
