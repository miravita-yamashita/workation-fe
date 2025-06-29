"use client";

import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const MiscellaneousJob = ({ children, className }: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};

export const MiscellaneousJobHeader = ({
  children,
  className,
}: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};

export const MiscellaneousJobContent = ({
  children,
  className,
}: CommonProps) => {
  return (
    <div className={cn("flex flex-col bg-white", className)}>{children}</div>
  );
};

export const MiscellaneousJobKey = ({ children, className }: CommonProps) => {
  return <div className={cn("font-bold", className)}>{children}</div>;
};

export const MiscellaneousJobValue = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "border-b border-dashed pb-[.625rem] font-medium",
        className,
      )}
    >
      {children}
    </div>
  );
};
