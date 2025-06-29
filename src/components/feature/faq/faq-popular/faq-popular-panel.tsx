import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const FAQPopularPanel = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-[1.875rem] rounded-[.625rem] bg-white px-3.5 py-[1.875rem]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const FAQPopularPanelTitle = ({ children, className }: CommonProps) => {
  return (
    <p
      className={cn(
        "lg:leading mb-2.5 border-l-[.3125rem] border-blue-300 pl-4 text-lg font-bold lg:mb-[1.875rem] lg:pl-5 lg:text-[1.375rem]",
        className,
      )}
    >
      {children}
    </p>
  );
};

export const FAQPopularPanelTitleBorder = ({
  children,
  className,
}: CommonProps) => {
  return (
    <span
      className={cn(
        "lg:leading border-l-[.3125rem] border-blue-300 pl-4 text-lg font-bold lg:pl-5 lg:text-[1.375rem]",
        className,
      )}
    >
      {children}
    </span>
  );
};
