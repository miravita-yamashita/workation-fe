import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const AboutWorkation = ({ className = "", children }: CommonProps) => {
  return <div className={cn("flex flex-col", className)}>{children}</div>;
};

export const AboutWorkationTitle = ({
  className = "",
  children,
}: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};

export const AboutWorkationImageFigure = ({
  className = "",
  children,
}: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};

export const AboutWorkationDescription = ({
  className = "",
  children,
}: CommonProps) => {
  return (
    <div className={cn("text-justify font-medium", className)}>{children}</div>
  );
};

export const AboutWorkationAction = ({
  className = "",
  children,
}: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};
