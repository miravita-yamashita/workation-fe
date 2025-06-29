import { z } from "zod";

export const searchFormSchema = z.object({
  searchTerm: z.string(),
});
