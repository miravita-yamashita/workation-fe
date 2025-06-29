import { z } from "zod";
import { JP_ERROR_MESSAGE } from "@components/feature/form/lib/error-messages-map";

export const FaqFormSchema = z.object({
  category: z
    .string({ message: JP_ERROR_MESSAGE.JOB_SELECTBOX_REQUIRED })
    .min(1, { message: JP_ERROR_MESSAGE.JOB_SELECTBOX_REQUIRED }),
  question: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE.FAQ_QUESTION_REQUIRED }),
  answer: z.string().min(1, { message: JP_ERROR_MESSAGE.FAQ_ANSWER_REQUIRED }),
});
