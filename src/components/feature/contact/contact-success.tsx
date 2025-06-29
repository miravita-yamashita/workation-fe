import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const ContactSuccessMessage = ({
  className = "",
  children,
}: CommonProps) => {
  return <div className={cn("flex flex-col", className)}>{children}</div>;
};

export const ContactSuccessMessageDescription = ({
  className = "",
  children,
}: CommonProps) => {
  return (
    <div className={cn("text-center font-medium", className)}>{children}</div>
  );
};
