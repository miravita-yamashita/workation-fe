import { genericRequest } from "@/lib/generic-action";
import { GetFAQCategoryResponseType } from "./types";

export const getFAQCategory = async () => {
  const path = `/question/faq-category`;

  const response = await genericRequest({
    path: path,
    method: "GET",
  });

  const data: GetFAQCategoryResponseType = await response.json();

  return data;
};
