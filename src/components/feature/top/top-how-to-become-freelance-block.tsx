import { cn } from "@/lib/utils";
import {
  Block,
  ColumnContainer,
  ColumnItem,
  DesktopBlock,
  ImageBlock,
  ImageItem,
  MobileBlock,
} from "../common";

import IconHeart from "@public/icon-heart.svg";
import Icon3StepsLabel from "@public/image-3-steps-label.svg";
import IconBandAid from "@public/icon-bandaid.svg";
import { Badge } from "@/components/ui/badge";
import { PropsWithChildren } from "react";
import { BackgroundCircle, BackgroundTriangle } from "../common/shapes";
import { StepsType } from "@/components/static-page";
import React from "react";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const TopHowToBecomeAFreelance = ({
  className = "",
  steps,
}: CommonProps & {
  steps?: StepsType[];
}) => {
  return (
    <ColumnContainer
      className={cn(
        "relative mx-4 my-10 flex-col bg-white px-[.625rem] py-10 lg:mx-0 lg:py-10 lg:pl-[3.75rem] lg:pr-10",
        className,
      )}
    >
      <ColumnItem>
        <TopHowToBecomeAFreelanceTitle />
      </ColumnItem>
      <ColumnItem>
        <TopHowToBecomeAFreelanceContent items={steps} />
      </ColumnItem>

      <Badge className="absolute left-1/2 top-0 max-w-[fit-content] -translate-x-1/2 -translate-y-1/2 transform whitespace-nowrap rounded-full bg-coral-250 px-5 py-[.375rem] text-center font-albertsans text-[.625rem] font-medium uppercase text-coral-300 shadow-none hover:bg-coral-250 lg:whitespace-normal lg:px-5 lg:py-[.375rem]">
        HOW TO BECOME A FREELANCE NURSE
      </Badge>
    </ColumnContainer>
  );
};

const TopHowToBecomeAFreelanceTitle = () => {
  return (
    <ColumnContainer className="relative flex items-center justify-center text-center">
      <ImageBlock className="left-[1.3125rem] h-[2rem] w-[3.4375rem] scale-[1.3] transform self-end lg:left-0 lg:h-[4.0625rem] lg:w-[6.9375rem]">
        <ImageItem src={IconHeart} altText="icon test tube" />
      </ImageBlock>

      <Block className="flex flex-col items-center justify-center font-bold">
        <span className="block whitespace-nowrap text-sm text-black lg:whitespace-normal lg:text-[1.25rem]">
          バケーションナースで転職する方法
        </span>
        <ImageBlock className="h-[3.375rem] w-[12.125rem] lg:h-[5.625rem] lg:w-[18.8125rem]">
          <ImageItem src={Icon3StepsLabel} altText="icon test tube" />
        </ImageBlock>
      </Block>

      <ImageBlock className="right-[1.3125rem] h-[2.375rem] w-[3.4375rem] self-end lg:right-0 lg:h-[4.9375rem] lg:w-[7.125rem]">
        <ImageItem src={IconBandAid} altText="icon test tube" />
      </ImageBlock>
    </ColumnContainer>
  );
};

const TopHowToBecomeAFreelanceContent = ({
  items,
}: CommonProps & {
  items?: StepsType[];
}) => {
  return (
    <ColumnContainer className="flex-col items-center gap-[.625rem] pt-5">
      {items?.map((item, index) => (
        <React.Fragment key={index}>
          <ColumnItem className="relative w-full bg-yellow-500 px-5 py-5 lg:px-5 lg:py-[1.875rem] lg:pl-[3.75rem] lg:pr-[2.5rem]">
            <DesktopBlock>
              <BackgroundCircle
                title="step"
                content={`0${index + 1}`.slice(-2)}
                className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
              />
            </DesktopBlock>
            <Block className="flex items-center gap-5 font-bold">
              <MobileBlock>
                <BackgroundCircle title="step" content={`0${index + 1}`} />
              </MobileBlock>
              <span className="text-lg lg:text-[1.25rem]">
                {item?.header_title}
              </span>
            </Block>
            <Block className="mt-[.625rem] text-sm text-shade-800">
              {item?.content}
            </Block>
          </ColumnItem>
          <BackgroundTriangle />
        </React.Fragment>
      ))}
    </ColumnContainer>
  );
};
