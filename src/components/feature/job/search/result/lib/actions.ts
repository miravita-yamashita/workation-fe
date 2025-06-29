"use server";

import { genericRequest } from "@/lib/generic-action";
import { JobSearchResponseType } from "./types";

export const getJobSearch = async (queryString: string) => {
  const path = `/top/job/search?screen=1&${queryString}`;

  const response = await genericRequest({
    path: path,
    method: "GET",
  });

  const data: JobSearchResponseType = await response.json();

  return data;
};
