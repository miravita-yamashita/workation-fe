import { z } from "zod";
import { JP_ERROR_MESSAGE } from "@components/feature/form/lib/error-messages-map";

export const replyFormSchema = z.object({
  emailTemplate: z.string().optional(),
  reply: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE.INQUIRY_REPLY_REQUIRED }),
});
