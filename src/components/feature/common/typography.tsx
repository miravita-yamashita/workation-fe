import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type CommonProps = PropsWithChildren & {
  className?: string;
};
export const PageHeader = ({ children, className }: CommonProps) => {
  return (
    <h1
      className={cn(
        "pb-2.5 text-xl font-bold leading-normal text-pink-200 lg:text-[1.625rem]",
        className,
      )}
    >
      {children}
    </h1>
  );
};
