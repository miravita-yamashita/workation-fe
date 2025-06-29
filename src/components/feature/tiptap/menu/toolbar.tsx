"use client";

import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const Toolbar = ({ children, className }: CommonProps) => {
  return (
    <div className={cn("bg-shade-210 px-5 py-3", className)}>{children}</div>
  );
};

export const ToolbarIcon = ({
  className,
  imageSource,
  imageAltText,
}: CommonProps & {
  imageSource: string;
  imageAltText: string;
}) => {
  return (
    <div className={cn("relative h-3 w-3", className)}>
      <Image src={imageSource} alt={imageAltText} fill sizes="100%" />
    </div>
  );
};

export const ToolbarInsertImage = ({ children, className }: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};

export const ToolbarTypography = ({ children, className }: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};

export const ToolbarFontSize= ({ children, className }: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};