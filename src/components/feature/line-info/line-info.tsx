import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const LineInfo = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 rounded-lg bg-green-400 px-[.875rem] py-5 lg:grid lg:grid-cols-2 lg:gap-10 lg:p-10",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const LineInfoInquiry = ({ children, className }: CommonProps) => {
  return <div className={cn("flex flex-col", className)}>{children}</div>;
};

export const LineInfoInquiryContentTop = ({
  children,
  className,
}: CommonProps) => {
  return <div className={cn("flex", className)}>{children}</div>;
};

export const LineInfoInquiryContentBottom = ({
  children,
  className,
}: CommonProps) => {
  return <div className={cn("flex flex-col", className)}>{children}</div>;
};

export const LineInfoActionsAddLineFriends = ({
  children,
  className,
}: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};

export const LineInfoQr = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-[.625rem] rounded-lg bg-green-150 p-5 lg:px-5 lg:py-10",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const LineInfoQrCode = ({ children, className }: CommonProps) => {
  return <div className={cn("flex", className)}>{children}</div>;
};
