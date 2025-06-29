"use client";

import { useEffect, useState } from "react";
import { getMediaGallery } from "./actions";
import { genericAPICallHandler } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { MediaImageType } from "./types";
import { setMediaGallery, useModalMediaUploadStore } from "./store";

export const useMediaUpload = () => {
  const [mediaFetchLoading, setMediaFetchLoading] = useState(false);
  const [media, setMedia] = useState<MediaImageType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const formRef = useModalMediaUploadStore.getState().formRef;
  const [selectedMedia, setSelectedMedia] = useState<MediaImageType | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);

  const fetchMedia = async () => {
    setMediaFetchLoading(true);

    const response = await genericAPICallHandler(() => getMediaGallery());

    setMediaFetchLoading(false);

    if (response.success) {
      setMediaGallery(response?.data ?? []);
      return;
    }

    toast({
      description: response.message,
    });
  };

  // Handle fetch for media gallery items
  useEffect(() => {
    fetchMedia();
  }, []);

  // Handle Modal store changes
  useEffect(() => {
    const unSub = useModalMediaUploadStore.subscribe(
      (state) => state.isOpen,
      (isOpen) => {
        setIsOpen(isOpen);
      },
    );

    return unSub;
  }, []);

  // Handle when gallery store is updated
  useEffect(() => {
    const unSub = useModalMediaUploadStore.subscribe(
      (state) => state.media,
      (media) => {
        setMedia(media);
      },
    );

    return unSub;
  }, []);

  // Handle edit mode changes
  useEffect(() => {
    const unSub = useModalMediaUploadStore.subscribe(
      (state) => state.isEditMode,
      (isEditMode) => {
        setIsEditMode(isEditMode);
      },
    );

    return unSub;
  }, []);

  // Handle getting selected media info
  useEffect(() => {
    const unsubscribe = useModalMediaUploadStore.subscribe(
      (state) => state.selectedMediaSingle,
      (selectedMediaSingle) => {
        setSelectedMedia(selectedMediaSingle);
      },
    );

    return unsubscribe;
  }, []);

  // Handle store loading state change
  useEffect(() => {
    const unsubscribe = useModalMediaUploadStore.subscribe(
      (state) => state.isLoading,
      (isLoading) => {
        setIsLoading(isLoading);
      },
    );

    return unsubscribe;
  }, []);

  return {
    media,
    mediaFetchLoading,
    isOpen,
    isEditMode,
    formRef,
    selectedMedia,
    isLoading,
    fetchMedia,
  };
};
