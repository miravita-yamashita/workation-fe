import { PaginationLink } from "@/lib/types";

export enum InquirySearchParamKey {
  Unreplied = "type=unreplied",
  CurrentMonth = "type=currentMonth",
  Archive = "type=archive",
}

export type AdminInquiriesListResponseType = {
  success: boolean;
  message: string;
  data: AdminInquiriesListResponse;
  unreplied: number;
  currentMonth: number;
  archive: number;
};

export type AdminInquiriesListResponse = {
  data: AdminInquiriesListDataType[];
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

export type AdminInquiriesListDataType = {
  id: string;
  status: string;
  name: string;
  email: string;
  date_of_receipt: number;
  type_of_inquiry: string[];
  form_type: string;
  is_replied: boolean;
  given_name: string;
  lastname: string;
  created_at: string;
};

export type InquiryType = {
  id: string;
  company_name: string;
  lastname: string;
  given_name: string;
  sei: string;
  may: string;
  in_charge_fname: string;
  in_charge_lname: string;
  address: string;
  postal_code: string;
  facility: string;
  furigana: null;
  tel_number: string;
  email: string;
  type_of_inquiry: string;
  details: string;
  form_type: string;
  reply: null;
  is_replied: boolean;
  created_at: string;
  date_submitted: string;
  date_replied: null;
};

export type InquiriesTypecolumn = {
  name: string;
  label: string;
  value: string;
};

export type InquiryDetailsAdminResponseType = {
  success: boolean;
  message: string;
  data: InquiryDetailsType;
};

export type InquiryDetailsType = {
  inquiry: Inquiry;
  email_templates: EmailTemplate[];
};

export type EmailTemplate = {
  id: string;
  name: string;
  content: string;
  created_at: null;
  updated_at: null;
};

export type Inquiry = {
  id: string;
  お問い合せ状況: string;
  form: InquiryFormType[];
  mail_template: null;
  is_replied: boolean;
  created_at: string;
  reply: string;
  date_submitted: string;
  date_replied: string;
};

export type InquiryFormType = {
  name: string;
  label: string;
  value: string;
};
