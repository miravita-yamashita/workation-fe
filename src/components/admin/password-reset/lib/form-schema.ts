import { JP_ERROR_MESSAGE } from "@/components/feature/form";
import { z } from "zod";
import { attachPasswordValidation } from "@/components/feature/form/lib/validation";

export const formPasswordResetSchema = z
  .object({
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
