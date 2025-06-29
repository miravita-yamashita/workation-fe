import { z } from "zod";

export const adminDatatableFormSchema = z.object({
  freeWordSearch: z.string().optional(),
  facilityName: z.string().optional(),
  facilityLabel: z.string().optional(),
  recommendationName: z.string().optional(),
  recommendationLabel: z.string().optional(),
  areaName: z.string().optional(),
  areaLabel: z.string().optional(),
});
