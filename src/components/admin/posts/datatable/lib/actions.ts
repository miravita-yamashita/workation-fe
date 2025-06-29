"use server";

import { genericRequest } from "@/lib/generic-action";
import {
  AdminPostsListResponseType,
  ToggleRecommendedArticleResponse,
} from "./types";

type SearchParams = {
  searchParams: string;
};

export const getAdminPostsList = async ({ searchParams }: SearchParams) => {
  const path = `/article?${searchParams}`;
  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: AdminPostsListResponseType = await response.json();
  return data;
};

export const toggleRecommendedArticle = async ({ id }: { id: string }) => {
  const path = `/article/recommended/${id}`;

  const response = await genericRequest({
    path: path,
    method: "PUT",
    isAdminPath: true,
  });

  const data: ToggleRecommendedArticleResponse = await response.json();

  return data;
};
