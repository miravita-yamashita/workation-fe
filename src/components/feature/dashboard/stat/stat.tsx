import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Stat = ({ className, children }: CommonProps) => {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-between rounded-[.3125rem] border border-shade-250 px-5 py-10",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const StatLabel = ({ className, children }: CommonProps) => {
  return <div className={cn("text-sm font-bold", className)}>{children}</div>;
};

export const StatCount = ({ className, children }: CommonProps) => {
  return (
    <div
      className={cn(
        "text-shade-910 text-xs font-bold leading-normal",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const StatEmphasizedText = ({ className, children }: CommonProps) => {
  return (
    <span
      className={cn(
        "text-shade-910 font-albertsans text-[2rem] font-bold leading-[normal]",
        className,
      )}
    >
      {children}
    </span>
  );
};
