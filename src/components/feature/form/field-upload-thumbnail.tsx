"use client";

import { Button } from "@/components/ui/button";
import { openMediaUploadModalAsync } from "../media-upload/gallery";
import ImageNoPhoto from "@public/image-no-photo.jpg";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import Image from "next/image";

type ImageUploadProps<T extends FieldValues> = {
  formHook: UseFormReturn<T>;
  formInputName: Path<T>;
  formInputNameBanner?: Path<T>; // This used to store the thumbnail url in case of dynamic banners
  mediaImgSrc?: string;
  className?: string;
  errorMessage?: string;
};

export const FieldUploadThumbnail = <T extends FieldValues>({
  formHook,
  formInputName,
  mediaImgSrc,
  className = "",
  errorMessage = "",
  formInputNameBanner,
}: ImageUploadProps<T>) => {
  const [imageSource, setImageSource] = useState<string | null>(
    mediaImgSrc || null,
  );

  const handleMediaUpload = async () => {
    const data = await openMediaUploadModalAsync();
    if (data) {
      setImageSource(data?.url);

      formHook.setValue(formInputName, data?.id as PathValue<T, Path<T>>);

      if (formInputNameBanner) {
        formHook.setValue(
          formInputNameBanner,
          data?.url as PathValue<T, Path<T>>,
        );
      }
    }
  };

  const handleDeleteUploadedImage = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation(); // Prevents the parent div's onClick from being triggered
    setImageSource(null);
    formHook.setValue(formInputName, "" as PathValue<T, Path<T>>);
    if (formInputNameBanner) {
      formHook.setValue(formInputNameBanner, "" as PathValue<T, Path<T>>);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleMediaUpload();
    }
  };

  return (
    <>
      <div
        className={cn(
          "relative h-[9.6875rem] w-[16.875rem] cursor-pointer rounded-none border border-blue-350 text-blue-350 hover:bg-transparent",
          className,
        )}
        role="button"
        tabIndex={0}
        onClick={handleMediaUpload}
        onKeyDown={handleKeyDown}
      >
        <Image
          className="absolute object-cover"
          layout="fill"
          src={imageSource || ImageNoPhoto.src}
          alt="thumbnail"
        />
        <span className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
          +
        </span>

        {imageSource && (
          <Button
            className="absolute right-2 top-2 z-20 rounded bg-red-300 text-xs font-bold text-white hover:bg-red-300"
            type="button"
            onClick={handleDeleteUploadedImage}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault(); // Prevent triggering the parent div's click
                handleDeleteUploadedImage(event); // Handle the delete button action
              }
            }}
          >
            削除
          </Button>
        )}
      </div>
      {errorMessage && (
        <p className="text-sm font-normal leading-normal text-red-300">
          {errorMessage}
        </p>
      )}
    </>
  );
};
