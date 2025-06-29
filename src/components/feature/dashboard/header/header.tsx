import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Header = ({ className, children }: CommonProps) => {
  return (
    <div
      className={cn(
        "flex justify-between border-b border-shade-250 p-5",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const HeaderTitle = ({ className, children }: CommonProps) => {
  return <span className={cn("text-xl font-bold", className)}>{children}</span>;
};
