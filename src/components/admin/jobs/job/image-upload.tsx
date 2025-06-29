"use client";

import { openMediaUploadModalAsync } from "@/components/feature/media-upload/gallery";
import { Button } from "@/components/ui/button";
import imagePlus from "@public/icon-plus-image.svg";
import Image from "next/image";
import { useEffect, useState } from "react";

import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";

type ImageUploadProps<T extends FieldValues> = {
  formHook: UseFormReturn<T>;
  formInputName: Path<T>;
};

const MAX_IMAGES = 5;

export default function ImageUpload<T extends FieldValues>({
  formHook,
  formInputName,
}: ImageUploadProps<T>) {
  const { setValue, getValues } = formHook;
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [uploadedImages, setUploadedImages] = useState<
    { id: string; src: string; selected: boolean }[]
  >([]);

  useEffect(() => {
    if (isInitialLoad) {
      const defaultImages = getValues(formInputName) as
        | { id: number; url: string; custom_attr: string | null }[]
        | undefined;

      if (defaultImages && defaultImages.length > 0) {
        setUploadedImages(
          defaultImages.map((img, index) => ({
            id: String(img.id),
            src: img.url,
            selected: index === 0, // Select the first image by default
          })),
        );

        // Update the form value with full objects (including custom_attr)
        setValue(
          formInputName as Path<T>,
          defaultImages as PathValue<T, Path<T>>,
        );

        setIsInitialLoad(false);
      }
    }
  }, [isInitialLoad, getValues, formInputName, setValue]);

  useEffect(() => {}, [uploadedImages]);

  const handleMediaUpload = async () => {
    const data = await openMediaUploadModalAsync();

    if (data) {
      setUploadedImages((prevImages) => {
        const updatedImages = [
          { id: String(data.id), src: data.url, selected: true },
          ...prevImages.map((img) => ({ ...img, selected: false })),
        ];

        // Extract and update only the IDs
        const updatedIds = updatedImages.map((img) => ({ id: img.id }));

        // Ensure form value is an array of strings
        setValue(formInputName as Path<T>, updatedIds as PathValue<T, Path<T>>);

        return updatedImages;
      });
    }
  };

  const handleRemove = (index: number) => {
    if (index === -1) return; // Prevent errors if index is invalid

    setUploadedImages((prevImages) => {
      const newImages = prevImages.filter((_, i) => i !== index);

      // Automatically select the first image if any remain
      if (newImages.length > 0) {
        newImages[0].selected = true;
      }

      // Extract updated IDs
      const updatedIds = newImages.map((img) => ({ id: img.id }));

      // Update form value
      setValue(formInputName as Path<T>, updatedIds as PathValue<T, Path<T>>);

      return newImages;
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleMediaUpload();
    }
  };

  return (
    <div>
      <div className="relative">
        <div className="relative mb-2 mt-2 h-[11.25rem] w-full bg-gray-200">
          {uploadedImages.length > 0 ? (
            <Image
              className="object-cover"
              src={uploadedImages.find((img) => img.selected)?.src ?? ""}
              fill
              sizes="100%"
              alt="Main Image"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <p>画像が選択されていません</p>
            </div>
          )}
        </div>
        {uploadedImages.length > 0 && (
          <Button
            type="button"
            className="absolute right-2 top-2 h-5 w-12 rounded bg-red-600 text-xs font-bold text-white hover:opacity-90"
            onClick={() =>
              handleRemove(uploadedImages.findIndex((img) => img.selected))
            }
          >
            削除
          </Button>
        )}
      </div>
      <div className="mb-5 flex gap-2">
        {uploadedImages.map((img, index) => (
          <div
            key={index}
            className={
              img.selected
                ? "relative h-8 w-12 cursor-pointer border-2 border-[#357DC9]"
                : "relative h-8 w-12 cursor-pointer"
            }
            onClick={() =>
              setUploadedImages((prevImages) =>
                prevImages.map((image) => ({
                  ...image,
                  selected: image.id === img.id,
                })),
              )
            }
          >
            <Image
              className="object-cover"
              src={img.src}
              fill
              sizes="100%"
              alt="Thumbnail"
            />
          </div>
        ))}
        {uploadedImages.length < MAX_IMAGES && (
          <div
            className="relative h-8 w-12"
            role="button"
            tabIndex={0}
            onClick={handleMediaUpload}
            onKeyDown={handleKeyDown}
          >
            <Image
              className="object-contain"
              src={imagePlus}
              fill
              sizes="100%"
              alt="Upload"
            />
          </div>
        )}
      </div>
    </div>
  );
}
