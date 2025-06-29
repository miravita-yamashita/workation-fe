"use client";

import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type CommonProps = PropsWithChildren<{
  className?: string;
}>;

export const Spinner = ({ className = "" }: CommonProps) => {
  return (
    <div className={cn("py-1", className)}>
      <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-t-4 border-t-coral-300"></div>
    </div>
  );
};

export const Loading = ({ className = "" }: CommonProps) => (
  <Spinner className={className} />
);
