import { JP_ERROR_MESSAGE } from "@/components/feature/form";
import { z } from "zod";

export const updateMediaFormSchema = z.object({
  url: z.string(),
  title: z.string().min(1, JP_ERROR_MESSAGE.GENERIC_REQUIRED),
  caption: z.string(),
  altText: z.string().min(1, JP_ERROR_MESSAGE.GENERIC_REQUIRED),
});
