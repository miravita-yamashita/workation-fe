import {
  JP_ERROR_MESSAGE,
  JP_ERROR_MESSAGE_ALT,
} from "@/components/feature/form";
import { z } from "zod";

export const formAdminMovieSchema = z.object({
  title: z.string().min(1, {
    message: JP_ERROR_MESSAGE_ALT.VIDEOS_TITLE_REQUIRED,
  }),
  description: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE_ALT.VIDEOS_DESCRIPTION_REQUIRED })
    .max(65, {
      message: JP_ERROR_MESSAGE_ALT.VIDEOS_MAX_LENGTH,
    }),
  videoUrl: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE_ALT.VIDEOS_LINK_REQUIRED }),
  mediaId: z
    .number()
    .min(1, { message: JP_ERROR_MESSAGE.GENERIC_REQUIRED_ALT }),
  mediaImgSrc: z.string(),
  category: z.string(),
});
