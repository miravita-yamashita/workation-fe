import { z } from "zod";

export const GenericCheckboxShapeSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.boolean().default(false),
});

export const PrefectureShapeSchema = z.object({
  id: z.number(),
  prefecture: z.string(),
  region: z.string(),
  value: z.boolean().default(false),
});

export const PrefectureByRegionShapeSchema = z.object({
  region: z.string(),
  values: z.array(PrefectureShapeSchema),
});


export const searchFilterFormSchema = z.object({
  searchTerm: z.string(),
  newInformation: z.array(GenericCheckboxShapeSchema),
  specificSearchCriteria: z.array(GenericCheckboxShapeSchema),
  monthlySalaryMin: z.string(),
  monthlySalaryMax: z.string(),
  prefectures: z.array(PrefectureByRegionShapeSchema),
  occupation: z.array(GenericCheckboxShapeSchema),
  contract: z.array(GenericCheckboxShapeSchema),
  assignment: z.array(GenericCheckboxShapeSchema),
  workForm: z.array(GenericCheckboxShapeSchema),
  medicalSpecialty: z.array(GenericCheckboxShapeSchema),
  facilityForm: z.array(GenericCheckboxShapeSchema),
});
