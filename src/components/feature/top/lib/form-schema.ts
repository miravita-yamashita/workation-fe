import { z } from "zod";

export const topSearchFormSchema = z.object({
  freeWordSearch: z.string().optional(),
  jobSearchCheckboxItems: z.array(z.string()).optional(),
  commitmentCheckboxItems: z.array(z.string()).optional(),
});
