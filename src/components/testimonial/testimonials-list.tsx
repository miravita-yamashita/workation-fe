"use client";

import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import IconStar from "@public/icon-star-filled.svg";
import { TopTestimonialsDataType } from "./lib";
import Link from "next/link";
import { Title } from "@radix-ui/react-toast";
import {
  ColumnContainer,
  ColumnItem,
  Block,
  ImageBlock,
  ImageItem,
  Body,
} from "../feature/common";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const TestimonialsList = ({
  className = "",
  items = [],
}: CommonProps & {
  items: TopTestimonialsDataType[];
}) => {
  return (
    <ColumnContainer
      className={cn(
        "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mb-10 lg:mt-5 lg:grid-cols-3",
        className,
      )}
    >
      <TestimonialsListItems items={items} />
    </ColumnContainer>
  );
};

const TestimonialsListItems = ({
  items = [],
}: CommonProps & { items: TopTestimonialsDataType[] }) => {
  return (
    <>
      {items?.map((item, index) => (
        <Link href={`/testimonial/${item?.id}`} key={index}>
          <ColumnItem className="rounded bg-white px-5 py-[1.875rem]">
            <UserInfo className="flex items-center gap-[1.5625rem]">
              {/* As per request, the user photo is hidden for now - if confirmed not needed, remove code entirely*/}
              {/* <UserPhoto
                imgSrc=""
                className="duration-400 transform transition-transform ease-in-out hover:scale-110"
              /> */}
              <ColumnContainer>
                <ColumnItem>
                  <Block className="text-sm font-medium text-shade-900">
                    {item?.date_submitted_formatted}
                  </Block>
                  <Block className="text-[1.25rem] font-bold text-black">
                    {item?.name}
                  </Block>
                  <Block className="flex gap-[.3125rem]">
                    {Array.from({ length: item?.rating }).map((_, index) => (
                      <ImageBlock key={index} className="relative h-5 w-5">
                        <ImageItem src={IconStar} altText="" />
                      </ImageBlock>
                    ))}
                  </Block>
                </ColumnItem>
              </ColumnContainer>
            </UserInfo>
            <Title className="my-[1rem] line-clamp-1 text-[1.25rem] font-bold text-coral-300">
              {item?.title}
            </Title>
            <Body className="my-[1rem] line-clamp-3 text-base font-medium text-shade-850">
              {item?.body}
            </Body>
          </ColumnItem>
        </Link>
      ))}
    </>
  );
};

export const UserInfo = ({ children, className }: CommonProps) => {
  return <div className={cn(className)}>{children}</div>;
};
