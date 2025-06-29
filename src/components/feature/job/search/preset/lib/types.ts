import {
  JobFilterType,
  JobSearchParamKey,
} from "@components/feature/job/search/filter";

// #region Database Keys
export enum JobFilterDatabaseKey {
  SpecificSearchCriteria = "specific",
  Occupation = "occupation",
  Contract = "contract",
  Assignment = "assignment",
  WorkForm = "work_form",
  MedicalSpecialty = "medical_specialty",
  FacilityForm = "facility_form",
}

// #region Payload Shape
export type JobSearchFilterPayloadShapeType = {
  [key in JobSearchParamKey]?: JobFilterType[] | string;
};
// #endregion

// #region Saving Filter
export type JobSearchFilterSaveResponseType = {
  success: boolean;
  message: string;
};

// #region Get Saved filters
export type SavedFilterType = {
  id: string;
  user_id: string;
  saved_filters: string; 
};

export type JobSearchFilterGetResponseType = {
  success: boolean;
  message: string;
  data: {
    id: string;
    user_id: string;
    saved_filters: JobSearchFilterPayloadShapeType;
  }[]
};

// #region Delete Saved Filter
export type JobSearchFilterDeleteResponseType = {
  success: boolean;
  message: string;
};