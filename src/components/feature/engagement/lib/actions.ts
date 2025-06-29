"use server";

import { genericRequest } from "@/lib/generic-action";
import { EngagementCountResponseType } from "./types";

export const getEngagementCount = async () => {
  const path = "/floating/menu";

  const response = await genericRequest({
    path,
    method: "GET",
  });

  const data: EngagementCountResponseType = await response.json();

  return data;
};
