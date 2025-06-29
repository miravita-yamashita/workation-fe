import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Detail = ({ className, children }: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};

export const DetailRow = ({ className, children }: CommonProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row px-5 py-4 even:bg-shade-210",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const DetailLabel = ({ className, children }: CommonProps) => {
  return (
    <div
      className={cn(
        "min-w-[8.75rem] whitespace-pre-line text-base font-bold",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const DetailValue = ({ className, children }: CommonProps) => {
  return (
    <div
      className={cn(
        "whitespace-pre-line",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const DetailImageBlock = ({ className, children }: CommonProps) => {
  return (
    <div
      className={cn("relative h-[300px] w-[15.625rem] bg-shade-550", className)}
    >
      {children}
    </div>
  );
};
