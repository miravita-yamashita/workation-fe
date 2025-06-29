import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Panel = ({ className, children }: CommonProps) => {
  return (
    <div
      className={cn(
        "rounded-[.625rem] bg-white px-3.5 py-3 text-sm leading-normal lg:p-[1.875rem]",
        className,
      )}
    >
      {children}
    </div>
  );
};


export const PanelTextEmphasized = ({ children, className }: CommonProps) => {
  return (
    <span
      className={cn(
        "text-xl font-bold leading-normal text-pink-200 lg:text-[1.625rem]",
        className,
      )}
    >
      {children}
    </span>
  );
};
