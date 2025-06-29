"use server";

import { genericRequest } from "@/lib/generic-action";
import { SaveToResponseType } from "./types";

export const saveToFavorites = async (jobId: string) => {
  const path = `/add/favorite?position_id=${jobId}`;
  const response = await genericRequest({
    path: path,
    method: "POST",
    headerOptions: {
      Accept: "application/json",
    },
    options: {
      cache: "no-store",
    },
  });

  const data: SaveToResponseType = await response.json();

  return data;
};

export const saveToViewed = async (jobId: string) => {
  const path = `/add/viewed?position_id=${jobId}`;
  const response = await genericRequest({
    path: path,
    method: "POST",
    headerOptions: {
      Accept: "application/json",
    },
    options: {
      cache: "no-store",
    },
  });

  const data: SaveToResponseType = await response.json();
  return data;
};
