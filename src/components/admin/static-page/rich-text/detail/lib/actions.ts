"use server";

import { genericRequest } from "@/lib/generic-action";
import { GetStaticPageDetailResponseType } from "./types";

export const getStaticPageDetail = async (id: string) => {
  const path = `/pages/${id}`;

  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: GetStaticPageDetailResponseType = await response.json();

  return data;
};
