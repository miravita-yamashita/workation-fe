import { PaginationLink } from "@/lib/types";

export type AdminFaqListResponseType = {
  success: boolean;
  message: string;
  data: AdminFaqListResponse;
};

export type AdminFaqListResponse = {
  data: AdminFaqListDataType[];
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

export type AdminFaqListDataType = {
  id: string;
  question: string;
  answer: string;
  categories: string[];
  created_at: number;
  category: string | string[] | null;
  created_at_list: string;
  updated_at_list: string;
};

export type FAQDetailsAdminResponseType = {
  success: boolean;
  message: string;
  data: FAQDetailsPageType;
};

export type FAQDetailsPageType = {
  id: string;
  question: string;
  answer: string;
  category: string;
  created_at: string;
  create_at_details: string;
  updated_at: string;
};

export type FAQCategoriesAdminResponseType = {
  success: boolean;
  message: string;
  data: FaqCategory[];
};

export type FaqCategory = {
  id: number;
  name: string;
};
