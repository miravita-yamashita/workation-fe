import { PostType } from "@/components/static-page";

export type GetArticleListResponseType = {
  success: boolean;
  message: string;
  data: PostType[]; // Re-using type from static-page, update this as necessary
};
