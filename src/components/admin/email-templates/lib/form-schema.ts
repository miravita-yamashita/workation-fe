import { z } from "zod";
import { JP_ERROR_MESSAGE } from "@components/feature/form/lib/error-messages-map";

export const emailFormSchema = z.object({
  name: z.string().min(1, { message: JP_ERROR_MESSAGE.EMAIL_NAME_REQUIRED }),
  content: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE.EMAIL_CONTENT_REQUIRED }),
});
