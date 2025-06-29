"use server";

import { genericRequest } from "@/lib/generic-action";
import { GetCompanyProfileResponseType } from "./types";

export const getCompanyProfileDetail = async (id: string) => {
  const path = `/pages/${id}`;
  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: GetCompanyProfileResponseType = await response.json();
  return data;
};
