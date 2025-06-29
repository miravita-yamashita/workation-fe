import { z } from "zod";
import { JP_ERROR_MESSAGE } from "@components/feature/form/lib/error-messages-map";

export const testimonialFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE.TESTIMONIAL_NAME_REQUIRED }),
  rating: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE.TESTIMONIAL_RATING_REQUIRED }),
  title: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE.TESTIMONIAL_TITLE_REQUIRED }),
  content: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE.TESTIMONIAL_CONTENT_REQUIRED }),

  thumbnail: z
    .array(
      z.object({
        id: z.string(),
        url: z.string().nullable().optional(),
      }),
    )
    .optional(),
  status: z.string().min(1, { message: JP_ERROR_MESSAGE.GENERIC_LEAST_ONE }),
});
