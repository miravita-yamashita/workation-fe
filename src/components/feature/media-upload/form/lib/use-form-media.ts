"use client";

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { updateMediaFormSchema } from "./form-schema";
import {
  MediaImageType,
  setSelectedMediaSingle,
  toggleEditMode,
  toggleIsLoading,
  updateMediaItem,
} from "@components/feature/media-upload/gallery";
import { useEffect, useRef } from "react";
import { genericAPICallHandler } from "@/lib/utils";
import { updateMedia } from "./actions";
import { toast } from "@/hooks/use-toast";

export const useMediaUpload = ({
  form,
  selectedMedia,
}: {
  form: UseFormReturn<z.infer<typeof updateMediaFormSchema>>;
  selectedMedia: MediaImageType | null;
}) => {
  const formRef = useRef(form);

  const onSubmit = async (values: z.infer<typeof updateMediaFormSchema>) => {
    if (!selectedMedia) {
      throw new Error("No media selected");
    }
    toggleIsLoading(true);
    const response = await genericAPICallHandler(() =>
      updateMedia(String(selectedMedia.id), values),
    );
    toggleIsLoading(false);

    if (response?.success) {
      toast({
        description: response.message,
      });

      const updatedMedia: MediaImageType = {
        ...selectedMedia,
        custom_attr: {
          title: values.title,
          caption: values.caption,
          alt: values.altText,
        },
      };

      // Do some logic after saving
      updateMediaItem(updatedMedia);
      setSelectedMediaSingle(updatedMedia);
      toggleEditMode(false);

      return;
    }

    toast({
      description: response.message,
    });
  };

  // Handle selected change and assign them to the form
  useEffect(() => {
    formRef.current.setValue("url", selectedMedia?.url || "");
    formRef.current.setValue("title", selectedMedia?.custom_attr?.title || "");
    formRef.current.setValue(
      "caption",
      selectedMedia?.custom_attr?.caption || "",
    );
    formRef.current.setValue("altText", selectedMedia?.custom_attr?.alt || "");
  }, [selectedMedia]);

  return {
    onSubmit,
  };
};
