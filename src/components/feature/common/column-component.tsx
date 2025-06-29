import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const ColumnItem = ({ children, className }: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};

export const ColumnContainer = ({ children, className }: CommonProps) => {
  return <div className={cn("flex flex-row", className)}>{children}</div>;
};
