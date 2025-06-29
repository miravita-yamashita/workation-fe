"use server";

import { DeleteGenericItemApiResponseType } from "@/components/feature/datatable";
import { genericRequest } from "@/lib/generic-action";
import { z } from "zod";
import { emailFormSchema } from "./form-schema";
import {
  AdminEmailTemplatesListResponseType,
  EmailTemplateDetailsAdminResponseType,
} from "./types";

type SearchParams = {
  searchParams: string;
};

export const getAdminEmailTemplatesList = async ({
  searchParams,
}: SearchParams) => {
  const path = `/mail-template?${searchParams}`;
  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: AdminEmailTemplatesListResponseType = await response.json();
  return data;
};

export const getAdminEmailDetails = async (id: string) => {
  const path = `/mail-template/${id}`;
  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: EmailTemplateDetailsAdminResponseType = await response.json();
  return data;
};

export const createUpdateEmailTemplate = async (
  values: z.infer<typeof emailFormSchema>,
  id?: string,
) => {
  let path;
  if (id) {
    path = `/mail-template/${id}`;
  } else {
    path = `/mail-template`;
  }

  const formDataMapping = {
    name: values?.name,
    content: values?.content,
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

  const data: EmailTemplateDetailsAdminResponseType = await response.json();

  return data;
};

export const deleteEmailTemplate = async (
  id: string | string[] | undefined,
) => {
  if (!id) return null;

  const path = `/mail-template/delete`;

  const payload = { template_ids: [id] };

  const response = await genericRequest({
    path: path,
    method: "POST",
    options: {
      body: JSON.stringify(payload),
    },
    isAdminPath: true,
  });

  const data: DeleteGenericItemApiResponseType = await response.json();

  return data;
};
