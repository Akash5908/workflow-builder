import z from "zod";

export const workflowValidator = z.object({
  workflowName: z.string(),
});
