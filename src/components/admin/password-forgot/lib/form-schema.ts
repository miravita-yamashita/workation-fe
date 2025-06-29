import { JP_ERROR_MESSAGE } from "@/components/feature/form";
import { z } from "zod";

export const forgotPasswordFormSchema = z.object({
  email: z
    .string()
    .min(1, JP_ERROR_MESSAGE.USER_EMAIL_REQUIRED)
    .email(JP_ERROR_MESSAGE.EMAIL_INVALID_FORMAT),
  // NOTE: Keeping this for reference
  //  .refine(async (data) => {
  //     const currentLoginId = useRegisterFromStore.getState().currentLoginId;
  //     if (currentLoginId === data) {
  //       return true;
  //     }

  //     return await checkIfUsernameExistsValidation(data);
  //   }, JP_ERROR_MESSAGE.EMAIL_NOT_EXIST);
});
