import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const HeaderContactUs = ({ className = "", children }: CommonProps) => {
  return <div className={cn("flex flex-col", className)}>{children}</div>;
};

export const HeaderContactInformation = ({
  className = "",
  children,
}: CommonProps) => {
  return <div className={cn("flex flex-col", className)}>{children}</div>;
};

export const HeaderContactCorporate = ({
  className = "",
  children,
}: CommonProps) => {
  return <div className={cn("flex flex-col", className)}>{children}</div>;
};
