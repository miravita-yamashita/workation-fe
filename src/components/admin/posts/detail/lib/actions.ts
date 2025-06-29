"use server";

import { genericRequest } from "@/lib/generic-action";
import { GetPostDetailResponseType } from "./types";

export const getPostDetail = async (id: string) => {
  const path = `/article/${id}`;
  const response = await genericRequest({
    path: path,
    method: "PATCH",
    isAdminPath: true,
  });

  const data: GetPostDetailResponseType = await response.json();

  return data;
}