import { AdminFacilityDataType } from "@/components/admin/facilities";
import { Area } from "@/lib/types";

export type Positions = {
  id: string;
  facility_id: string;
  job_number: string;
  description: string;
  name: string;
  area: Area;
  address: string | null;
  salary_min: string;
  salary_max: string;
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
  facility: AdminFacilityDataType;
};

export type TransformedPayload = {
  rec_positions: string[];
  articles: { title: string; body: string }[];
  steps: {
    id: string | null;
    title: string;
    header_title: string;
    plain_content: string;
  }[];
  banners: {
    bannerUrl: string;
    bannerMediaId: string;
  }[];
};
