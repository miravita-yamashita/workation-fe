import { footerInformationValues } from "@/lib/static-datasource/footer-links-values";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { ImageBlock, ImageItem } from "../common";

type FooterInformationValue = {
  imgSrc: string;
  alt: string;
  url: string;
};

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const FooterContactInformation = ({ className = "" }: CommonProps) => {
  return (
    <>
      {footerInformationValues?.map(
        ({ imgSrc, alt, url }: FooterInformationValue, index) => (
          <div
            className={cn(
              "relative flex h-[7.5rem] max-w-[21.4375rem] gap-[.625rem] lg:w-[20.625rem]",
              className,
            )}
            key={index}
          >
            <Link href={url}>
              <ImageBlock className="relative h-[7.5rem] w-[21.4375rem] lg:w-[20.625rem]">
                <ImageItem
                  src={imgSrc}
                  altText={alt}
                  className="object-cover"
                />
              </ImageBlock>
            </Link>
          </div>
        ),
      )}
    </>
  );
};
