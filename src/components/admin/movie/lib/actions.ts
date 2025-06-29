"use server";

import { genericRequest } from "@/lib/generic-action";
import {
  AdminMovieListResponseType,
  UpdateAdminMovieResponseType,
} from "./types";
import { formAdminMovieSchema } from "./form-schema";
import { z } from "zod";

type SearchParams = {
  searchParams: string;
};

export const getAdminMovieList = async ({ searchParams }: SearchParams) => {
  const path = `/movie?${searchParams}`;
  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: AdminMovieListResponseType = await response.json();
  return data;
};

export const createAdminMovie = async (
  values: z.infer<typeof formAdminMovieSchema> & {
    id: string;
  },
) => {
  // if mediaId is an array, set it as is, else make it an array
  const mediaIds = Array.isArray(values.mediaId)
    ? values.mediaId
    : [values.mediaId];

  const payload = {
    sub_category_item_id: values.category,
    name: values.title,
    description: values.description,
    link: values.videoUrl,
    media_id: mediaIds,
  };

  const path = `/movie`;
  const response = await genericRequest({
    path: path,
    method: "POST",
    isAdminPath: true,
    options: {
      body: JSON.stringify(payload),
    },
  });

  const data: UpdateAdminMovieResponseType = await response.json();
  return data;
};

export const updateAdminMovie = async (
  values: z.infer<typeof formAdminMovieSchema> & {
    id: string;
  },
) => {
  // if mediaId is an array, set it as is, else make it an array
  const mediaIds = Array.isArray(values.mediaId)
    ? values.mediaId
    : [values.mediaId];

  const payload = {
    sub_category_item_id: values.category,
    name: values.title,
    description: values.description,
    link: values.videoUrl,
    media_id: mediaIds,
  };

  const path = `/movie/${values?.id}`;
  const response = await genericRequest({
    path: path,
    method: "PUT",
    isAdminPath: true,
    options: {
      body: JSON.stringify(payload),
    },
  });

  const data: UpdateAdminMovieResponseType = await response.json();
  return data;
};
