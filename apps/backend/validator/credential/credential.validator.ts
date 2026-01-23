import z from "zod";
import { CredsType } from "../../models/credential/credential.model";

export const credentialValidator = z.object({
  name: z.string(),
  type: z.enum(CredsType),
});
