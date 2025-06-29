"use server";

import { cookies } from "next/headers";
import { COOKIE_PUBLIC_TOKEN, PublicTokenResponseType } from "./types";
import { genericRequest } from "@/lib/generic-action";

export const setPublicToken = async () => {
  const cookieStore = await cookies();
  const hasPublicToken = await getPublicTokenCookie();

  if (!hasPublicToken) {
    try {
      const response = await getPublicToken();
      cookieStore.set(COOKIE_PUBLIC_TOKEN, response.data?.access_token, {
        maxAge: 365 * 24 * 60 * 60,
      }); // up to 1 year;
    } catch (error) {
      console.error("getPublicToken error :", error);
    }
  }
};

export const getPublicTokenCookie = async () => {
  const cookieStore = await cookies();

  return cookieStore.get(COOKIE_PUBLIC_TOKEN)?.value;
};

export const getPublicToken = async () => {
  const response = await genericRequest({
    method: "POST",
    path: "/user/public",
  });

  const data: PublicTokenResponseType = await response.json();

  return data;
};
