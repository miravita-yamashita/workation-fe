import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Category = ({ className, children }: CommonProps) => {
  return (
    <div
      className={cn(
        "rounded-[.3125rem] border border-shade-250 px-5 py-10",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const CategoryLabel = ({ className, children }: CommonProps) => {
  return (
    <span className={cn("text-base font-bold", className)}>{children}</span>
  );
};

export const CategoryRedirect = ({ className, children }: CommonProps) => {
  return (
    <div className={cn("text-xs leading-normal text-blue-10", className)}>
      {children}
    </div>
  );
};
