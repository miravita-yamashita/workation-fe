"use server";

import { genericRequest } from "@/lib/generic-action";
import { GetStaticPageResponseType } from "./types";

export const getStaticPageBySlug = async (slug: string) => {
  const path = `/page/${slug}`;

  const response = await genericRequest({
    path: path,
    method: "GET",
  });

  const data: GetStaticPageResponseType = await response.json();
  return data;
};
