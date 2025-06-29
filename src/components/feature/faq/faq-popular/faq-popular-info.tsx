import { cn } from "@/lib/utils";
import Image from "next/image";
import { PropsWithChildren } from "react";
import IconCaret from "@public/icon-caret.svg";
import Link from "next/link";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const FAQPopularInfo = ({ children, className }: CommonProps) => {
  return (
    <section className={cn("flex min-w-0 flex-col gap-1", className)}>
      {children}
    </section>
  );
};

export const FAQPopularInfoHeader = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "flex justify-between border-b border-dashed border-shade-250 pb-1",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const FAQPopularInfoListTitle = ({
  children,
  className,
}: CommonProps) => {
  return (
    <p className={cn("shrink-0 text-base font-bold leading-normal", className)}>
      {children}
    </p>
  );
};

export const FAQPopularInfoLink = ({
  children,
  className,
  href,
}: CommonProps & {
  href: string;
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex w-full min-w-0 items-center justify-between text-sm font-medium leading-normal",
        className,
      )}
    >
      {children}
    </Link>
  );
};

export const FAQPopularInfoList = ({ children, className }: CommonProps) => {
  return (
    <ul className={cn("flex w-full min-w-0 flex-col", className)}>
      {children}
    </ul>
  );
};

export const FAQPopularInfoItem = ({ children, className }: CommonProps) => {
  return (
    <li className={cn("flex min-w-0 gap-2 py-1.5", className)}>{children}</li>
  );
};

export const FAQPopularInfoBullet = ({ children, className }: CommonProps) => {
  return (
    <p
      className={cn(
        "font-albertsans text-base font-bold leading-normal text-pink-200",
        className,
      )}
    >
      {children}
    </p>
  );
};

export const FAQPopularInfoIcon = ({
  className,
  imageSource = IconCaret.src,
  ImageAltText = "icon chevron",
}: CommonProps & {
  imageSource?: string;
  ImageAltText?: string;
}) => {
  return (
    <div className={cn("relative p-1.5", className)}>
      <Image src={imageSource} alt={ImageAltText} fill sizes="100%" />
    </div>
  );
};
