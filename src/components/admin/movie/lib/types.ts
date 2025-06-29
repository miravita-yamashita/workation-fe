import { MovieMedia } from "@/components/movie";
import { PaginationLink } from "@/lib/types";

export type AdminMovieListResponseType = {
  success: boolean;
  message: string;
  data: AdminMovieListResponse;
};

export type AdminMovieListResponse = {
  data: AdminMovieListDataType[];
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

export type AdminMovieListDataType = {
  id: string;
  name: string;
  description: string;
  link: string;
  movie_category: AdminMovieCategory;
  media: MovieMedia[];
  sub_category_item_id: string;
  created_at: string;
  updated_at: string;
};

export type AdminMovieCategory = {
  id: string;
  name: string;
  updated_at: string;
};

export type UpdateAdminMovieResponseType = {
  success: boolean;
  message: string;
  data: AdminMovieListDataType;
};
