"use server";

import { genericRequest } from "@/lib/generic-action";
import { GetSubCategoryResponseType } from "./types";
export const getSubCategoryDetail = async (subCategoryId: string) => {
  const path = `/category/sub/items/detail?sub_category_id=${subCategoryId}`;

  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: GetSubCategoryResponseType = await response.json();

  return data;
};
