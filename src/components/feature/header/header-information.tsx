import { headerInformationLinks } from "@/lib/static-datasource";
import { cn, getUniqueId } from "@/lib/utils";
import Link from "next/link";
import { BackgroundContainer, MainBlock } from "../common";
import { PropsWithChildren } from "react";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const HeaderInformation = ({ className }: { className?: string }) => {
  return (
    <BackgroundContainer className="bg-ivory-100">
      <MainBlock
        size="sm"
        className={cn("mx-auto py-[.875rem] lg:px-0", className)}
      >
        <HeaderInfoLinks className="flex w-full items-center gap-5 lg:justify-end">
          {headerInformationLinks?.map(({ url, label }, index) => (
            <Link
              key={getUniqueId(index.toString())}
              href={url}
              className="block w-fit shrink-0"
            >
              <span className="font-yugothic text-xs font-medium text-black lg:text-sm">
                {label}
              </span>
            </Link>
          ))}

          <ContactSelect className="flex w-full justify-end lg:w-fit">
            <Link
              href="/contact-select"
              className="rounded-full bg-red-100 px-5 py-2 text-[.625rem] font-bold text-white lg:w-fit lg:text-sm"
            >
              お問い合わせ
            </Link>
          </ContactSelect>
        </HeaderInfoLinks>
      </MainBlock>
    </BackgroundContainer>
  );
};

const ContactSelect = ({ children, className }: CommonProps) => {
  return <div className={cn(className)}>{children}</div>;
};

const HeaderInfoLinks = ({ children, className }: CommonProps) => {
  return <div className={cn(className)}>{children}</div>;
};
