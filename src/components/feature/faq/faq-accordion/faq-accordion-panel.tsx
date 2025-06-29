import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const FAQAccordionPanel = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "relative w-full space-y-[20px] bg-white px-3.5 py-[30px] lg:px-10 lg:pb-[60px] lg:pt-10",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const FAQAccordionPanelTitle = ({
  children,
  className,
}: CommonProps) => {
  return (
    <div
      className={cn(
        "relative h-[2.5rem] w-[17rem] lg:h-[2.8125rem] lg:w-[19.0625rem]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const FAQAccordionPanelLegend = ({
  children,
  className,
}: CommonProps) => {
  return (
    <p
      className={cn(
        "absolute left-1/2 top-[-12px] max-w-max -translate-x-1/2 transform rounded-[30px] bg-pink-200 px-5 py-1.5 font-albertsans text-[10px] font-medium tracking-[2px] text-white",
        className,
      )}
    >
      {children}
    </p>
  );
};

