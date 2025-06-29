import { JP_ERROR_MESSAGE } from "@/components/feature/form";
import { z } from "zod";

const commonInfoSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE.COMPANY_PROFILE_TITLE_ALT_REQUIRED }),
  body: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE.COMPANY_PROFILE_BODY_ALT_REQUIRED }),
});

export const companyFormSchema = z.object({
  headline: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE.COMPANY_PROFILE_TITLE_REQUIRED }),
  body: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE.COMPANY_PROFILE_BODY_REQUIRED }),
  eyeCatchingImage: z.string(),
  philosophy: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE.COMPANY_PROFILE_BODY_REQUIRED }),
  guidelines: z.array(commonInfoSchema),
  companyOverview: z.array(commonInfoSchema),
});
