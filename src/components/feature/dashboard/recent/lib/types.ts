export type RecentFacilityType = {
  id: string;
  name: string;
  page_title: string;
  page_description: string;
  updated_at: string;
};

export type RecentAreaType = {
  prefectures: number;
  label: string;
};

// This types is just partial check on /dashboard for full response structure
type RecentJobType = {
  id: string;
  name: string;
  address: string;
  facility: RecentFacilityType;
  area: RecentAreaType;
};

export type RecentInquiryType = {
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
  furigana: string;
  tel_number: string;
  email: string;
  type_of_inquiry: string[];
  details: string;
  form_type: string;
  reply: string;
  is_replied: boolean;
  created_at: string;
};

export type RecentDataType = {
  applications_count: number;
  job_openings: number;
  recent_jobs: RecentJobType[];
  inquiries: RecentInquiryType[];
};

export type RecentDataResponseType = {
  success: boolean;
  message: string;
  data: RecentDataType;
};
