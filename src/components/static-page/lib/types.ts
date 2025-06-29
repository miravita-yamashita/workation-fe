type MediaType = {
  id: number;
  media: string;
};

type BaseItemType = {
  id: string;
  title: string;
};

type BannerType = {
  id: number;
  url: string;
  pivot_id: number;
  custom_attr: {
    link: string;
  } | null;
};

export type MediaMainType = {
  banner: BannerType[];
  featured: BannerType[];
};

type GreetingType = BaseItemType & {
  plain_content: string;
  philosophy: string;
  media: MediaType[];
};

type GuideType = BaseItemType & {
  plain_content: string;
};

type ProfileType = BaseItemType & {
  plain_content: string;
};

// NOTE: update any unknown if necessary
export type PositionType = {
  id: string;
  facility_id: string;
  job_number: string;
  description: string;
  name: string;
  area: {
    prefectures: number;
    label: string;
  };
  address: string | null;
  salary_min: string;
  salary_max: string;
  recommended_salary: string;
  bonus: string | null;
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
  updated_at: string;
  facility: {
    id: string;
    name: string;
    email: string;
    phone_number: string;
    prefecture: {
      value: number;
      label: string;
    };
    address_city: string;
    address_street: string;
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
  occupational_categories: {
    id: string;
    name: string;
    updated_at: string;
  }[];
  specific_condition_categories: {
    id: string;
    name: string;
  }[];
  medical_subject_categories: {
    id: string;
    name: string;
  }[];
  contract_categories: {
    id: string;
    name: string;
  };
  recruitment_categories: ContractCategories[];
  assignment_categories: {
    id: string;
    name: string;
  }[];
  work_form_categories: {
    id: string;
    name: string;
  }[];
  facility_form_categories: {
    id: string;
    name: string;
  }[];
  created_at: string;
  created_at_formatted: string;
  updated_at_formatted: string;
  position_images: string[];
  media: MediaMainType;
  faq_medical_institutions: unknown[];
  faq_nurses: unknown[];
  faq_general: unknown[];
  recommended_jobs: unknown[];
};

export type PostType = {
  id: string;
  title: string;
  description: string;
  url: string;
  slug: string;
  content: string;
  meta_title: string;
  meta_description: string;
  short_title: string;
  long_title: string;
  number_of_visit: number;
  media: MediaMainType;
  created_at: string;
};

export type StepsType = {
  id: string;
  title: string;
  header_title: string;
  content: string;
};

export type StaticPageDataType = {
  id: string;
  title: string;
  content: string;
  slug: string;
  view: number;
  created_at: string;
  updated_at: string;
  greetings: GreetingType[];
  guide: GuideType[];
  profile: ProfileType[];
  posts: PostType[];
  positions: PositionType[];
  steps: StepsType[];
  media: MediaMainType;
};

// If there are missing types, add them and refer to this /page/:slug or update wrong types
export type GetStaticPageResponseType = {
  success: boolean;
  message: string;
  data: StaticPageDataType;
};

export type ContractCategories = {
  id: string;
  name: string;
};
