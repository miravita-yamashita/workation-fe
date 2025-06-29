import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const JobItem = ({ children, className }: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};

export const JobItemDescription = ({ children, className }: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};

export const JobItemDetails = ({ children, className }: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};

export const JobItemDetailsHeader = ({ children, className }: CommonProps) => {
  return <div className={cn("flex flex-col", className)}>{children}</div>;
};

export const JobItemDetailsContent = ({ children, className }: CommonProps) => {
  return <div className={cn("bg-white", className)}>{children}</div>;
};

export const JobItemTags = ({ children, className }: CommonProps) => {
  return <div className={cn("flex gap-1", className)}>{children}</div>;
};

export const JobItemTag = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "rounded border border-shade-550 p-[.3125rem] text-[.5rem] font-medium leading-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const JobItemGallery = ({ children, className }: CommonProps) => {
  return <div className={cn("flex flex-col", className)}>{children}</div>;
};

export const JobItemImage = ({ children, className }: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};
