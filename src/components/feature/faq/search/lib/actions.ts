import { genericRequest } from "@/lib/generic-action";
import {
  FAQSearchResponseType,
  PopularSearchKeywordsResponseType,
} from "./types";

export const searchFAQ = async (searchParams: string) => {
  const path = `/question?${searchParams}`;

  const response = await genericRequest({
    path: path,
    method: "GET",
  });

  const data: FAQSearchResponseType = await response.json();

  return data;
};

export const getPopularSearchKeywords = async () => {
  const path = `/category/item?filter[name]=question`;
  const response = await genericRequest({
    path: path,
    method: "GET",
  });
  const data: PopularSearchKeywordsResponseType = await response.json();
  return data;
};
