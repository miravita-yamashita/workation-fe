"use server";

import { z } from "zod";
import { genericRequest } from "@/lib/generic-action";
import { GenericUpdateApiResponseType } from "@/lib/types";
import { formAdminStaticTopSchema } from "./form-schema";

export const updateAdminStaticTopPage = async (
  values: z.infer<typeof formAdminStaticTopSchema> & {
    id: string;
  },
) => {
  const payload = {
    rec_positions: [
      values.recommendedJobNo1,
      values.recommendedJobNo2,
      values.recommendedJobNo3,
    ].filter(Boolean),
    // Extract posts (posts titles and bodies)
    articles: [values.post1, values.post2].filter(Boolean),
    // Extract steps (freelance nurse titles and bodies)
    steps: [
      {
        id: null,
        title: values.freelanceNurseTitle1,
        header_title: values.freelanceNurseTitle1,
        plain_content: values.freelanceNurseBody1,
      },
      {
        id: null,
        title: values.freelanceNurseTitle2,
        header_title: values.freelanceNurseTitle2,
        plain_content: values.freelanceNurseBody2,
      },
      {
        id: null,
        title: values.freelanceNurseTitle3,
        header_title: values.freelanceNurseTitle3,
        plain_content: values.freelanceNurseBody3,
      },
    ].filter((step) => step.title && step.plain_content),
    // Extract banners (banner URLs and media IDs)
    media_banner: values?.banners.map((banner) => ({
      id: banner?.mediaId,
      banner_url: banner?.url,
      pivot_id: banner?.pivotId,
    })),
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
