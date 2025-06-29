import { genericRequest } from "@/lib/generic-action";
import { AdminJobListResponseType } from "./types";

type SearchParams = {
  searchParams: string;
};

export const getAdminJobList = async ({ searchParams }: SearchParams) => {
  const path = `/job?${searchParams}`;
  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: AdminJobListResponseType = await response.json();
  return data;
};
