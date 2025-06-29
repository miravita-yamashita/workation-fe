import { JP_ERROR_MESSAGE } from "@/components/feature/form";
import { z } from "zod";

const PostsDropdownSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.boolean().default(false),
});

export const formAdminStaticAboutSchema = z.object({
  // Populating dropdown elements for the posts
  postDropdown: z.array(PostsDropdownSchema),
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
});
