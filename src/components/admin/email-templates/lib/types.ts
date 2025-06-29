import { PaginationLink } from "@/lib/types";

export type AdminEmailTemplatesListResponseType = {
  success: boolean;
  message: string;
  data: AdminEmailTemplatesListResponse;
};

export type AdminEmailTemplatesListResponse = {
  data: AdminEmailtemplatesListDataType[];
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

export type AdminEmailtemplatesListDataType = {
  id: string;
  template_name: string;
  body: string;
  name: string;
  jobs: string;
  content: string;
};

export type EmailTemplateDetailsAdminResponseType = {
  success: boolean;
  message: string;
  data: EmailTemplateDetailsType;
};

export type EmailTemplateDetailsType = {
  id: string;
  name: string;
  content: string;
  created_at: null;
  updated_at: null;
};
