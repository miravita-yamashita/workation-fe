import { ColumnContainer, ColumnItem } from "./column-component";
import { ImageBlock, ImageItem } from "./image-component";
import IconAboutTitle from "@public/image-about-title.svg";
import IconAboutFigure from "@public/image-about-figure.svg";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import IconCaretWhite from "@public/icon-caret-white.svg";
import { Block, MainBlock } from "./containers";
import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const AboutBlock = ({ className = "" }: CommonProps & {}) => {
  return (
    <MainBlock className={cn("relative mx-4 max-w-full p-0 sm:p-0 lg:mx-0")}>
      <ColumnContainer
        className={cn(
          "relative items-center justify-center py-[2.1875rem] lg:justify-normal lg:px-[3.4375rem] lg:py-12",
          className,
        )}
      >
        <ColumnItem>
          <ImageBlock
            className={cn(
              "left-[-2.0625rem] h-[4.5rem] w-[13.125rem] lg:left-0 lg:h-[7.5rem] lg:w-[21.875rem]",
            )}
          >
            <ImageItem src={IconAboutTitle} altText="icon about title" />
          </ImageBlock>
        </ColumnItem>
        <ColumnItem
          className={cn(
            "absolute left-1/2 top-1/2 translate-x-[5%] translate-y-[-40%] transform lg:left-[360px] lg:top-[-30px] lg:translate-y-0 lg:transform-none",
          )}
        >
          <ImageBlock className="h-[7.1875rem] w-[10rem] lg:h-[13.625rem] lg:w-[17.5625rem]">
            <ImageItem src={IconAboutFigure} altText="icon about figure" />
          </ImageBlock>
        </ColumnItem>

        <Badge className="absolute left-1/2 top-0 max-w-[fit-content] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white px-5 py-[.375rem] font-albertsans text-[.625rem] font-medium uppercase text-coral-300 shadow-none hover:bg-white">
          About
        </Badge>
      </ColumnContainer>

      <ColumnContainer className="flex-col items-center gap-5 pb-10">
        <ColumnItem>
          <Block className="description px-5 font-yugothic text-[.875rem] font-medium lg:px-10">
            この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。
          </Block>
        </ColumnItem>
        <ColumnItem>
          <Link
            href="#"
            className="flex max-w-[fit-content] items-center justify-center gap-[.625rem] rounded-full bg-red-100 px-[3.75rem] py-[.625rem] text-white"
          >
            <Block className="text-xs font-bold">もっと見る</Block>

            <ImageBlock className="h-[.5rem] w-[.5rem]">
              <ImageItem src={IconCaretWhite} altText="icon caret" />
            </ImageBlock>
          </Link>
        </ColumnItem>
      </ColumnContainer>
    </MainBlock>
  );
};
