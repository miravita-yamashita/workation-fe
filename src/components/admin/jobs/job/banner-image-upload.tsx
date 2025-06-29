"use client";

import { SectionHeading } from "@/components/feature/common/section-heading";
import { openMediaUploadModalAsync } from "@/components/feature/media-upload/gallery";
import { Button } from "@/components/ui/button";
import imagePlus from "@public/icon-imagePlusBg.svg";
import Image from "next/image";
import { Controller, UseFormReturn } from "react-hook-form";

const MAX_IMAGES = 3;

interface BannerImageUploadProps {
  // eslint-disable-next-line
  formHook: UseFormReturn<any>;
  formInputName: string;
}

export default function BannerImageUpload({
  formHook,
  formInputName,
}: BannerImageUploadProps) {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = formHook;
  const images = watch(formInputName, []) || [];

  // Logs current form value after each image selection
  const handleMediaUpload = async () => {
    const data = await openMediaUploadModalAsync();
    if (data) {
      const newImage = { id: String(data.id), url: data.url, custom_attr: "" };
      const updatedImages = [...images, newImage];

      setValue(formInputName, updatedImages);
    }
  };

  // Logs updated value after removing an image
  const handleRemove = (index: number) => {
    const updatedImages = images.filter(
      (_: { id: string; url: string; custom_attr: string }, i: number) =>
        i !== index,
    );
    setValue(formInputName, updatedImages);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleMediaUpload();
    }
  };

  return (
    <div>
      {images.map(
        (
          image: { id: string; url: string; custom_attr: string },
          index: number,
        ) => {
          const fieldError =
            Array.isArray(errors[formInputName]) &&
            errors[formInputName][index]?.custom_attr;

          return (
            <div key={image.id || index}>
              {/* Image Display */}
              <div className="relative mb-3 h-[6.25rem] w-full bg-gray-200">
                <Image
                  className="object-cover"
                  src={image.url}
                  fill
                  sizes="100%"
                  alt={`Image ${index + 1}`}
                />
                <Button
                  type="button"
                  className="absolute right-2 top-2 h-5 w-12 rounded bg-red-600 text-xs font-bold text-white hover:opacity-90"
                  onClick={() => handleRemove(index)}
                >
                  削除
                </Button>
              </div>

              {/* Banner link input for each image */}
              <SectionHeading title={`リンク`} />
              <Controller
                name={`${formInputName}[${index}].custom_attr`}
                control={control}
                defaultValue={image.custom_attr || ""}
                render={({ field }) => (
                  <div className="mb-3 mt-2">
                    <input
                      type="text"
                      {...field}
                      placeholder="Enter banner link"
                      className="w-full rounded border border-gray-300 p-2"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                    {fieldError && (
                      <p className="mt-2 text-sm font-normal leading-normal text-red-300">
                        {fieldError.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          );
        },
      )}

      {/* Show additional upload section if max images is not reached */}
      {images.length < MAX_IMAGES && (
        <div
          className="mb-4 cursor-pointer"
          role="button"
          tabIndex={0}
          onClick={handleMediaUpload}
          onKeyDown={handleKeyDown}
        >
          <div className="relative h-[6.25rem] w-full bg-gray-200">
            <Image
              className="object-contain"
              src={imagePlus}
              fill
              sizes="100%"
              alt="Upload"
            />
          </div>
        </div>
      )}
    </div>
  );
}
