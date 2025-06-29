"use server";

import { genericRequest } from "@/lib/generic-action";
import { RecommendedJobsResponseType, AreaResponseType } from "./types";

export const getRecommendedJobs = async (limit: string = "3") => {
  const path = `/top/job/recommended?limit=${limit}`;
  const response = await genericRequest({
    path: path,
    method: "GET",
  });

  const data: RecommendedJobsResponseType = await response.json();
  return data;
};

export const getAreaJobs = async () => {
  const path = `/top/job/prefecture`;
  const response = await genericRequest({
    path: path,
    method: "GET",
  });

  const data: AreaResponseType = await response.json();
  return data;
};
