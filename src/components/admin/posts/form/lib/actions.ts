"use server";

import { genericRequest } from "@/lib/generic-action";
import {
  GetArticleDropdownResponseType,
  GetCategoriesResponseType,
  GetFAQDropdownResponseType,
  GetRecommendedJobsResponseType,
  GetTagsResponseType,
} from "./types";
import { z } from "zod";
import { formPostFormSchema } from "./form-schema";
import { getFAQValue } from "./utils";

// #region Recommended Jobs
export const getRecommendedJobs = async () => {
  const path = `/job/recommended/list`;

  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: GetRecommendedJobsResponseType = await response.json();

  return data;
};

// #region Post Categories
export const getPostCategories = async () => {
  const path = `/category/item?filter[name]=post`;

  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: GetCategoriesResponseType = await response.json();

  return data;
};

// #region Post Tags
export const getPostTags = async () => {
  const path = `/article/tags`;

  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: GetTagsResponseType = await response.json();

  return data;
};

// #region Articles for Dropdown
export const getArticleDropdown = async () => {
  const path = `/article/dropdown`;

  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: GetArticleDropdownResponseType = await response.json();
  return data;
};

// #region FAQ for dropdown
export const getFAQDropdown = async () => {
  const path = `/question/dropdown`;

  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: GetFAQDropdownResponseType = await response.json();

  return data;
};

// # Saving or Updating Post
export const submitPost = async ({
  isEditMode,
  values,
  postId,
}: {
  isEditMode: boolean;
  values: z.infer<typeof formPostFormSchema>;
  postId: string;
}) => {
  const path = `/article${isEditMode ? `/${postId}` : ""}`;

  const payload = {
    title: values.title,
    content: values.richtext,
    slug: values.permaLink,
    meta_title: values.metaTitle,
    meta_description: values.metaDescription,
    short_title: values.shortTitle,
    long_title: values.longTile,
    articles: [
      values.relatedArticleFirst,
      values.relatedArticleSecond,
      values.relatedArticleThird,
    ].filter((item) => item !== ""),
    // Extracting FAQ values and then remove null final values
    questions: [
      getFAQValue({
        faqId: values.faqFirst,
        customQuestion: values.faqFirstCustom.question,
        customAnswer: values.faqFirstCustom.answer,
      }),
      getFAQValue({
        faqId: values.faqSecond,
        customQuestion: values.faqSecondCustom.question,
        customAnswer: values.faqSecondCustom.answer,
      }),
      getFAQValue({
        faqId: values.faqThird,
        customQuestion: values.faqThirdCustom.question,
        customAnswer: values.faqThirdCustom.answer,
      }),
    ].filter((item) => item !== null),
    // Converting categories to ids, remove false values
    categories: values.categories
      .filter((item) => item.value)
      .map((item) => item.id),
    // We only need to get items with empty id or true value
    tags: values.tags.filter((item) => item.id === "" || item.value),
    media_banner: values.banners.map(({ mediaId, url, pivotId }) => ({
      id: mediaId,
      banner_url: url, // this is clickable link not the media library string
      pivot_id: pivotId,
    })),
    media_custom: [values.thumbnail],
  };

  const response = await genericRequest({
    path: path,
    method: isEditMode ? "PUT" : "POST",
    isAdminPath: true,
    options: {
      body: JSON.stringify(payload),
    },
  });

  const data = await response.json();

  return data;
};

export const checkSlugAvailability = async ({
  slug,
  id,
}: {
  slug: string;
  id: string;
}) => {
  const path = `/article/check/${slug}/${id || undefined}`;

  const response = await genericRequest({
    path: path,
    method: "GET",
  });

  const data = await response.json();

  return data;
};
