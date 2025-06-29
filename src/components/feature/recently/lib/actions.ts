"use server";

import { genericRequest } from "@/lib/generic-action";
import { RecentlyViewedJobsResponseType } from "./types";

export const getRecentlyViewedJobs = async () => {
  const path = `/viewed/position`;
  const response = await genericRequest({
    path: path,
    method: "GET",
  });

  const data: RecentlyViewedJobsResponseType = await response.json();
  return data;
};
