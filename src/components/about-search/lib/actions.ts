"use server";

import { genericRequest } from "@/lib/generic-action";
import { GetArticleSearchResponseType } from "./types";

export const getArticleSearchResult = async (searchParams: string) => {
  // Search Term and Search Keyword Tag cannot got at the same time but possible if set on search params
  const path = `/article/search/result?${searchParams}`;

  const response = await genericRequest({
    path: path,
    method: "GET",
  });

  const data: GetArticleSearchResponseType = await response.json();

  return data;
};
