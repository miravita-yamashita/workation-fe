"use client";

import { useState } from "react";
import sampleImage from "@public/image-no-photo.jpg";
import Image from "next/image";
import { Featured } from "./lib";

type imageType = {
  jobDetailImages: Featured[];
};

const ImagesSelectable = ({ jobDetailImages }: imageType) => {
  // State to track selected image
  const [selectedImage, setSelectedImage] = useState(
    jobDetailImages?.[0].url || sampleImage,
  );

  return (
    <>
      {/* Main Image */}
      <div className="relative mb-2 mt-2 h-[11.25rem] w-full bg-gray-200">
        <Image
          className="object-cover"
          src={selectedImage}
          fill
          sizes="100%"
          alt="Main Image"
        />
      </div>

      {/* Image Thumbnails */}
      {jobDetailImages && jobDetailImages.length > 0 ? (
        <div className="mb-5 flex gap-2">
          {jobDetailImages.map((media: Featured, index: number) => (
            <div
              key={index}
              className={`relative h-8 w-12 cursor-pointer border-2 ${
                selectedImage === media.url
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
              onClick={() => setSelectedImage(media.url)}
            >
              <Image
                className="object-cover"
                src={media.url || sampleImage}
                fill
                sizes="100%"
                alt="Thumbnail"
              />
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default ImagesSelectable;
