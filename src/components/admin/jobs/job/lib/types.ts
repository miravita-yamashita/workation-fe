export type JobCategoriesResponseType = {
  success: boolean;
  message: string;
  data: JobCatData;
};

export type JobCatData = {
  specific: JobCatType[];
  contract: JobCatType[];
  assignment: JobCatType[];
  medical_specialty: JobCatType[];
  work_form: JobCatType[];
  facility_form: JobCatType[];
};

export type JobCatType = {
  id: string;
  name: string;
};

export type JobFacilitiesResponseType = {
  success: boolean;
  message: string;
  data: JobFacilitiesType[];
};

export type JobFacilitiesType = {
  id: string;
  name: string;
};

export type JobSelectOptionsType = {
  id: string;
  value: string;
  label: string;
};

export type JobFAQResponseType = {
  success: boolean;
  message: string;
  data: JobFAQType;
};

export type JobFAQType = {
  医療機関向け: For[];
  看護師向け: For[];
  一般向け: For[];
};

export type For = {
  id: string;
  question: string;
  answer: string;
};

export type JobRecommendedResponseType = {
  success: boolean;
  message: string;
  data: JobRecommendedType[];
};

export type JobRecommendedType = {
  id: string;
  name: string;
};

//////////////////////////////////////////----------------------

export type JobDetailsResponseType = {
  success: boolean;
  message: string;
  data: JobDetailsPageType;
};

export type JobDetailsPageType = {
  id: string;
  facility_id: string;
  job_number: string;
  description: string;
  name: string;
  area: Area;
  address: null;
  salary_min: string;
  salary_max: string;
  bonus: null | string;
  address_city: string;
  address_street: string;
  work_start_time: string;
  work_end_time: string;
  work_time_notes: string;
  working_hours: string;
  holiday: string;
  keep_flag: boolean;
  access: null | string;
  recommendation_point_1: string;
  recommendation_point_2: string;
  created_at: Date;
  created_at_formatted: string;
  updated_at: Date;
  updated_at_formatted: string;
  facility: Facility;
  occupational_categories: OccupationalCategory[];
  specific_condition_categories: ContractCategories[];
  medical_subject_categories: ContractCategories[];
  contract_categories: ContractCategories;
  recruitment_categories: ContractCategories[];
  assignment_categories: ContractCategories[];
  work_form_categories: ContractCategories[];
  facility_form_categories: ContractCategories[];
  position_images: string[];
  media: Media;
  faq_medical_institutions: FAQ[];
  faq_nurses: FAQ[];
  faq_general: FAQ[];
  recommended_jobs: JobDetailsPageType[];
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
  deleted_at: null;
  created_at: Date;
  updated_at: Date;
  pivot: Pivot;
};

export type Area = {
  prefectures: number;
  label: string;
};

export type ContractCategories = {
  id: string;
  name: string;
};

export type Facility = {
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
};

export type Prefecture = {
  value: number;
  label: string;
};

export type FAQNurse = {
  id: string;
  question: string;
  answer: string;
  category: string;
  deleted_at: null;
  created_at: Date;
  updated_at: Date;
  pivot: Pivot;
};

export type Pivot = {
  position_id: string;
  question_id: string;
};

export type Media = {
  banner: Banner[];
  featured: Featured[];
};

export type Featured = {
  id: number;
  url: string;
  custom_attr: null;
};

export type Banner = {
  id: number;
  url: string;
  custom_attr: CustomAttr;
};
export type CustomAttr = {
  link: string;
};

export type OccupationalCategory = {
  id: string;
  name: string;
  updated_at: UpdatedAt;
};

export enum UpdatedAt {
  The202502131808 = "2025/02/13 18:08",
}

export type AdminAreaNameListResponseType = {
  success: boolean;
  message: string;
  data: JobCatType[];
};

export type JobTypecolumn = {
  id: string;
  label: string;
  value: string;
};
