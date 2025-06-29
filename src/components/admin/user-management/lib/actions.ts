"use server";

import { DeleteGenericItemApiResponseType } from "@/components/feature/datatable";
import { genericRequest } from "@/lib/generic-action";
import { z } from "zod";
import { userFormSchema, userFormUpdateSchema } from "./form-schema";
import {
  AdminUserListResponseType,
  UserManagementDetailsResponseType,
} from "./types";

type SearchParams = {
  searchParams: string;
};

export const getAdminUserList = async ({ searchParams }: SearchParams) => {
  const path = `/user?${searchParams}`;
  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: AdminUserListResponseType = await response.json();
  return data;
};

export const getAdminUserDetails = async (id: string) => {
  const path = `/user/${id}`;
  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: UserManagementDetailsResponseType = await response.json();
  return data;
};

export const deleteUser = async (id: string | string[] | undefined) => {
  if (!id) return null;

  const path = `/user/${id}`;

  const response = await genericRequest({
    path: path,
    method: "DELETE",
    isAdminPath: true,
  });

  const data: DeleteGenericItemApiResponseType = await response.json();

  return data;
};

export const createUpdateUser = async (
  values: z.infer<typeof userFormSchema> | z.infer<typeof userFormUpdateSchema>,
  id?: string,
) => {
  type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  let path: string;
  let requestMethod: RequestMethod;

  if (id) {
    path = `/user/${id}`;
    requestMethod = "PUT";
  } else {
    path = `/user`;
    requestMethod = "POST";
  }

  const ids =
    Array.isArray(values?.thumbnail) && values?.thumbnail.length > 0
      ? values.thumbnail.map((thumb) => parseInt(thumb.id))
      : [];

  type FormValues = {
    name: string;
    email: string;
    role: string;
    note: string | null | undefined;
    media_id: number[];
    password?: string;
    password_confirmation?: string;
  };

  const formDataMapping: FormValues = {
    name: values?.name,
    email: values.email,
    role: values.role === "閲覧者" ? "Viewer" : "Administrator",
    note: values?.note,
    media_id: ids,
  };

  if (!id || values.password) {
    formDataMapping.password = values.password;
    formDataMapping.password_confirmation = values.confirmPassword;
  }

  const response = await genericRequest({
    path: path,
    method: requestMethod,
    options: {
      body: JSON.stringify(formDataMapping),
    },
    isAdminPath: true,
  });

  const data: UserManagementDetailsResponseType = await response.json();
  return data;
};
