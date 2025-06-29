"use client";

import { BannerType } from "@/components/about";
import { useEffect, useState } from "react";
import { ImageBlock, ImageItem } from "../common";

type imageType = {
  images: BannerType[];
};

export const AttractionAnimation = ({ images }: imageType) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images?.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [images?.length]);

  const getClass = (index: number) => {
    if (index === activeIndex) return "show";
    if (index === (activeIndex + 1) % images.length) return "hide1";
    return "hide2";
  };

  return (
    <div className="img-animation imgWrapper h-[14.9375rem] w-[10.3125rem] md:w-auto">
      {images.map((image, index) => (
        <div
          key={`${image.id}-${index}`}
          className={`imageContainer ${getClass(index)}`}
        >
          <ImageBlock className="relative mx-auto mb-[1.25rem] h-[13.75rem] w-[10.3125rem]">
            <ImageItem
              src={image.url}
              altText="article page image"
              className="object-cover"
            />
          </ImageBlock>
        </div>
      ))}
    </div>
  );
};
