import { z } from "zod";
import { JP_ERROR_MESSAGE } from "@components/feature/form/lib/error-messages-map";
import { attachPhoneValidation } from "@components/feature/form";

export const nurseFormSchema = z
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
    inquiryTypeJobApplication: z.boolean(),
    inquiryTypeConsultation: z.boolean(),
    inquiryTypeRegisterJob: z.boolean(),
    inquiryTypeOther: z.boolean(),
    inquiryContent: z
      .string()
      .min(1, JP_ERROR_MESSAGE.GENERIC_REQUIRED)
      .refine(
        (value) => !(value.length >= 250),
        JP_ERROR_MESSAGE.INQUIRY_CONTENT_MAX,
      ),
    inquiryTypes: z.array(z.string()), // This serves like a hidden field that stores selected inquiry type label
    consent: z.boolean().refine((value) => value, {
      message: JP_ERROR_MESSAGE.CONSENT_REQUIRED,
    }),
  })
  .refine(
    (value) =>
      value.inquiryTypeJobApplication ||
      value.inquiryTypeConsultation ||
      value.inquiryTypeRegisterJob ||
      value.inquiryTypeOther,
    {
      path: ["inquiryTypes"],
      message: JP_ERROR_MESSAGE.GENERIC_REQUIRED,
    },
  );
