import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const TableButtonCreate = ({ children, className }: CommonProps) => {
  return <div className={cn("bg-blue-350", className)}>{children}</div>;
};
