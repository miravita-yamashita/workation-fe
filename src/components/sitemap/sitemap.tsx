"use client";

import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const Sitemap = ({ className = "", children }: CommonProps) => {
  return <div className={cn("flex", className)}>{children}</div>;
};

export const SitemapGroupContent = ({
  className = "",
  children,
}: CommonProps) => {
  return (
    <div className={cn("flex w-full flex-col", className)}>{children}</div>
  );
};

export const SitemapItem = ({ className = "", children }: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};

export const SitemapItemTitleContent = ({
  className = "",
  children,
}: CommonProps) => {
  return (
    <div className={cn("flex flex-row gap-5 pb-2.5", className)}>
      {children}
    </div>
  );
};

export const SitemapItemTitle = ({ className = "", children }: CommonProps) => {
  return (
    <div className={cn("flex text-[.9375rem] font-bold", className)}>
      {children}
    </div>
  );
};

export const SitemapItemLinks = ({ className = "", children }: CommonProps) => {
  return (
    <div
      className={cn(
        "mt-[.625rem] flex flex-col gap-[.625rem] px-[.625rem] text-sm font-medium",
        className,
      )}
    >
      {children}
    </div>
  );
};
