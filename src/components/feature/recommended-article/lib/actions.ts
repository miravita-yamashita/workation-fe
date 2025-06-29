"use server";

import { genericRequest } from "@/lib/generic-action";
import { GetRecommendedArticlesResponseType } from "./types";

export const getRecommendedArticles = async () => {
  const path = `/article/recommended/public`;

  const response = await genericRequest({
    path: path,
    method: "GET",
  });

  const data: GetRecommendedArticlesResponseType = await response.json();

  return data;
};
