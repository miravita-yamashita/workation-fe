import { PaginationLink } from "@/lib/types";

type ItemType = {
  id: string;
  name: string;
};

export type SubCategoryType = {
  id: string;
  name: string;
  number: string;
  status: string;
  updated_at: string;
  created_at: string;
  items: ItemType[];
};

export type CategoryType = {
  id: string;
  name: string;
  sub_category: SubCategoryType[];
};

export type AdminCategoryResponseType = {
  success: boolean;
  message: string;
  data: CategoryType[];
};

export type AdminSubCategoryListResponseType = {
  success: boolean;
  message: string;
  data: SubCategoryListResponse;
};

export type SubCategoryListResponse = {
  data: SubCategoryType[];
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

// # region Search Param Key
export enum CategorySearchParamKey {
  Name = "name",
}
