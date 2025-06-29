"use server";
import { genericRequest } from "@/lib/generic-action";
import { JobFiltersResponseType, PrefectureResponseType } from "./types";

export const getJobSearchFilters = async () => {
  const path = "/category/item";

  const response = await genericRequest({
    path: path,
    method: "GET",
  });

  const data: JobFiltersResponseType = await response.json();

  return data;
};

export const getJobSearchPrefectures = async () => {
  const path = "/top/prefecture";

  const response = await genericRequest({
    path: path,
    method: "GET",
  });

  const data: PrefectureResponseType = await response.json();

  return data;
};