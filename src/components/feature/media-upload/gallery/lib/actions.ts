"use server";

import { genericRequest } from "@/lib/generic-action";
import { DeleteMediaResponseType, GetMediaGalleryResponseType } from "./types";

// #region Get Media Gallery
export const getMediaGallery = async () => {
  const path = `/media`;
  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: GetMediaGalleryResponseType = await response.json();

  return data;
};

// #region Delete Media
export const deleteMedia = async (id: string) => {
  const path = `/media/${id}`;
  const response = await genericRequest({
    path: path,
    method: "DELETE",
    isAdminPath: true,
  });

  const data: DeleteMediaResponseType = await response.json();

  return data;
};
