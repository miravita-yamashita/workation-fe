"use client";

import { FormEvent, useRef, useState } from "react";
import { genericAPICallHandler } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { uploadMedia } from "@components/feature/media-upload/form/lib/actions";

export const useMediaDropzone = ({
  fetchMedia,
  setAcceptedFiles,
}: {
  fetchMedia: () => void;
  setAcceptedFiles: React.Dispatch<React.SetStateAction<File[]>>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const formDropzoneRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formDataToSubmit = new FormData();
    let fileIndexCount = 0;

    for (const [, value] of formData.entries()) {
      if (value instanceof File) {
        formDataToSubmit.append(`file[${fileIndexCount}]`, value);
        fileIndexCount++;
      }
    }

    setIsLoading(true);
    const response = await genericAPICallHandler(() =>
      uploadMedia(formDataToSubmit),
    );
    setIsLoading(false);

    if (response?.success) {
      // Do some logic after saving
      // Clear the dropzone
      setAcceptedFiles([]);
      // We need to fetch again the media - BE does not return data
      fetchMedia();
      // Reset the form

      return;
    }

    toast({
      title: "Error",
      description: response.message,
    });
  };

  return { handleSubmit, formDropzoneRef, isLoading };
};
