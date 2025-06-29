import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const SectionContent = ({ children, className }: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};

export const SectionHeader = ({ children, className }: CommonProps) => {
  return <div className={cn("flex", className)}>{children}</div>;
};

export const SectionHeaderContentRight = ({
  children,
  className,
}: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};

export const SectionHeaderTitle = ({ children, className }: CommonProps) => {
  return (
    <div className={cn("text-2xl font-bold leading-[2.25rem]", className)}>
      {children}
    </div>
  );
};
