import { z } from "zod";
import { JP_ERROR_MESSAGE } from "@components/feature/form/lib/error-messages-map";
import { attachPhoneValidation } from "@components/feature/form";

export const hospitalFormSchema = z.object({
  companyName: z.string().min(1, JP_ERROR_MESSAGE.GENERIC_REQUIRED),
  sei: z.string().min(1, JP_ERROR_MESSAGE.GENERIC_REQUIRED_KATAKANA),
  may: z.string().min(1, JP_ERROR_MESSAGE.GENERIC_REQUIRED_KATAKANA),
  facilityName: z.string().min(1, JP_ERROR_MESSAGE.GENERIC_REQUIRED),
  personInChargeLastName: z.string().min(1, JP_ERROR_MESSAGE.GENERIC_REQUIRED),
  personInChargeFirstName: z.string().min(1, JP_ERROR_MESSAGE.GENERIC_REQUIRED),
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
  inquiryContent: z
    .string()
    .min(1, JP_ERROR_MESSAGE.GENERIC_REQUIRED)
    .refine(
      (value) => !(value.length >= 250),
      JP_ERROR_MESSAGE.INQUIRY_CONTENT_MAX,
    ),
  consent: z.boolean().refine((value) => value, {
    message: JP_ERROR_MESSAGE.CONSENT_REQUIRED,
  }),
});
