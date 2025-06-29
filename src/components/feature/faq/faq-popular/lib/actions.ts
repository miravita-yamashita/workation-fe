"use server";

import { genericRequest } from "@/lib/generic-action";
import {
  FAQPopularByGroupResponseType,
  FAQPopularClickResponseType,
} from "./types";

export const getFAQPopularFAQByGroup = async () => {
  const path = `/question/viewed`;

  const response = await genericRequest({
    path: path,
    method: "GET",
  });

  const data: FAQPopularByGroupResponseType = await response.json();

  return data;
};

export const clickPopularFAQ = async (faqId: string) => {
  const path = `/question/viewed?question_id=${faqId}`;

  const response = await genericRequest({
    path: path,
    method: "POST",
  });

  const data: FAQPopularClickResponseType = await response.json();

  return data;
};
