"use server";

import { genericRequest } from "@/lib/generic-action";
import { RequestChangePasswordResponseType } from "./types";
import { z } from "zod";
import { formPasswordResetSchema } from "./form-schema";

export const requestChangePassword = async (
  values: z.infer<typeof formPasswordResetSchema>,
  token: string,
  email: string,
) => {
  const path = `/reset-password`;

  const formData = new FormData();
  formData.append("token", token);
  formData.append("email", email);
  formData.append("password", values.password);
  formData.append("password_confirmation", values.confirmPassword);

  const response = await genericRequest({
    path: path,
    method: "POST",
    isAdminPath: true,
    removeHeaderKey: "Content-Type",
    options: {
      body: formData,
    },
  });

  const data: RequestChangePasswordResponseType = await response.json();

  return data;
};
