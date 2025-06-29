"use server";

import { cookies } from "next/headers";
import { COOKIE_VISITED } from "./types";

export const setVisitedCookie = async () => {
  const cookieStore = await cookies();
  const hasVisited = await getVisitedCookie();

  if (!hasVisited) {
    cookieStore.set(COOKIE_VISITED, "true");
  }
};

export const getVisitedCookie = async () => {
  const cookieStore = await cookies();

  return cookieStore.get(COOKIE_VISITED)?.value;
};
