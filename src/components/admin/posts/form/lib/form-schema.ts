import { z } from "zod";
import { JP_ERROR_MESSAGE } from "@components/feature/form/lib/error-messages-map";
import { checkSlugAvailability } from "./actions";

const BannerSchema = z.object({
  mediaId: z
    .number()
    .min(1, { message: JP_ERROR_MESSAGE.GENERIC_REQUIRED_ALT }),
  mediaURL: z.string(),
  url: z.string().min(1, { message: JP_ERROR_MESSAGE.GENERIC_REQUIRED_ALT }),
  pivotId: z.string(),
});

const GenericListSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.boolean().default(false),
});

const FAQCustomSchema = z
  .object({
    question: z.string(),
    answer: z.string(),
  })
  .refine(
    (value) => {
      if (value.question.length > 0 && value.answer.length === 0) {
        return false;
      }
      return true;
    },
    {
      message: JP_ERROR_MESSAGE.GENERIC_REQUIRED_ALT,
      path: ["answer"],
    },
  );

export const formPostFormSchema = z
  .object({
    id: z.string().optional(),
    title: z.string().min(1, { message: JP_ERROR_MESSAGE.POST_TITLE_REQUIRED }),
    richtext: z
      .string()
      .min(1, { message: JP_ERROR_MESSAGE.POST_CONTENT_REQUIRED }),
    metaTitle: z
      .string()
      .min(1, { message: JP_ERROR_MESSAGE.META_TITLE_REQUIRED }),
    metaDescription: z
      .string()
      .min(1, { message: JP_ERROR_MESSAGE.META_DESCRIPTION_REQUIRED }),
    permaLink: z.string().min(1, { message: JP_ERROR_MESSAGE.SLUG_REQUIRED }),
    shortTitle: z
      .string()
      .min(1, { message: JP_ERROR_MESSAGE.SHORT_TITLE_REQUIRED }),
    longTile: z
      .string()
      .min(1, { message: JP_ERROR_MESSAGE.LONG_TITLE_REQUIRED }),
    relatedArticleFirst: z.string(),
    relatedArticleSecond: z.string(),
    relatedArticleThird: z.string(),
    faqFirst: z.string(),
    faqFirstCustom: FAQCustomSchema,
    faqSecond: z.string(),
    faqSecondCustom: FAQCustomSchema,
    faqThird: z.string(),
    faqThirdCustom: FAQCustomSchema,
    categories: z.array(GenericListSchema),
    thumbnail: z.number(),
    tags: z.array(GenericListSchema),
    banners: z.array(BannerSchema),
  })
  .refine(
    async (data) => {
      const response = await checkSlugAvailability({
        slug: data.permaLink,
        id: data.id || "",
      });
      return response?.success;
    },
    {
      message: JP_ERROR_MESSAGE.SLUG_UNIQUE,
      path: ["permaLink"],
    },
  );
