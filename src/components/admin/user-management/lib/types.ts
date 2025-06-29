import { PaginationLink } from "@/lib/types";

export type AdminUserListResponseType = {
  success: boolean;
  message: string;
  data: AdminUserListResponse;
};

export type AdminUserListResponse = {
  data: AdminUserListDataType[];
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

export type AdminUserListDataType = {
  id: string;
  name: string;
  email: string;
  role: string;
  note: string;
};

export type UserManagementDetailsResponseType = {
  success: boolean;
  message: string;
  data: UserManagementDetailsType;
};

export type UserManagementDetailsType = {
  id: string;
  name: string;
  email: string;
  role: string;
  role_translated: string;
  note: string;
  avatar: Media;
};

export type Media = {
  id: number;
  url: string;
};
