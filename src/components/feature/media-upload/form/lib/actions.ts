"use server";

import { z } from "zod";
import { UpdateMediaResponseType, UploadMediaResponseType } from "./types";
import { updateMediaFormSchema } from "./form-schema";
import { genericRequest } from "@/lib/generic-action";

// #region Uploading Media
export const uploadMedia = async (values: FormData) => {
  const path = "/media/upload";

  

  const response = await genericRequest({
    path: path,
    method: "POST",
    isAdminPath: true,
    removeHeaderKey: "Content-Type",
    options: {
      body: values,
    },
  });

  const data: UploadMediaResponseType = await response.json();

  return data;
};

// #region Updating Media
export const updateMedia = async (
  mediaId: string,
  values: z.infer<typeof updateMediaFormSchema>,
) => {
  const path = `/media/${mediaId}`;

  const formData = new FormData();
  formData.append("title", values.title);
  formData.append("caption", values.caption);
  formData.append("alt", values.altText);

  const response = await genericRequest({
    path: path,
    method: "POST",
    isAdminPath: true,
    removeHeaderKey: "Content-Type",
    options: {
      body: formData,
    },
  });

  const data: UpdateMediaResponseType = await response.json();

  return data;
};
