"use server";

import { genericRequest } from "@/lib/generic-action";
import { GetArticleListResponseType } from "./types";

export const getArticleList = async () => {
  const path = `/article/category/article-list`;

  const response = await genericRequest({
    path: path,
    method: "GET",
  });

  const data: GetArticleListResponseType = await response.json();

  return data;
};
