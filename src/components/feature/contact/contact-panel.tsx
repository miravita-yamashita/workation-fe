import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const ContactPanel = ({ className, children }: CommonProps) => {
  return (
    <div
      className={cn(
        "rounded-[.625rem] bg-white px-3.5 py-[1.875rem] lg:px-0 lg:py-10",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const ContactPanelTitle = ({ children, className }: CommonProps) => {
  return (
    <p
      className={cn(
        "text-center text-2xl font-bold leading-[2.25rem] text-pink-200",
        className,
      )}
    >
      {children}
    </p>
  );
};

export const ContactPanelSubTitle = ({ children, className }: CommonProps) => {
  return (
    <p
      className={cn(
        "text-center text-sm font-medium leading-[1.5rem]",
        className,
      )}
    >
      {children}
    </p>
  );
};

export const ContractPanelContent = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "mt-5 flex flex-col items-center gap-5 lg:flex-row lg:gap-0",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const ContactPanelItem = ({ children, className }: CommonProps) => {
  return (
    <div className={cn("w-full border-b lg:border-b-0 lg:border-r", className)}>
      {children}
    </div>
  );
};
