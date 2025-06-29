"use server";

import { genericRequest } from "@/lib/generic-action";
import { RelatedJobResponseType } from "./types";

export const getRelatedJobs = async (jobId: string) => {
  const path = `/position/related?position_id=${jobId}`;
  const response = await genericRequest({
    path: path,
    method: "GET",
  });

  const data: RelatedJobResponseType = await response.json();
  return data;
};
