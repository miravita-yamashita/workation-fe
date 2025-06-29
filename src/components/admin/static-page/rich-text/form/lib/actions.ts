"use server";

import { z } from "zod";
import { UpdateRichTextResponseType } from "./types";
import { genericRequest } from "@/lib/generic-action";
import { richTextFormSchema } from "./form-schema";

// #region Saving RichText
// This is shared by AC-60-60-80 since they are similar
export const updateStaticRichText = async (
  slug: string,
  values: z.infer<typeof richTextFormSchema>,
) => {
  const path = `/pages/content/${slug}`;

  const payload = {
    title: values.title,
    content: values.richtext,
  }

  const response = await genericRequest({
    path: path,
    method: "PATCH",
    isAdminPath: true,
    options: {
      body: JSON.stringify(payload),
    }
  });

  const data: UpdateRichTextResponseType = await response.json();

  return data;
};
