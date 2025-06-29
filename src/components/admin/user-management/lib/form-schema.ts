import { attachPasswordValidation } from "@/components/feature/form";
import { JP_ERROR_MESSAGE } from "@components/feature/form/lib/error-messages-map";
import { z } from "zod";

export const userFormSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: JP_ERROR_MESSAGE.TESTIMONIAL_NAME_REQUIRED }),
    email: z
      .string()
      .min(1, JP_ERROR_MESSAGE.USER_EMAIL_REQUIRED)
      .email(JP_ERROR_MESSAGE.EMAIL_INVALID_FORMAT),
    role: z.string().min(1, { message: JP_ERROR_MESSAGE.GENERIC_LEAST_ONE }),
    note: z.string().optional().nullable(),
    thumbnail: z
      .array(
        z.object({
          id: z.string(),
          url: z.string().nullable().optional(),
        }),
      )
      .optional(),
    password: attachPasswordValidation(),
    confirmPassword: z
      .string()
      .min(1, JP_ERROR_MESSAGE.PASSWORD_CONFIRM_REQUIRED),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: JP_ERROR_MESSAGE.PASSWORD_CONFIRM_NOT_MATCH,
      path: ["confirmPassword"],
    },
  );

export const userFormUpdateSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: JP_ERROR_MESSAGE.TESTIMONIAL_NAME_REQUIRED }),
    email: z
      .string()
      .min(1, JP_ERROR_MESSAGE.USER_EMAIL_REQUIRED)
      .email(JP_ERROR_MESSAGE.EMAIL_INVALID_FORMAT),
    role: z.string().min(1, { message: JP_ERROR_MESSAGE.GENERIC_LEAST_ONE }),
    note: z.string().optional().nullable(),
    thumbnail: z
      .array(
        z.object({
          id: z.string(),
          url: z.string().nullable().optional(),
        }),
      )
      .optional(),
    password: attachPasswordValidation().optional().or(z.literal("")), // Allow empty string
    confirmPassword: z.string().optional().or(z.literal("")), // Allow empty string
  })
  .refine(
    (values) => {
      // If password is provided, confirmPassword must also be provided
      if (values.password && !values.confirmPassword) {
        return false;
      }
      return true;
    },
    {
      message: JP_ERROR_MESSAGE.PASSWORD_CONFIRM_REQUIRED,
      path: ["confirmPassword"],
    },
  )
  .refine(
    (values) => {
      // Ensure passwords match only when password is provided
      if (
        values.password &&
        values.confirmPassword &&
        values.password !== values.confirmPassword
      ) {
        return false;
      }
      return true;
    },
    {
      message: JP_ERROR_MESSAGE.PASSWORD_CONFIRM_NOT_MATCH,
      path: ["confirmPassword"],
    },
  );
