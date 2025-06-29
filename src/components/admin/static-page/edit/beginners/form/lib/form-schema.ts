import { JP_ERROR_MESSAGE_ALT } from "@/components/feature/form";
import { z } from "zod";

const PostsDropdownSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.boolean().default(false),
});

export const formAdminStaticBeginnersSchema = z.object({
  postDropdown: z.array(PostsDropdownSchema),
  recommendedJobNo1: z.string().min(1, {
    message: JP_ERROR_MESSAGE_ALT.RECOMMENDED_JOBS_REQUIRED,
  }),
  recommendedJobNo2: z.string().min(1, {
    message: JP_ERROR_MESSAGE_ALT.RECOMMENDED_JOBS_REQUIRED,
  }),
  recommendedJobNo3: z.string().min(1, {
    message: JP_ERROR_MESSAGE_ALT.RECOMMENDED_JOBS_REQUIRED,
  }),
});
