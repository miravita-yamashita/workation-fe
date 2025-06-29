export type RecommendedJobsResponseType = {
  success: boolean;
  message: string;
  data: RecommendedJob[];
};

export type RecommendedJob = {
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
  access: string;
  recommendation_point_1: string;
  recommendation_point_2: string;
  updated_at: Date;
  facility: Facility;
  occupational_categories: OccupationalCategory[];
  specific_condition_categories: ContractCategories[];
  medical_subject_categories: ContractCategories[];
  contract_categories: ContractCategories;
  recruitment_categories: ContractCategories[];
  assignment_categories: ContractCategories[];
  work_form_categories: ContractCategories[];
  facility_form_categories: ContractCategories[];
  created_at: Date;
  created_at_formatted: string;
  updated_at_formatted: string;
  position_images: string[];
  media: Media;
  faq_medical_institutions: FAQ[];
  faq_nurses: FAQ[];
  faq_general: FAQ[];
  recommended_jobs: RecommendedJob[];
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

export type Pivot = {
  position_id: string;
  question_id: string;
};

export type Media = {
  banner: Banner[];
  featured: Banner[];
};

export type Banner = {
  id: number;
  url: string;
  custom_attr: CustomAttr | null;
};

export type CustomAttr = {
  link: string;
};

export type OccupationalCategory = {
  id: string;
  name: string;
  updated_at: string;
};

export type ContractForm = {
  id: number;
  label: string;
};

export type MedicalSubject = {
  id: string;
  name: string;
};

export type RecommendedPoint = {
  id: string;
  position_id: string;
  title: string;
  text: string;
  logo: string;
};

export type AreaResponseType = {
  data: AreaType[];
  latest_updated: string;
};

export type AreaType = {
  id: string;
  areaName: string;
  jobs: Job[];
};

export type Job = {
  id: string;
  title: string;
  salary: string;
  area: string;
  contract_form: ContractFormType;
  media: string;
};

export type ContractFormType = {
  id: number;
  label: string;
};

export type AssignmentCategory = {
  id: string;
  name: string;
};
