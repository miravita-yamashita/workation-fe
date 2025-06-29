"use server";

import { genericRequest } from "@/lib/generic-action";
import { AdminStaticPageListResponseType } from "./types";

type SearchParams = {
  searchParams: string;
};

export const getAdminStaticPageList = async ({
  searchParams,
}: SearchParams) => {
  const path = `/pages?${searchParams}`;
  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: AdminStaticPageListResponseType = await response.json();
  return data;
};
