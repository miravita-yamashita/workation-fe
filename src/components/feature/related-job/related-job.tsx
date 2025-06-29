import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const RelatedJob = ({ className, children }: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};

export const RelatedJobTitle = ({ className, children }: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};
