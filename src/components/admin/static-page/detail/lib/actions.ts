"use server";

import { genericRequest } from "@/lib/generic-action";
import { AdminStaticPageDetailResponseType } from "./types";

export const getAdminStaticPageDetail = async (id: string) => {
  const path = `/pages/${id}`;
  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: AdminStaticPageDetailResponseType = await response.json();
  return data;
};
