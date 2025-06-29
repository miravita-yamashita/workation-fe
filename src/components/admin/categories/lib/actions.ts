"use server";

import { genericRequest } from "@/lib/generic-action";
import {
  AdminCategoryResponseType,
  AdminSubCategoryListResponseType,
} from "./types";

export const getAdminCategoryList = async () => {
  const path = `/category`;
  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: AdminCategoryResponseType = await response.json();
  return data;
};

export const getAdminSubCategoryList = async ({
  id,
  searchParams,
}: {
  id: string;
  searchParams: string;
}) => {
  const path = `/category/sub?category_id=${id}&${searchParams}`;
  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: AdminSubCategoryListResponseType = await response.json();


  return data;
};
