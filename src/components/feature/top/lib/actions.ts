"use server";

import { genericRequest } from "@/lib/generic-action";
import {
  FilterCategoryNameListResponseType,
  JobSearchResultsResponseType,
} from "./types";

export const getJobSearchResults = async (queryString: string) => {
  const path = `/top/job/search?${queryString}`;
  const response = await genericRequest({
    path: path,
    method: "GET",
  });

  const data: JobSearchResultsResponseType = await response.json();
  return data;
};

export const getFilterCategoryNameList = async () => {
  const path = `/category/item`;
  const response = await genericRequest({
    path: path,
    method: "GET",
  });

  const data: FilterCategoryNameListResponseType = await response.json();
  return data;
};
