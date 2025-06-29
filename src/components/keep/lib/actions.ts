"use server";

import { genericRequest } from "@/lib/generic-action";
import { DeleteResponse, KeepJobsResponseType } from "./types";

type KeepJobProps = {
  searchParams?: string;
};

export const getKeepJobs = async ({ searchParams }: KeepJobProps) => {
  const path = `/jobs/list/keep?${searchParams}`;

  const response = await genericRequest({
    path: path,
    method: "GET",
  });

  const data: KeepJobsResponseType = await response.json();
  return data;
};

type Ids = string[];

export const removeJobs = async (jobs: Ids) => {
  const path = `/jobs/keep/remove`;
  const paylaod = { position_ids: [...jobs] };

  const response = await genericRequest({
    path: path,
    method: "POST",
    options: {
      body: JSON.stringify(paylaod),
    },
  });

  const data: DeleteResponse = await response.json();

  return data;
};
