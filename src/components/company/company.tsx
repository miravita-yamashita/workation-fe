import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const CompanySectionTitleContent = ({
  className = "",
  children,
}: CommonProps) => {
  return (
    <div
      className={cn(
        "mb-5 flex flex-col items-center justify-center gap-1 lg:mb-10 lg:flex-row",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const CompanySectionTitleEmphasis = ({
  className = "",
  children,
}: CommonProps) => {
  return (
    <h3
      className={cn("text-[1.25rem] font-bold lg:text-[1.5625rem]", className)}
    >
      {children}
    </h3>
  );
};

export const CompanySectionTitle = ({
  className = "",
  children,
}: CommonProps) => {
  return (
    <p
      className={cn(
        "font-albertsans text-xs uppercase lg:text-base",
        className,
      )}
    >
      {children}
    </p>
  );
};
