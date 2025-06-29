"use client";

import { PropsWithChildren } from "react";

import { UserInfo } from "./testimonials-list";
import IconStar from "@public/icon-star-filled.svg";
import { cn } from "@/lib/utils";
import { TopTestimonialsDataType } from "./lib";
import { Title } from "@radix-ui/react-toast";
import {
  ColumnContainer,
  UserPhoto,
  ColumnItem,
  Block,
  ImageBlock,
  ImageItem,
  Body,
} from "../feature/common";
import { ImageSlider } from "../feature/slider/image-slider";

type CommonProps = PropsWithChildren & {
  children?: React.ReactNode;
  className?: string;
};

export const TestimonialDetail = ({
  item,
  className = "",
}: CommonProps & {
  item: TopTestimonialsDataType;
}) => {
  return (
    <ColumnContainer className={cn("flex-col", className)}>
      <UserInfo className="flex items-center gap-[25px]">
        <UserPhoto imgSrc={item?.media?.[0]?.url || ""} />
        <ColumnContainer>
          <ColumnItem>
            <Block className="text-sm font-medium text-shade-900">
              {item?.created_at_list}
            </Block>
            <Block className="text-[20px] font-bold text-black">
              {item?.name}
            </Block>
            <Block className="flex gap-[5px]">
              {Array.from({ length: item?.rating }).map((_, index) => (
                <ImageBlock key={index} className="relative h-5 w-5">
                  <ImageItem src={IconStar} altText="" />
                </ImageBlock>
              ))}
            </Block>
          </ColumnItem>
        </ColumnContainer>
      </UserInfo>
      <Title className="my-[16px] line-clamp-1 text-[20px] font-bold text-coral-300">
        {item?.title}
      </Title>
      <Body className="my-[16px] line-clamp-3 text-base font-medium text-shade-850">
        {item?.body}
      </Body>
      <Block className="w-full">
        <ImageSlider
          slides={item?.media.map((item) => item.url) || []}
          previewImageClassName="lg:h-[500px] h-[236px]"
          thumbnailImageClassName="lg:h-[121px] h-[2.8125rem]"
          className="mx-0 lg:max-w-full"
        />
      </Block>
    </ColumnContainer>
  );
};
