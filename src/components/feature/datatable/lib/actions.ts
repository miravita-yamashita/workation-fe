"use server";

import { genericRequest } from "@/lib/generic-action";
import {
  AdminAreaNameListResponseType,
  DeleteGenericItemApiResponseType,
} from "./types";

export const genericDeleteItemsList = async (
  ids: string[] | number[],
  endpoint: string,
) => {
  const path = `${endpoint}`;
  const response = await genericRequest({
    path: path,
    method: "POST",
    isAdminPath: true,
    options: {
      body: JSON.stringify({ position_ids: ids }),
    },
  });

  const data: DeleteGenericItemApiResponseType = await response.json();
  return data;
};

export const genericDeleteItem = async (
  id: string | number,
  endpoint: string,
) => {
  const path = `/${endpoint}/${id}`;
  const response = await genericRequest({
    path: path,
    method: "DELETE",
    isAdminPath: true,
    options: {
      body: JSON.stringify({ position_ids: id }),
    },
  });

  const data: DeleteGenericItemApiResponseType = await response.json();
  return data;
};

export const getAdminAreaNameList = async () => {
  const path = `/prefecture`;
  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: AdminAreaNameListResponseType = await response.json();
  return data;
};
