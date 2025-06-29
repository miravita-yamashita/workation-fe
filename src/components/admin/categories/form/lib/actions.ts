"use server";

import { genericRequest } from "@/lib/generic-action";
import { UpdateSubCategoryResponseType } from "./types";
import { z } from "zod";
import { subCategoryFormSchema } from "./form-schema";

export const createSubCategory = async (
  values: z.infer<typeof subCategoryFormSchema> & {
    parentCategoryId: string;
  },
) => {
  const path = `/category/sub`;

  const payload = {
    category_id: values.parentCategoryId,
    name: values.subCategoryName,
    status: values.status,
    sub_category_items: values.subCategoryItems.filter(
      (item) => item.name.trim() !== "",
    ),
    type: "Check",
  };

  const response = await genericRequest({
    path: path,
    method: "POST",
    isAdminPath: true,
    options: {
      body: JSON.stringify(payload),
    },
  });

  const data: UpdateSubCategoryResponseType = await response.json();

  return data;
};

export const updateSubCategoryDetail = async (
  values: z.infer<typeof subCategoryFormSchema> & {
    parentCategoryId: string;
  },
) => {
  const path = `/category/sub/${values.id}`;

  const payload = {
    category_id: values.parentCategoryId,
    name: values.subCategoryName,
    status: values.status,
    sub_category_items: values.subCategoryItems.filter(
      (item) => item.name.trim() !== "",
    ),
    type: "Check",
  };

  const response = await genericRequest({
    path: path,
    method: "PUT",
    isAdminPath: true,
    options: {
      body: JSON.stringify(payload),
    },
  });

  const data: UpdateSubCategoryResponseType = await response.json();


  return data;
};
