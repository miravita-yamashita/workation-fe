import { cn } from "@/lib/utils";
import {
  BackgroundContainer,
  Block,
  ColumnContainer,
  ColumnItem,
  DiagonalLine,
  ImageBlock,
  ImageItem,
} from "../common";
import { PropsWithChildren } from "react";
import Link from "next/link";
import IconLine from "@public/icon-line-info-logo.svg";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const TopCustomerSupport = ({ className = "" }: CommonProps) => {
  return (
    <ColumnContainer
      className={cn("mx-4 flex-col bg-white lg:mx-0", className)}
    >
      <ColumnItem>
        <CustomerSupportTitle />
      </ColumnItem>
      <ColumnItem>
        <CustomerSupportContent />
      </ColumnItem>
    </ColumnContainer>
  );
};

const CustomerSupportTitle = () => {
  return (
    <Block className="rounded-t-lg bg-coral-250 px-5 py-[10px] text-base font-bold text-coral-300">
      お客様サポート
    </Block>
  );
};

const CustomerSupportContent = () => {
  return (
    <ColumnContainer className="flex-col items-center">
      <ColumnItem className="px-5 py-5 text-xs font-medium">
        {/* NOTE: hide as per instruction from client */}
        {/* この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。 */}
      </ColumnItem>
      <BackgroundContainer className="w-full bg-green-150 py-5">
        <ColumnItem className="flex w-full items-center justify-center">
          <DiagonalLine className="rotate-[60deg]" />
          <Block className="text-base font-bold">LINE相談 受付中</Block>
          <DiagonalLine className="rotate-[-60deg]" />
        </ColumnItem>
        <ColumnItem className="my-2 flex w-full items-center justify-center">
          <Link
            href="https://line.me/R/ti/p/%40461ejjzj"
            target="_blank"
            className="flex w-fit gap-[.625rem] rounded-full bg-green-400 px-[3.375rem] py-3"
          >
            <ImageBlock className="h-[1.625rem] w-[1.75rem]">
              <ImageItem src={IconLine} altText="icon line" />
            </ImageBlock>
            <Block className="text-[1.125rem] font-bold text-white">
              LINE友だち追加
            </Block>
          </Link>
        </ColumnItem>
        <ColumnItem className="flex w-full items-center justify-center text-[.625rem] font-medium text-shade-800">
          （24時間受付 返信は平日 9:00〜18:00となります）
        </ColumnItem>
      </BackgroundContainer>
      <ColumnItem className="flex w-full flex-col gap-[.625rem] py-5 pb-[1.875rem] pt-5 text-center lg:px-5">
        <Block className="hidden text-[1.125rem] font-bold text-coral-300">
          {/* NOTE: hide as per instruction from client */}
          {/* お客様相談室 専用ダイヤル */}
        </Block>
        <Block className="hidden border-b border-t py-[.625rem] text-[2rem] font-bold leading-[2.4rem] text-coral-300">
          {/* NOTE: hide as per instruction from client */}
          {/* 0000-000-000 */}
        </Block>
        <Block className="hidden w-full items-center justify-center text-xs font-medium text-shade-850">
          {/* NOTE: hide as per instruction from client */}
          {/* 受付時間：平日9:30 - 17:00 */}
        </Block>
      </ColumnItem>
    </ColumnContainer>
  );
};
