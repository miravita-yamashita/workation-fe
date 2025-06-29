import { JP_ERROR_MESSAGE } from "@/components/feature/form";
import { z } from "zod";

const BannerSchema = z.object({
  mediaId: z
    .number()
    .min(1, { message: JP_ERROR_MESSAGE.GENERIC_REQUIRED_ALT }),
  mediaURL: z.string(),
  url: z.string().min(1, { message: JP_ERROR_MESSAGE.GENERIC_REQUIRED_ALT }),
  pivotId: z.number(),
});

export const formAdminStaticTopSchema = z.object({
  // Recommended jobs for the top page
  recommendedJobNo1: z.string().min(1, {
    message: JP_ERROR_MESSAGE.GENERIC_REQUIRED,
  }),
  recommendedJobNo2: z.string().min(1, {
    message: JP_ERROR_MESSAGE.GENERIC_REQUIRED,
  }),
  recommendedJobNo3: z.string().min(1, {
    message: JP_ERROR_MESSAGE.GENERIC_REQUIRED,
  }),

  // Attraction posts
  post1: z.string(),
  post2: z.string(),

  // How to become a freelancer nurse section in the top page.
  freelanceNurseTitle1: z.string().min(1, {
    message: JP_ERROR_MESSAGE.GENERIC_REQUIRED,
  }),
  freelanceNurseBody1: z.string().min(1, {
    message: JP_ERROR_MESSAGE.GENERIC_REQUIRED,
  }),
  freelanceNurseTitle2: z.string().min(1, {
    message: JP_ERROR_MESSAGE.GENERIC_REQUIRED,
  }),
  freelanceNurseBody2: z.string().min(1, {
    message: JP_ERROR_MESSAGE.GENERIC_REQUIRED,
  }),
  freelanceNurseTitle3: z.string().min(1, {
    message: JP_ERROR_MESSAGE.GENERIC_REQUIRED,
  }),
  freelanceNurseBody3: z.string().min(1, {
    message: JP_ERROR_MESSAGE.GENERIC_REQUIRED,
  }),
  banners: z.array(BannerSchema),
});
