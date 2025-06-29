import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Timestamp = ({ className, children }: CommonProps) => {
  return (
    <div
      className={cn(
        "flex justify-between text-sm font-medium text-shade-910",
        className,
      )}
    >
      {children}
    </div>
  );
};
