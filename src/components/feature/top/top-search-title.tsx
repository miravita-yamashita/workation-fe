import IconTestTube from "@public/icon-test-tube.svg";
import IconStethoscope from "@public/icon-stethoscope.svg";
import IconScissor from "@public/icon-scissor.svg";
import { Block, ColumnContainer, ImageBlock, ImageItem } from "../common";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const TopSearchTitle = ({ className = "" }: CommonProps) => {
  return (
    <ColumnContainer
      className={cn(
        "relative flex items-center justify-center gap-2 text-center lg:gap-4",
        className,
      )}
    >
      <ImageBlock className="h-[2.0625rem] w-[.9375rem] self-end lg:h-[4.375rem] lg:w-[2rem]">
        <ImageItem src={IconTestTube} altText="icon test tube" />
      </ImageBlock>

      <ImageBlock className="h-[2.6875rem] w-[1.9375rem] self-start lg:h-[5.625rem] lg:w-[4.0625rem]">
        <ImageItem src={IconScissor} altText="icon test tube" />
      </ImageBlock>

      <Block className="flex flex-col font-bold">
        <span className="block text-sm text-coral-300 lg:text-[1.625rem]">
          バケーションナース <span className="text-black">の</span>
        </span>
        <span className="block text-[1.25rem] text-black lg:text-[2.5rem]">
          求人を探しましょう
        </span>
      </Block>

      <ImageBlock className="h-[3.75rem] w-[4.3125rem] lg:h-[7.5rem] lg:w-[8.625rem]">
        <ImageItem src={IconStethoscope} altText="icon test tube" />
      </ImageBlock>
    </ColumnContainer>
  );
};
