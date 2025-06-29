"use client";

import ImageNoPhoto from "@public/image-no-photo.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { PropsWithChildren, useState } from "react";
import { ImageBlock, ImageItem } from "../common";
import { cn } from "@/lib/utils";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const ImageSlider = ({
  slides,
  className = "",
  previewImageClassName = "",
  thumbnailImageClassName = "",
}: CommonProps & {
  slides: string[];
  previewImageClassName?: string;
  thumbnailImageClassName?: string;
}) => {
  const [mainSlider, setMainSlider] = useState<Slider | undefined>(undefined);
  const [thumbnailSlider, setThumbnailSlider] = useState<Slider | undefined>(
    undefined,
  );

  // Main slider settings
  const mainSliderSettings = {
    dots: false,
    arrows: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    autoplay: false,
    autoplaySpeed: 3000,
    asNavFor: thumbnailSlider, // Ensure correct type
  };

  // Thumbnail slider settings
  const thumbnailSliderSettings = {
    dots: false,
    arrows: false,
    infinite: false,
    slidesToShow: 5,
    focusOnSelect: true,
    asNavFor: mainSlider, // Ensure correct type
    centerMode: false,
    centerPadding: "20px",
    swipe: false,
    draggable: false,
    speed: 0,
  };

  return (
    <div className={cn("job-gallery mx-auto lg:max-w-[19.6875rem]", className)}>
      {/* Main Slider */}
      <div className="pb-[.5625rem]">
        <Slider
          {...mainSliderSettings}
          ref={(slider) => setMainSlider(slider ?? undefined)}
          className="gallery-slider"
        >
          {slides?.map((imgItem, index) => (
            <ImageBlock
              key={index}
              className={cn("relative h-full w-full", previewImageClassName)}
            >
              <ImageItem
                src={imgItem}
                altText="image slider image"
                className="object-contain lg:object-cover"
              />
            </ImageBlock>
          ))}
        </Slider>
      </div>

      {/* Thumbnail Slider */}
      <div className="slider-thumbnail-nav">
        <Slider
          {...thumbnailSliderSettings}
          ref={(slider) => setThumbnailSlider(slider ?? undefined)} // Provide undefined fallback
        >
          {slides?.map((imgItem, index) => (
            <ImageBlock
              key={`thumbnail-${index}`}
              className={cn(
                "relative w-[91%] cursor-pointer lg:h-auto",
                thumbnailImageClassName,
              )}
            >
              <ImageItem
                src={imgItem ?? ImageNoPhoto.src}
                altText="thumbnail image"
                className="object-cover"
              />
            </ImageBlock>
          ))}
        </Slider>
      </div>
    </div>
  );
};
