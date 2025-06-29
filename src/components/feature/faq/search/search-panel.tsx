import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const SearchPanel = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "flex h-full flex-col gap-[1.875rem] rounded-[.625rem] bg-white px-3.5 py-[1.875rem]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const SearchPanelTitle = ({ children, className }: CommonProps) => {
  return (
    <p
      className={cn(
        "lg:leading mb-2.5 border-l-[.3125rem] border-pink-200 pl-4 text-lg font-bold lg:mb-[1.875rem] lg:pl-5 lg:text-[1.375rem]",
        className,
      )}
    >
      {children}
    </p>
  );
};

export const SearchPanelDescription = ({
  children,
  className,
}: CommonProps) => {
  return (
    <p
      className={cn(
        "text-sm font-medium leading-[1.5625rem] lg:mb-[1.875rem]",
        className,
      )}
    >
      {children}
    </p>
  );
};
