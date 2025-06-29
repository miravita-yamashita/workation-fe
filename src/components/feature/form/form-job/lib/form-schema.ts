import { z } from "zod";
import {
  JP_ERROR_MESSAGE,
  JP_ERROR_MESSAGE_ALT,
} from "@components/feature/form/lib/error-messages-map";
import { attachPhoneValidation } from "../../lib";

export const jobApplicationFormSchema = z
  .object({
    id: z.string(),
    jobNumber: z.string(),
    lastName: z.string().min(1, JP_ERROR_MESSAGE.GENERIC_REQUIRED),
    firstName: z.string().min(1, JP_ERROR_MESSAGE.GENERIC_REQUIRED),
    sei: z.string().min(1, JP_ERROR_MESSAGE.GENERIC_REQUIRED_KATAKANA),
    may: z.string().min(1, JP_ERROR_MESSAGE.GENERIC_REQUIRED_KATAKANA),
    dobDay: z
      .string()
      .min(1, JP_ERROR_MESSAGE.GENERIC_REQUIRED)
      .refine(
        (value) => value.match(/^\d+$/) !== null,
        JP_ERROR_MESSAGE_ALT.GENERIC_NUMERIC_ONLY,
      ),
    dobMonth: z
      .string()
      .min(1, JP_ERROR_MESSAGE.GENERIC_REQUIRED)
      .refine(
        (value) => value.match(/^\d+$/) !== null,
        JP_ERROR_MESSAGE_ALT.GENERIC_NUMERIC_ONLY,
      ),
    dobYear: z
      .string()
      .min(1, JP_ERROR_MESSAGE.GENERIC_REQUIRED)
      .refine(
        (value) => value.match(/^\d+$/) !== null,
        JP_ERROR_MESSAGE_ALT.GENERIC_NUMERIC_ONLY,
      ),
    postCode: z
      .string()
      .min(1, JP_ERROR_MESSAGE.GENERIC_REQUIRED)
      .refine((value) => value.match(/^\d+$/), {
        message: JP_ERROR_MESSAGE.POST_CODE_NUMBERS_ONLY,
      }),
    address: z.string().min(1, JP_ERROR_MESSAGE.GENERIC_REQUIRED),
    telephoneNumber: attachPhoneValidation(),
    email: z
      .string()
      .min(1, JP_ERROR_MESSAGE.GENERIC_REQUIRED)
      .email(JP_ERROR_MESSAGE.EMAIL_INVALID_FORMAT),
    inquiryDetailsJobApplication: z.boolean(),
    inquiryDetailsTourFacility: z.boolean(),
    inquiryDetailsJob: z.boolean(),
    inquiryDetailsOthers: z.boolean(),
    nurse: z.boolean(),
    publicHealthNurse: z.boolean(),
    associateNurse: z.boolean(),
    midwife: z.boolean(),
    inquiryContent: z
      .string()
      .min(1, JP_ERROR_MESSAGE.GENERIC_REQUIRED)
      .refine(
        (value) => !(value.length >= 250),
        JP_ERROR_MESSAGE.INQUIRY_CONTENT_MAX,
      ),
    inquiryDetailsTypes: z.array(z.string()), // This serves like a hidden field that stores selected inquiry type label
    jobQualificationsTypes: z.array(z.string()), // This serves like a hidden field that stores selected inquiry type label
    consent: z.boolean().refine((value) => value, {
      message: JP_ERROR_MESSAGE.CONSENT_REQUIRED,
    }),
  })
  .refine(
    (value) =>
      value.inquiryDetailsJobApplication ||
      value.inquiryDetailsTourFacility ||
      value.inquiryDetailsJob ||
      value.inquiryDetailsOthers,
    {
      path: ["inquiryDetailsTypes"],
      message: JP_ERROR_MESSAGE.GENERIC_REQUIRED,
    },
  )
  .refine(
    (value) =>
      value.nurse ||
      value.publicHealthNurse ||
      value.associateNurse ||
      value.midwife,
    {
      path: ["jobQualificationsTypes"],
      message: JP_ERROR_MESSAGE.GENERIC_REQUIRED,
    },
  );
