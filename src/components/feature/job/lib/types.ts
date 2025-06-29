import { MediaType } from "@/components/about";
import { PositionType } from "@/components/static-page";

export type Identifiable = {
  id: string;
  name: string;
};

export type JobDetailsResponseType = {
  success: true;
  message: "string";
  data: JobDetailsDataType;
};

export type JobDetailsDataType = {
  id: string;
  job_number: string;
  facility_id: string;
  name: string;
  contract_form: {
    id: number;
    label: string;
  };
  area: {
    perfectures: number;
    label: string;
  };
  address: string;
  address_city: string;
  address_street: string;
  salary: string;
  salary_min: string;
  salary_max: string;
  bonus: string | null;
  working_hours: string;
  holiday: string;
  keep_flag: boolean;
  page_title: string;
  page_description: string;
  access: string;
  description: string;
  recommendation_point_1: string;
  recommendation_point_2: string;
  recommended_position: string;
  recommended_salary: string;
  recommended_jobs: PositionType[];
  facility: {
    id: string;
    name: string;
    email: string;
    phone_number: string;
    prefecture: {
      id: number;
      label: string;
    };
    address_street: string;
    address_city: string;
    post_code: string;
    access: string;
    map: string;
    no_employees: number;
    record_method: string;
    no_beds: number;
    nursing_standard: string;
    parking_lot: string;
    created_at: string;
    updated_at: string;
  };
  position_images: string[];
  work_form_categories: Identifiable[];
  recruitment_categories: Identifiable[];
  medical_subject_categories: Identifiable[];
  assignment_categories: Identifiable[];
  specific_condition_categories: Identifiable[];
  media: MediaType;
};
