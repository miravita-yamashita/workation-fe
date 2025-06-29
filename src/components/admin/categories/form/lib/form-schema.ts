import { z } from "zod";

const subCategoryItemSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const subCategoryFormSchema = z.object({
  id: z.string(),
  status: z.string(),
  subCategoryName: z.string(),
  subCategoryItems: z.array(subCategoryItemSchema),
});
