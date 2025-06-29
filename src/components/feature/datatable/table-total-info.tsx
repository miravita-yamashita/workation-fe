import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const TableTotalInfo = ({ children, className }: CommonProps) => {
  return <div className={cn("flex", className)}>{children}</div>;
};

export const TableTotalInfoItem = ({ children, className }: CommonProps) => {
  return <div className={cn("text-shade-650", className)}>{children}</div>;
};
