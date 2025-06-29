import { z } from "zod";
import { JP_ERROR_MESSAGE } from "@components/feature/form/lib/error-messages-map";
import { attachOptionalPhoneValidation } from "@/components/feature/form";

export const FacilityFormSchema = z.object({
  name: z.string().min(1, { message: JP_ERROR_MESSAGE.FACILITY_NAME_INVALID }),
  email: z
    .string()
    .min(1, JP_ERROR_MESSAGE.GENERIC_REQUIRED)
    .email(JP_ERROR_MESSAGE.EMAIL_INVALID_FORMAT)
    .or(z.literal("")),
  phoneNumber: attachOptionalPhoneValidation(),
  prefecture: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE.FACILITY_PREFECTURE_REQUIRED }),
  addressCity: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE.FACILITY_CITY_REQUIRED }),
  addressStreet: z.string().optional(),
  access: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE.FACILITY_ACCESS_REQUIRED }),
  map: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE.FACILITY_MAP_REQUIRED })
    .regex(/^https:\/\/www\.google\.com\/maps\/embed\?.+/, {
      message: JP_ERROR_MESSAGE.FACILITY_MAP_INVALID,
    }),
  medicalSubjectCategories: z
    .array(z.string(), { message: JP_ERROR_MESSAGE.FACILITY_MEDICAL_REQUIRED })
    .min(1, { message: JP_ERROR_MESSAGE.FACILITY_MEDICAL_REQUIRED }),
  noEmployees: z
    .string({ message: JP_ERROR_MESSAGE.FACILITY_NO_EMPLOYEE_REQUIRED })
    .min(1, { message: JP_ERROR_MESSAGE.FACILITY_NO_EMPLOYEE_REQUIRED }),
  recordMethod: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE.FACILITY_RECORDING_METHOD }),
  noBeds: z
    .string({ message: JP_ERROR_MESSAGE.FACILITY_NO_BEDS_REQUIRED })
    .min(1, { message: JP_ERROR_MESSAGE.FACILITY_NO_BEDS_REQUIRED }),
  nursingStandard: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE.FACILITY_NURSING_REQUIRED }),
  parkingLot: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE.FACILITY_PARKING_REQUIRED }),
});
