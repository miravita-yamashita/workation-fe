"use server";

import { z } from "zod";
import { genericRequest } from "@/lib/generic-action";
import { GenericUpdateApiResponseType } from "@/lib/types";
import { formAdminStaticAboutSchema } from "./form-schema";

export const updateAdminStaticAboutPage = async (
  values: z.infer<typeof formAdminStaticAboutSchema> & {
    id: string;
  },
) => {
  const payload = {
    rec_positions: [
      values.recommendedJobNo1,
      values.recommendedJobNo2,
      values.recommendedJobNo3,
    ].filter(Boolean),
    // Extract posts
    articles: values.postDropdown.map((post) => post?.id).filter(Boolean), // Ensure no empty values
  };

  const path = `/pages/${values?.id}`;
  const response = await genericRequest({
    path: path,
    method: "PATCH",
    isAdminPath: true,
    options: {
      body: JSON.stringify(payload),
    },
  });

  const data: GenericUpdateApiResponseType = await response.json();
  return data;
};
