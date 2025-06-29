"use server";

import { genericRequest } from "@/lib/generic-action";
import { JobDetailsResponseType } from "./types";

export const getJobDetails = async (id: string) => {
  const path = `/jobs/details/${id}`;
  const response = await genericRequest({
    path: path,
    method: "GET",
  });

  const data: JobDetailsResponseType = await response.json();
  return data;
};
