"use client";

import { useState } from "react";
import {
  deleteMedia,
  removeDeletedMediaItemFromGallery,
  resetSelectedMediaSingle,
  toggleIsLoading,
} from "@components/feature/media-upload/gallery";
import { genericAPICallHandler } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

export const useMediaDetail = () => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteMediaItem = async (id: string) => {
    setIsLoading(true);
    toggleIsLoading(true);

    const response = await genericAPICallHandler(() => deleteMedia(id));

    setIsLoading(false);
    toggleIsLoading(false);

    if (response?.success) {
      removeDeletedMediaItemFromGallery(id);
      resetSelectedMediaSingle();

      toast({
        description: response.message,
      });
      return;
    }

    toast({
      description: response.message,
    });
  };

  return {
    isLoading,
    deleteMediaItem,
  };
};
