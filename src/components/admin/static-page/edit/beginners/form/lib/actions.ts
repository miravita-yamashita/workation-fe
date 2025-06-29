"use server";

import { z } from "zod";
import { genericRequest } from "@/lib/generic-action";
import { GenericUpdateApiResponseType } from "@/lib/types";
import { formAdminStaticBeginnersSchema } from "./form-schema";

export const updateAdminStaticBeginnersPage = async (
  values: z.infer<typeof formAdminStaticBeginnersSchema> & {
    id: string;
  },
) => {
  const payload = {
    rec_positions: [
      values.recommendedJobNo1,
      values.recommendedJobNo2,
      values.recommendedJobNo3,
    ].filter(Boolean),
    articles: values.postDropdown.map((post) => post?.id).filter(Boolean),
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
