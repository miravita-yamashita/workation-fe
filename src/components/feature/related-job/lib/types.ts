import { Facility } from "@/components/top/lib";
import { CategoryKeyValue } from "../../top";

export type RelatedJobResponseType = {
  success: boolean;
  message: string;
  data: RelatedJobDataType[];
};

export type RelatedJobDataType = {
  id: string;
  facility_id: string;
  job_title: string;
  description: string;
  name: string | null;
  area: {
    prefectures: string;
    label: string;
  };
  facility: Facility;
  specific_condition_categories: CategoryKeyValue[];
  salary_min: string;
  salary_max: string;
  contract_categories: CategoryKeyValue;
  position_images: string[];
};
