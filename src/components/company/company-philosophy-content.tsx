import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const CompanyPhilosophy = ({
  className = "",
  children,
}: CommonProps) => {
  return <div className={cn("w-full bg-white", className)}>{children}</div>;
};

export const CompanyPhilosophyContent = ({
  className = "",
  children,
}: CommonProps) => {
  return (
    <div className={cn("flex flex-col bg-white", className)}>{children}</div>
  );
};

export const CompanyPhilosophyDescription = ({
  className = "",
  children,
}: CommonProps) => {
  return (
    <div
      className={cn(
        "whitespace-pre-line text-center text-[19px] font-bold lg:text-[1.75rem]",
        className,
      )}
    >
      {children}
    </div>
  );
};
