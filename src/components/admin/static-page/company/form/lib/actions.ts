"use server";

import { genericRequest } from "@/lib/generic-action";
import { SubmitCompanyProfileResponseType } from "./types";
import { z } from "zod";
import { companyFormSchema } from "./form-schema";

export const updateCompanyProfile = async (
  id: string,
  values: z.infer<typeof companyFormSchema>,
) => {
  const path = `/pages/${id}`;

  const {
    headline,
    body,
    eyeCatchingImage,
    philosophy,
    guidelines,
    companyOverview,
  } = values;

  const payload = {
    greetings: [
      {
        id,
        title: headline,
        plain_content: body,
        media_id: [eyeCatchingImage],
        philosophy,
      },
    ],
    guide: guidelines.map(({ id, title, body }) => ({
      id,
      title,
      plain_content: body,
    })),
    profile: companyOverview.map(({ id, title, body }) => ({
      id,
      title,
      plain_content: body,
    })),
  };

  const response = await genericRequest({
    path: path,
    method: "PATCH",
    isAdminPath: true,
    options: {
      body: JSON.stringify(payload),
    },
  });

  const data: SubmitCompanyProfileResponseType = await response.json();

  return data;
};
