"use client";

// import icons/images
import IconLineInfoLogo from "@public/icon-line-info-logo.svg";
import ImageCloud from "@public/icon-line-info-cloud.svg";
import ImageLineInfoQrCode from "@public/image-line-info-qr.png";
import { CommonProps } from "@/lib/types";

import {
  ImageBlock,
  ImageItem,
  Block,
  FieldHorizontalRuleBlock,
  ColumnContainer,
  ColumnItem,
} from "../common";
import {
  LineInfo,
  LineInfoInquiry,
  LineInfoInquiryContentTop,
  LineInfoInquiryContentBottom,
  LineInfoActionsAddLineFriends,
  LineInfoQr,
  LineInfoQrCode,
} from "./line-info";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Address repeating implementation - This is NOT a one all be all component
// There could be some situation that this component is not enough.
export const LineInfoComposite = ({ className }: CommonProps) => {
  return (
    <LineInfoBLock className={cn("", className)}>
      <LineInfoContactDetails
        infoCloudImageBlockProps={{
          className: "left-[190px] top-[12px]",
        }}
        infoCloudImageProps={{
          className: "scale-[1.1]",
        }}
      />
      <LineInfoQr>
        <ColumnContainer className="w-full gap-10">
          <ColumnItem className="flex w-full flex-col gap-2.5">
            <LineInfoPromotion />
            <ColumnContainer className="justify-between gap-2.5">
              <LineInfoQRCodeDescription />
              <LineInfoQrImageBlock className="lg:hidden" />
            </ColumnContainer>
          </ColumnItem>
          <ColumnItem className="hidden lg:flex">
            <LineInfoQrImageBlock />
          </ColumnItem>
        </ColumnContainer>
      </LineInfoQr>
    </LineInfoBLock>
  );
};

// Address different layout
export const LineInfoTightComposite = ({ className }: CommonProps) => {
  return (
    <LineInfoBLock className={cn("lg:p-5", className)}>
      <LineInfoContactDetails
        infoTitleBlockProps={{
          className: "lg:text-[2.5rem] lg:leading-[3rem]",
        }}
        infoTitleMiniProps={{ className: "lg:text-2xl lg:leading-normal" }}
        infoCloudImageProps={{
          className: "lg:w-[6.875rem] lg:h-[6.875rem] scale-[1.1]",
        }}
        infoSubTitleProps={{ className: "lg:text-2xl" }}
        infoCloudImageBlockProps={{
          className:
            "left-[190px] top-[12px] lg:left-[12.8125rem] lg:top-[-.8125rem]",
        }}
      />
      <LineInfoQr className="lg:p-5">
        <ColumnContainer className="w-full">
          <ColumnItem className="flex w-full flex-col gap-2.5">
            <LineInfoPromotion noBreaks={true} />
            <ColumnContainer className="justify-between gap-2.5">
              <LineInfoQRCodeDescription />
              <LineInfoQrImageBlock />
            </ColumnContainer>
          </ColumnItem>
        </ColumnContainer>
      </LineInfoQr>
    </LineInfoBLock>
  );
};

// These components are static and extracted from the original composite to avoid code duplication.
// They are not intended to be heavily customized and can be removed or replaced as needed.
const LineInfoBLock = ({ className, children }: CommonProps) => {
  return <LineInfo className={cn("", className)}>{children}</LineInfo>;
};

const LineInfoContactDetails = ({
  infoTitleBlockProps,
  infoTitleProps,
  infoTitleMiniProps,
  infoSubTitleProps,
  infoCloudImageBlockProps,
  infoCloudImageProps,
}: {
  infoTitleBlockProps?: {
    className?: string;
  };
  infoTitleProps?: {
    className?: string;
  };
  infoTitleMiniProps?: {
    className?: string;
  };
  infoSubTitleProps?: {
    className?: string;
  };
  infoCloudImageBlockProps?: {
    className?: string;
  };
  infoCloudImageProps?: {
    className?: string;
  };
}) => {
  return (
    <LineInfoInquiry className="w-full justify-center gap-[.625rem]">
      <LineInfoInquiryContentTop className="items-center gap-[.875rem] lg:gap-[.625rem]">
        <ImageBlock className="relative h-[3.8125rem] w-[4.0625rem] flex-shrink-0 lg:h-[3.8125rem] lg:w-[4.0625rem]">
          <ImageItem
            src={IconLineInfoLogo}
            altText="icon line"
            className="object-cover"
          />
        </ImageBlock>
        <Block className="flex flex-col">
          <Block className="relative flex">
            <span
              className={cn(
                "inline text-[2.75rem] font-extrabold leading-[3.25rem] tracking-widest text-white lg:text-[3.75rem] lg:leading-normal lg:tracking-[10%]",
                infoTitleBlockProps?.className,
              )}
            >
              <span
                className={cn("font-albertsans", infoTitleProps?.className)}
              >
                LINE
              </span>
              <span
                className={cn(
                  "inline font-albertsans text-2xl font-semibold leading-[2.5rem] text-white lg:text-[2.5rem] lg:leading-[3rem]",
                  infoTitleMiniProps?.className,
                )}
              >
                で
              </span>
            </span>
            <div
              className={cn(
                "absolute left-[13.75rem] top-[.625rem] -translate-x-1/2 -translate-y-1/2 transform lg:left-[18.75rem] lg:top-[.625rem]",
                infoCloudImageBlockProps?.className,
              )}
            >
              <ImageBlock
                className={cn(
                  "relative h-[4.75rem] w-[7.125rem] scale-[1.5] lg:h-[9.375rem] lg:w-[9.375rem]",
                  infoCloudImageProps?.className,
                )}
              >
                <ImageItem src={ImageCloud} altText="image cloud" />
              </ImageBlock>
            </div>
          </Block>
          <span
            className={cn(
              "block whitespace-nowrap font-albertsans text-2xl font-semibold leading-7 text-white lg:text-2xl lg:text-[2.5rem]",
              infoSubTitleProps?.className,
            )}
          >
            簡単エントリー！
          </span>
        </Block>
      </LineInfoInquiryContentTop>
      <LineInfoInquiryContentBottom className="gap-[1rem]">
        <Block className="flex flex-nowrap items-center justify-center gap-4">
          <FieldHorizontalRuleBlock className="flex w-full border-yellow-300" />
          <p className="w-full whitespace-nowrap text-sm font-bold leading-[1.3125rem] text-yellow-300 lg:leading-[1.6875rem]">
            24時間いつでもご質問いただけます
          </p>
          <FieldHorizontalRuleBlock className="flex w-full border-yellow-300" />
        </Block>
        <LineInfoActionsAddLineFriends>
          <Link
            href="https://line.me/R/ti/p/%40461ejjzj"
            target="_blank"
            className="block rounded-full bg-white py-[.8125rem] text-center font-bold text-green-400 lg:px-[5.375rem] lg:py-[.9375rem] lg:text-xl lg:leading-5"
          >
            <span className="whitespace-nowrap">LINE友だち追加</span>
          </Link>
        </LineInfoActionsAddLineFriends>
      </LineInfoInquiryContentBottom>
    </LineInfoInquiry>
  );
};

const LineInfoPromotion = ({ noBreaks = false }: { noBreaks?: boolean }) => {
  return (
    <p className="max-w-[16.875rem] whitespace-pre-line font-bold text-black lg:text-[1rem] lg:leading-normal">
      「自然の中で働きながらリフレッシュ！✨新しい働き方、
      <br className={cn("", { hidden: noBreaks })} />
      バケーションナースに挑戦しません
      <br className={cn("", { hidden: noBreaks })} />
      か？今すぐLINEで簡単エント
      <br className={cn("", { hidden: noBreaks })} />
      リー！」
    </p>
  );
};

const LineInfoQRCodeDescription = () => {
  return (
    <span className="text-xs leading-5 text-shade-800">
      ※上記QRコードから友だち追加お願い致します。
    </span>
  );
};

const LineInfoQrImageBlock = ({ className }: CommonProps) => {
  return (
    <LineInfoQrCode className={cn("gap-[.625rem]", className)}>
      <ImageBlock
        className={cn(
          "relative h-[6.25rem] w-[6.25rem] flex-shrink-0 lg:h-[6.25rem] lg:w-[6.25rem]",
        )}
      >
        <ImageItem
          src={ImageLineInfoQrCode?.src}
          altText="icon-line-info-cloud"
          className="object-cover"
        />
      </ImageBlock>
    </LineInfoQrCode>
  );
};
