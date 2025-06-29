import { z } from "zod";
import { JP_ERROR_MESSAGE } from "@components/feature/form/lib/error-messages-map";
import { attachPhoneValidation } from "@components/feature/form";

export const applicationFormSchema = z
  .object({
    lastName: z.string().min(1, JP_ERROR_MESSAGE.GENERIC_REQUIRED),
    firstName: z.string().min(1, JP_ERROR_MESSAGE.GENERIC_REQUIRED),
    sei: z.string().min(1, JP_ERROR_MESSAGE.GENERIC_REQUIRED_KATAKANA),
    may: z.string().min(1, JP_ERROR_MESSAGE.GENERIC_REQUIRED_KATAKANA),
    telephoneNumber: attachPhoneValidation(),
    email: z
      .string()
      .min(1, JP_ERROR_MESSAGE.GENERIC_REQUIRED)
      .email(JP_ERROR_MESSAGE.EMAIL_INVALID_FORMAT),
    inquiryTypeApply: z.boolean(),
    inquiryTypeInquire: z.boolean(),
    inquiryTypeVisit: z.boolean(),
    inquiryTypeOther: z.boolean(),
    inquiryContent: z
      .string()
      .min(1, JP_ERROR_MESSAGE.GENERIC_REQUIRED)
      .refine(
        (value) => !(value.length >= 250),
        JP_ERROR_MESSAGE.INQUIRY_CONTENT_MAX,
      ),
    inquiryTypes: z.array(z.string()),
    consent: z.boolean().refine((value) => value, {
      message: JP_ERROR_MESSAGE.CONSENT_REQUIRED,
    }),
    qualificationsNurse: z.boolean(),
    qualificationsAssistant: z.boolean(),
    qualificationsHealth: z.boolean(),
    qualificationsMidWife: z.boolean(),
    qualifications: z.array(z.string()),
    address: z.string().min(1, JP_ERROR_MESSAGE.GENERIC_REQUIRED),
    postCode: z
      .string()
      .min(1, JP_ERROR_MESSAGE.GENERIC_REQUIRED)
      .refine((value) => value.match(/^\d+$/), {
        message: JP_ERROR_MESSAGE.POST_CODE_NUMBERS_ONLY,
      }),
    year: z
      .string()
      .min(1, JP_ERROR_MESSAGE.GENERIC_REQUIRED)
      .regex(/^\d{4}$/, JP_ERROR_MESSAGE.YEAR_INVALID) // Validate as 4-digit year
      .refine((value) => {
        const year = parseInt(value, 10);
        return !isNaN(year) && year >= 1700 && year <= new Date().getFullYear();
      }, JP_ERROR_MESSAGE.YEAR_INVALID),

    month: z
      .string()
      .min(1, JP_ERROR_MESSAGE.GENERIC_REQUIRED)
      .regex(/^(0?[1-9]|1[0-2])$/, JP_ERROR_MESSAGE.MONTH_INVALID), // Validate as 2-digit month
    day: z
      .string()
      .min(1, JP_ERROR_MESSAGE.GENERIC_REQUIRED)
      .regex(/^(0[1-9]|[12][0-9]|3[01])$/, JP_ERROR_MESSAGE.DAY_INVALID), // Validate as 2-digit day
  })
  .refine(
    (value) =>
      value.qualificationsNurse ||
      value.qualificationsAssistant ||
      value.qualificationsHealth ||
      value.qualificationsMidWife,
    {
      path: ["qualifications"],
      message: JP_ERROR_MESSAGE.GENERIC_REQUIRED,
    },
  )
  .refine(
    (value) =>
      value.inquiryTypeApply ||
      value.inquiryTypeInquire ||
      value.inquiryTypeVisit ||
      value.inquiryTypeOther,
    {
      path: ["inquiryTypes"],
      message: JP_ERROR_MESSAGE.GENERIC_REQUIRED,
    },
  );
year: z.string()
  .min(1, JP_ERROR_MESSAGE.GENERIC_REQUIRED)
  .regex(/^\d{4}$/, JP_ERROR_MESSAGE.YEAR_INVALID) // Validate as 4-digit year
  .refine(
    (value) => {
      // If value is a valid date string in format "YYYY-MM-DD"
      const [year, month, day] = value.split("-");

      if (!year || !month || !day) {
        return false; // Invalid date format
      }

      const date = new Date(
        parseInt(year, 10),
        parseInt(month, 10) - 1,
        parseInt(day, 10),
      );

      // Check if the parsed date matches the provided year, month, and day
      return (
        date.getFullYear() === parseInt(year, 10) &&
        date.getMonth() === parseInt(month, 10) - 1 &&
        date.getDate() === parseInt(day, 10)
      );
    },
    {
      path: ["year", "month", "day"],
      message: JP_ERROR_MESSAGE.DATE_INVALID,
    },
  );
