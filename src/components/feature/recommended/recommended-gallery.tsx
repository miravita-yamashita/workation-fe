"use client";

import sampleImage from "@public/placeholder/recommended.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { useState } from "react";
import { ImageBlock, ImageItem } from "../common";

interface Props {
  jobGallery: string[];
}

export const RecommendedGallery = ({ jobGallery }: Props) => {
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
    <div className="job-gallery mx-auto max-w-[19.6875rem] lg:max-w-none">
      {/* Main Slider */}
      <div className="pb-[.5625rem]">
        <Slider
          {...mainSliderSettings}
          ref={(slider) => setMainSlider(slider ?? undefined)} // Provide undefined fallback
          className="job-recommended-slider"
        >
          {jobGallery?.map((imgItem, index) => (
            <ImageBlock
              key={index}
              className="relative h-[14.75rem] w-full lg:h-[15.625vw]"
            >
              <ImageItem
                src={imgItem}
                altText="job image"
                className="object-cover"
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
          {jobGallery?.map((imgItem, index) => (
            <ImageBlock
              key={`thumbnail-${index}`}
              className="relative h-[2.875rem] w-[95%] cursor-pointer lg:h-[2.813vw]"
            >
              <ImageItem
                src={
                  index === 2
                    ? sampleImage.src
                    : index === 4
                      ? sampleImage.src
                      : imgItem
                }
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
