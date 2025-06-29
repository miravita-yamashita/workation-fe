import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const CompanyGreetings = ({ className = "", children }: CommonProps) => {
  return <div className={cn("w-full bg-coral-100", className)}>{children}</div>;
};

export const CompanyGreetingsContent = ({
  className = "",
  children,
}: CommonProps) => {
  return (
    <div className={cn("flex flex-col bg-white", className)}>{children}</div>
  );
};

export const CompanyGreetingsContentLeft = ({
  className = "",
  children,
}: CommonProps) => {
  return (
    <div className={cn("flex lg:min-w-[30rem] flex-col", className)}>
      {children}
    </div>
  );
};

export const CompanyGreetingsContentDescription = ({
  className = "",
  children,
}: CommonProps) => {
  return (
    <p className={cn("whitespace-pre-line font-medium", className)}>
      {children}
    </p>
  );
};

export const CompanyGreetingsContentRight = ({
  className = "",
  children,
}: CommonProps) => {
  return <div className={cn("flex flex-col items-center justify-center", className)}>{children}</div>;
};
