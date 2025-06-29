import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const FQACategoryPanel = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-[.625rem] bg-white px-3.5 py-[1.875rem] lg:px-10 lg:py-[3.125rem]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const FAQCategoryPanelHeader = ({
  children,
  className,
}: CommonProps) => {
  return (
    <div
      className={cn(
        "mb-3 flex items-center gap-3 text-base font-bold",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const FAQCategoryPanelTitle = ({ children, className }: CommonProps) => {
  return (
    <p
      className={cn(
        "mb-2.5 border-l-[.3125rem] border-pink-200 pl-4 text-lg font-bold lg:pl-5 lg:text-[1.375rem] lg:leading-normal",
        className,
      )}
    >
      {children}
    </p>
  );
};


