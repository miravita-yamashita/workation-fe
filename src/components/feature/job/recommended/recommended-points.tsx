import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const RecommendedPoints = ({ children, className }: CommonProps) => {
  return <div className={cn("flex flex-col", className)}>{children}</div>;
};

export const RecommendedPointsTitle = ({
  children,
  className,
}: CommonProps) => {
  return (
    <div className={cn("bg-green-200 font-bold text-white", className)}>
      {children}
    </div>
  );
};

export const RecommendedPointsItem = ({ children, className }: CommonProps) => {
  return <div className={cn("rounded-xl border", className)}>{children}</div>;
};
