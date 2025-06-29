import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const SearchCount = ({ children, className }: CommonProps) => {
  return (
    <div className={cn("flex text-base font-medium leading-normal", className)}>
      {children}
    </div>
  );
};

export const SearchCountEmphasized = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "text-lg font-bold leading-normal text-pink-200",
        className,
      )}
    >
      {children}
    </div>
  );
};
