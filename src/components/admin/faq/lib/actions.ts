"use server";

import { genericRequest } from "@/lib/generic-action";
import {
  AdminFaqListResponseType,
  FAQCategoriesAdminResponseType,
  FAQDetailsAdminResponseType,
} from "./types";
import { FaqFormSchema } from "./form-schema";
import { z } from "zod";
import { DeleteGenericItemApiResponseType } from "@/components/feature/datatable";

type SearchParams = {
  searchParams: string;
};

export const getAdminFaqList = async ({ searchParams }: SearchParams) => {
  const path = `/question/all?${searchParams}`;
  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: AdminFaqListResponseType = await response.json();
  return data;
};

export const getAdminFaqDetails = async (id: string) => {
  const path = `/question/show?id=${id}`;
  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: FAQDetailsAdminResponseType = await response.json();
  return data;
};

export const getFaqCategories = async () => {
  const path = `/question/categories`;
  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: FAQCategoriesAdminResponseType = await response.json();
  return data;
};

export const createUpdateFaq = async (
  values: z.infer<typeof FaqFormSchema>,
  id?: string,
) => {
  let path;
  if (id) {
    path = `/question/update?id=${id}`;
  } else {
    path = `/question`;
  }

  const formDataMapping = {
    category: values?.category,
    question: values?.question,
    answer: values?.answer,
  };

  const formData = new FormData();

  Object.entries(formDataMapping).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (item !== undefined && item !== null) {
          formData.append(`${key}[${index}]`, String(item));
        }
      });
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  if (id) {
    formData.append("_method", "PUT");
  }

  const response = await genericRequest({
    path: path,
    method: "POST",
    options: {
      body: formData,
    },
    isAdminPath: true,
    removeHeaderKey: "Content-Type",
  });

  const data: FAQDetailsAdminResponseType = await response.json();

  return data;
};

export const deleteFaq = async (id: string | string[] | undefined) => {
  if (!id) return null;

  const path = `/question/delete?id=${id}`;

  const response = await genericRequest({
    path: path,
    method: "DELETE",
    isAdminPath: true,
  });

  const data: DeleteGenericItemApiResponseType = await response.json();

  return data;
};
