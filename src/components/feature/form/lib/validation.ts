import { z } from "zod";
import { JP_ERROR_MESSAGE } from "./error-messages-map";

export const attachPhoneValidation = () => {
  return z
    .string()
    .min(1, JP_ERROR_MESSAGE.GENERIC_REQUIRED)
    .refine(
      (value) => value.match(/^[0-9-]+$/),
      JP_ERROR_MESSAGE.PHONE_NUMBERS_ONLY,
    )
    .refine((value) => value.includes("-"), JP_ERROR_MESSAGE.PHONE_MUST_HYPHEN)
    .refine((value) => {
      const formats = [
        /^\d{3}-\d{4}-\d{4}$/,
        /^\d{2}-\d{6}-\d{6}$/,
        /^\d{6}-\d{6}-\d{6}$/,
      ];
      return formats.some((format) => value.match(format));
    }, JP_ERROR_MESSAGE.PHONE_INVALID_FORMAT);
};

export const attachOptionalPhoneValidation = () => {
  return z
    .string()
    .optional()
    .refine(
      (value) => !value || /^[0-9-]+$/.test(value), // Ensure only numbers and hyphens are allowed
      JP_ERROR_MESSAGE.PHONE_NUMBERS_ONLY,
    )
    .refine(
      (value) => !value || value.includes("-"), // Ensure hyphen is present
      JP_ERROR_MESSAGE.PHONE_MUST_HYPHEN,
    )
    .refine((value) => {
      if (!value) return true; // Skip validation if value is undefined
      const formats = [
        /^\d{3}-\d{4}-\d{4}$/, // 000-0000-0000
        /^\d{3}-\d{3}-\d{4}$/, // 000-000-0000
        /^\d{2}-\d{4}-\d{4}$/, // 00-0000-0000
        /^\d{4}-\d{4}-\d{4}$/, // 0000-0000-0000
        /^\d{2}-\d{6}-\d{6}$/, // 00-000000-000000
        /^\d{6}-\d{6}-\d{6}$/, // 000000-000000-000000
        /^\d{4}-\d{2}-\d{4}$/, // 0000-00-0000
        /^\d{5}-\d{1}-\d{4}$/, // 01374-2-7000
      ];
      return formats.some((format) => format.test(value));
    }, JP_ERROR_MESSAGE.PHONE_INVALID_FORMAT);
};

export const attachPasswordValidation = () => {
  return z
    .string()
    .min(1, JP_ERROR_MESSAGE.GENERIC_REQUIRED)
    .refine(
      (value) => /^[\x20-\x7E]*$/.test(value),
      JP_ERROR_MESSAGE.PASSWORD_HALF_WIDTH_ONLY,
    )
    .refine(
      (value) => /[a-zA-Z]/.test(value),
      JP_ERROR_MESSAGE.PASSWORD_MUST_ONE_LETTER,
    )
    .refine(
      (value) => /[A-Z]/.test(value),
      JP_ERROR_MESSAGE.PASSWORD_MUST_ONE_UPPERCASE,
    )
    .refine(
      (value) => /[a-z]/.test(value),
      JP_ERROR_MESSAGE.PASSWORD_MUST_ONE_LOWERCASE,
    )
    .refine(
      (value) => value.length >= 8,
      JP_ERROR_MESSAGE.PASSWORD_MUST_BE_8_CHARACTERS,
    );
};
