type ContractFormType = {
  id: number;
  name: string;
};

type AreaType = {
  prefectures: number;
  label: string;
};

type FacilityType = {
  id: string;
  name: string;
  page_title: string;
  page_description: string;
  updated_at: string;
};

type OccupationalCategoryType = {
  id: string;
  name: string;
  updated_at: string;
};

type SpecificConditionCategoryType = {
  id: string;
  name: string;
};

type MedicalSubjectCategoriesType = {
  id: string;
  name: string;
};

type CommonFieldType = {
  id: string;
  name: string;
};

export type JobDetailType = {
  id: string;
  facility_id: string;
  name: string;
  contract_form: ContractFormType;
  contract_categories: {
    id: string;
    name: string;
  };
  assignment_categories: CommonFieldType[];
  recruitment_categories: CommonFieldType[];
  area: AreaType;
  address: string;
  address_city: string;
  address_street: string;
  salary: string;
  salary_min: string;
  salary_max: string;
  bonus: string | null;
  working_hours: string;
  work_time_notes: string;
  holiday: string;
  keep_flag: boolean;
  page_title: string;
  page_description: string;
  access: string;
  recommended_position: string;
  recommended_salary: string;
  updated_at: string;
  facility: FacilityType;
  occupational_categories: OccupationalCategoryType[];
  specific_condition_categories: SpecificConditionCategoryType[];
  position_images: string[];
  medical_subject_categories: MedicalSubjectCategoriesType[];
};

export type JobSearchResponseType = {
  data: {
    current_page: number;
    data: JobDetailType[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
  };
  count: number;
};
