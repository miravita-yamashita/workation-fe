import { genericRequest } from "@/lib/generic-action";
import { RecentDataResponseType } from "./types";

export const getRecentData = async () => {
  const path = `/dashboard`;
  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: RecentDataResponseType = await response.json();

  return data;
};
