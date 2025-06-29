import { PaginationLink } from "@/lib/types";
import { AdminFacilityDataType } from "../../facilities";
import { CategoryKeyValue } from "@/components/feature/top";

export type AdminJobListResponseType = {
  success: boolean;
  message: string;
  data: AdminJobListResponse;
};

export type AdminJobListResponse = {
  data: AdminJobListDataType[];
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

export type SelectType = {
  id: string;
  name: string;
};

export type AdminJobListDataType = {
  id: string;
  facility_id: string;
  name: string;
  job_number: string;
  contract_categories: SelectType;
  prefectures: number;
  address: string;
  salary_min: string;
  salary_max: string;
  bonus: string;
  working_hours: string;
  holiday: string;
  keep_flag: number;
  page_title: string;
  page_description: string;
  access: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  logo: string;
  facility: AdminFacilityDataType;
  area: {
    prefecture: number;
    label: string;
  };
  specific_condition_categories: CategoryKeyValue[];
};
