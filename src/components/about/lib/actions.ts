"use server";

import { ContentResponseType } from "@/components/first-time";
import { genericRequest } from "@/lib/generic-action";
import {
  ArticleAboutResponse,
  GetArticleDetailResponseType,
  GetArticleSearchKeywordsResponseType,
} from "./types";

export const getWhatIsWorkationNurseContent = async () => {
  const path = `/content`;
  const response = await genericRequest({
    path: path,
    method: "GET",
  });

  const data: ContentResponseType = await response.json();
  return data;
};

export const getArticlesBySlug = async (slug: string) => {
  const path = `/article/${slug}`;
  const response = await genericRequest({
    path: path,
    method: "GET",
  });

  const data: GetArticleDetailResponseType = await response.json();
  return data;
};

// #region Article Search Keywords
export const getArticlesSearchKeywords = async () => {
  const path = `/article/search/keyword?filter[name]=post`;
  const response = await genericRequest({
    path: path,
    method: "GET",
  });

  const data: GetArticleSearchKeywordsResponseType = await response.json();

  return data;
};

export const getArticlesAboutBySlug = async (slug: string) => {
  const path = `/article/${slug}`;
  const response = await genericRequest({
    path: path,
    method: "GET",
  });

  const data: ArticleAboutResponse = await response.json();
  return data;
};
