import { z } from "zod";
import { JP_ERROR_MESSAGE } from "@components/feature/form/lib/error-messages-map";

export const richTextFormSchema = z.object({
  title: z.string().min(1, { message: JP_ERROR_MESSAGE.GENERIC_REQUIRED_ALT }),
  richtext: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE.GENERIC_REQUIRED_ALT }),
});
