export type JobSearchResultsResponseType = {
  success: boolean;
  message: string;
  count: number;
  data: JobSearchResultsDataType[];
};

export type JobSearchResultsDataType = {
  id: string;
  facility_id: string;
  name: string;
  perfectures: string;
  address: string;
  salary: string;
  bonus: string;
  working_hours: string;
  holiday: string;
  page_title: string;
  page_description: string;
};

export type CategoryKeyValue = {
  id: string;
  name: string;
};

export type FilterCategoryNameListResponseType = {
  success: boolean;
  message: string;
  data: FilterCategoryNameListDataType;
};

export type FilterCategoryNameListDataType = {
  work_form: CategoryKeyValue[];
  occupation: CategoryKeyValue[];
  specific: CategoryKeyValue[];
  video: CategoryKeyValue[];
};
