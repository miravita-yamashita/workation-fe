import { PaginationLink } from "@/lib/types";
import { CategoryKeyValue } from "@/components/feature/top";

export type AdminFacilityListResponseType = {
  success: boolean;
  message: string;
  data: AdminFacilityListResponse;
};

export type AdminFacilityListResponse = {
  data: AdminFacilityDataType[];
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

export type AdminFacilityDataType = {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  perfecture: string;
  address_city: string;
  post_code: string;
  access: string;
  map: string;
  no_employees: number;
  no_openings: number;
  record_method: string;
  no_beds: number;
  nursing_standard: string;
  parking_lot: string;
};

export type MedicalCategoriesResponseType = {
  success: boolean;
  message: string;
  data: MedicalCategory;
};

export type MedicalCategory = {
  medical_specialty: MedicalSpecialty[];
};

export type MedicalSpecialty = {
  id: string;
  name: string;
};

export type CreateFaciliyResponseType = {
  success: boolean;
  message: string;
  data: CreatedFacilityType;
  errors?: Record<string, string[]>;
};

export type CreatedFacilityType = {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  prefecture: Prefecture;
  address_city: string;
  address_street: string;
  access: string;
  map: string;
  no_employees: string;
  record_method: string;
  no_beds: string;
  nursing_standard: string;
  parking_lot: string;
  created_at: Date;
  updated_at: Date;
};

export type FacilityDetailsResponseType = {
  success: boolean;
  message: string;
  data: FacilityDetailsType;
};

export type FacilityDetailsType = {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  prefecture: Prefecture;
  address_city: string;
  address_street: string;
  access: string;
  map: string;
  no_employees: number;
  record_method: string;
  no_beds: number;
  nursing_standard: string;
  parking_lot: string;
  created_at: Date;
  updated_at: Date;
  medical_subject_categories: MedicalSubjectCategory[];
  positions: AdminJobListDataType[];
};

export type MedicalSubjectCategory = {
  id: string;
  name: string;
};

export type Prefecture = {
  value: number;
  label: string;
};

export type AdminFacilityNameListResponseType = {
  success: boolean;
  message: string;
  data: AdminFacilityNameListDataType[];
};

export type AdminFacilityNameListDataType = {
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

export type SelectType = {
  id: string;
  name: string;
};
