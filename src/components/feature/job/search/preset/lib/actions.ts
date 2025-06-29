"use server";

import { genericRequest } from "@/lib/generic-action";
import {
  JobSearchFilterDeleteResponseType,
  JobSearchFilterGetResponseType,
  JobSearchFilterPayloadShapeType,
  JobSearchFilterSaveResponseType,
} from "./types";

export const getSavedSearchFilters = async ({
  limit = 0,
}: {
  limit: number;
}) => {
  const path = `/saved/search?limit=${limit}`;

  const response = await genericRequest({
    path: path,
    method: "GET",
  });

  const data: JobSearchFilterGetResponseType = await response.json();

  return data;
};

export const saveSearchFilter = async (
  payload: JobSearchFilterPayloadShapeType,
) => {
  const path = "/saved/search/add";

  const response = await genericRequest({
    path: path,
    method: "POST",
    options: {
      body: JSON.stringify({ saved_filters: payload }),
    },
  });

  const data: JobSearchFilterSaveResponseType = await response.json();

  return data;
};

export const deleteSavedSearchFilter = async (id: string) => {
  const path = `/saved/search/delete/${id}`;

  const response = await genericRequest({
    path: path,
    method: "DELETE",
  });

  const data: JobSearchFilterDeleteResponseType = await response.json();

  return data;
};