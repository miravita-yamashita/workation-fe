import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const TableFilter = ({ className = "", children }: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};

export const TableFilterItem = ({ className = "", children }: CommonProps) => {
  return (
    <div className={cn("flex justify-between rounded border", className)}>
      {children}
    </div>
  );
};
