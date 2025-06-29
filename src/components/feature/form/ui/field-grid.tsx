import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const FieldGrid = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "mb-1.5 grid grid-cols-1 gap-1.5 lg:grid-cols-2",
        className,
      )}
    >
      {children}
    </div>
  );
};
