"use client";

import { openMediaUploadModalAsync } from "@/components/feature/media-upload/gallery";
import { Button } from "@/components/ui/button";
import imagePlus from "@public/placeholder/plus-frame.png";
import Image from "next/image";
import { UseFormReturn } from "react-hook-form";

interface ThumbnailUploadProps {
  // eslint-disable-next-line
  formHook: UseFormReturn<any>;
  formInputName: string;
}

export default function ThumbnailUpload({
  formHook,
  formInputName,
}: ThumbnailUploadProps) {
  const {
    setValue,
    getValues, // Get initial value
    watch, // Watch for changes
  } = formHook;

  // Get the current value of the input during initialization
  const initialImages = getValues(formInputName) || [];
  // Watch for changes in the field value
  const images = watch(formInputName, initialImages) || [];
  const cleanedImages = Array.isArray(images) ? images.filter(Boolean) : [];
  // Check if there are default values
  const hasDefaultValue = cleanedImages.length > 0;

  // Handle image upload
  const handleMediaUpload = async () => {
    const data = await openMediaUploadModalAsync();
    if (data) {
      const newImage = { id: String(data.id), url: data.url };
      setValue(formInputName, [newImage]); // Ensure only one image is stored
    }
  };

  // Remove uploaded image
  const handleRemove = () => {
    setValue(formInputName, []); // Remove image
  };

  return (
    <div>
      {/* If an image is uploaded, display it */}
      {hasDefaultValue ? (
        <div key={images[0]?.id}>
          <div className="relative mb-3 h-[9.6875rem] w-full bg-gray-200">
            <Image
              className="object-cover"
              src={images[0]?.url || imagePlus}
              fill
              sizes="100%"
              alt="Uploaded Image"
            />
            <Button
              type="button"
              className="absolute right-2 top-2 h-5 w-12 rounded bg-red-600 text-xs font-bold text-white hover:opacity-90"
              onClick={handleRemove}
            >
              削除
            </Button>
          </div>
        </div>
      ) : (
        // Display the image plus icon if no image is uploaded
        <div
          className="mb-4 cursor-pointer"
          role="button"
          tabIndex={0}
          onClick={handleMediaUpload}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              handleMediaUpload();
            }
          }}
        >
          <div className="relative h-[9.6875rem] w-full bg-gray-200">
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
