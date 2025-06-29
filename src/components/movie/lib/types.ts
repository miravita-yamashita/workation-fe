import { PaginationLink } from "@/lib/types";

export enum MovieFilterParamKey {
  Categories = "filter[categories]",
}

export type MovieMedia = {
  id: number;
  url: string;
};

export type UnpaginatedMovieResponseType = {
  success: boolean;
  message: string;
  data: MovieListResponse;
};

export type MovieDataType = {
  id: string;
  name: string;
  description: string;
  link: string;
  movie_category: {
    id: string;
    name: string;
    updated_at: string;
  };
  media: MovieMedia[];
  created_at_details: string;
  updated_at_details: string;
};

export type MovieListResponseType = {
  success: boolean;
  message: string;
  data: MovieListResponse;
};

export type MovieListResponse = {
  data: MovieDataType[];
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

export type MovieCategoryNameListResponseType = {
  success: boolean;
  message: string;
  data: MovieCategoryNameList[];
};

export type MovieCategoryNameList = {
  id: string;
  name: string;
  updated_at: string;
};

export type MovieDetailResponseType = {
  success: boolean;
  message: string;
  data: MovieDataType;
};

export type MovieExplanatoryMovieResponseType = {
  success: boolean;
  message: string;
  data: MovieDataType;
};
