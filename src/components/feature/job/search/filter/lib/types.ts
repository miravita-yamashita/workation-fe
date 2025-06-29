// #region Filter Keys
export enum JobSearchParamKey {
  Name = "filter[name]",
  NewInformation = "filter[latest]",
  SpecificSearchCriteria = "filter[specific]",
  MonthlySalary = "filter[salary_range]",
  Prefecture = "filter[prefectures]",
  Occupation = "filter[occupation]",
  Contract = "filter[contract]",
  Assignment = "filter[assignment]",
  WorkForm = "filter[work_form]",
  MedicalSpecialty = "filter[medical_subject]",
  FacilityForm = "filter[facility_form]",
  Sort = "sort",
  SortSalary = "filter[sort_salary]",
  PageSize = "pageSize",
}

//#region Job Search Filters
export type JobFilterType = {
  id: string;
  name: string;
};

export type JobFiltersResponseType = {
  success: boolean;
  message: string;
  data: {
    static: JobFilterType[];
    specific: JobFilterType[];
    video: JobFilterType[];
    contract: JobFilterType[];
    assignment: JobFilterType[];
    medical_specialty: JobFilterType[];
    work_form: JobFilterType[];
    occupation: JobFilterType[];
    commitment: JobFilterType[];
    facility_form: JobFilterType[];
    tag: JobFilterType[];
  };
};

// #region Prefectures
export type PrefectureResponseType = {
  success: boolean;
  message: string;
  data: PrefectureDataType[];
};

export type PrefectureDataType = {
  region: string;
  prefecture: string;
  id: number;
};
