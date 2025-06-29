import { genericRequest } from "@/lib/generic-action";
import { ContentResponseType } from "./types";

export const getFirstTimeUserContent = async () => {
  const path = `/content?first_time_user_flg=1`;
  const response = await genericRequest({
    path: path,
    method: "GET",
  });

  const data: ContentResponseType = await response.json();
  return data;
};
