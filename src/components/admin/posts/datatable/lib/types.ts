import { PaginationLink } from "@/lib/types";
import { PostDetailDataType } from "../../detail";

export type AdminPostsListResponseType = {
  success: boolean;
  message: string;
  data: AdminPostsListResponse;
  recommended_count: number;
};

export type AdminPostsListResponse = {
  data: PostDetailDataType[];
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  path: string;
  next_page_url: string | null;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number | string;
  links: PaginationLink[];
};

export type ToggleRecommendedArticleResponse = {
  success: boolean;
  message: string;
};
