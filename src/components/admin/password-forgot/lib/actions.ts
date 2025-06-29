"use server";

import { genericRequest } from "@/lib/generic-action";
import { SendForgotPasswordResponseType } from "./types";

export const requestForgotPassword = async (email: string) => {
  const path = `/request-reset-password`;

  const formData = new FormData();
  formData.append("email", email);

  const response = await genericRequest({
    path: path,
    method: "POST",
    isAdminPath: true,
    removeHeaderKey: "Content-Type",
    options: {
      body: formData,
    },
  });

  const data: SendForgotPasswordResponseType = await response.json();

  return data;
};
