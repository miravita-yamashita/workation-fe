"use server";

import { DeleteGenericItemApiResponseType } from "@/components/feature/datatable";
import { genericRequest } from "@/lib/generic-action";
import { z } from "zod";
import { replyFormSchema } from "./form-schema";
import {
  AdminInquiriesListResponseType,
  InquiryDetailsAdminResponseType,
} from "./types";

type SearchParams = {
  searchParams: string;
};

export const getAdminInquiryList = async ({ searchParams }: SearchParams) => {
  const path = `/inquiry?${searchParams}`;
  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: AdminInquiriesListResponseType = await response.json();
  return data;
};

export const getAdminInquiryDetail = async (id: string) => {
  const path = `/inquiry/show?id=${id}`;
  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: InquiryDetailsAdminResponseType = await response.json();
  return data;
};

export const updateInquiry = async (
  values: z.infer<typeof replyFormSchema>,
  id?: string | null | undefined,
) => {
  const path = `/inquiry/update?id=${id}`;

  const formDataMapping = {
    reply: values?.reply,
  };

  const formData = new FormData();

  if (values?.reply) {
    formData.append("is_replied", "true");
  }

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

  formData.append("_method", "PUT");

  const response = await genericRequest({
    path: path,
    method: "POST",
    options: {
      body: formData,
    },
    isAdminPath: true,
    removeHeaderKey: "Content-Type",
  });

  const data: InquiryDetailsAdminResponseType = await response.json();

  return data;
};

export const deleteInquiry = async (id: string | string[] | undefined) => {
  if (!id) return null;

  const path = `/inquiry/${id}`;

  const response = await genericRequest({
    path: path,
    method: "DELETE",
    isAdminPath: true,
  });

  const data: DeleteGenericItemApiResponseType = await response.json();

  return data;
};
