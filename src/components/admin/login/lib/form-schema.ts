import { z } from "zod";
import { JP_ERROR_MESSAGE } from "@components/feature/form/lib/error-messages-map";

export const loginFormSchema = z.object({
  username: z.string().min(1, { message: JP_ERROR_MESSAGE.LOGIN_REQUIRED }),
  password: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE.LOGIN_PASSWORD_REQUIRED }),
  keepMeLoggedIn: z.boolean(),
});
