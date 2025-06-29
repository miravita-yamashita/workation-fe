import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import Link from "next/link";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const AboutWhatIsWorkationAttractions = ({
  className = "",
  children,
}: CommonProps) => {
  return <div className={cn("flex", className)}>{children}</div>;
};

export const AboutWhatIsWorkationAttraction = ({
  className = "",
  children,
  href,
}: CommonProps & {
  href: string;
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex w-full items-center gap-5 rounded-lg border-[.1875rem]",
        className,
      )}
    >
      {children}
    </Link>
  );
};

export const AboutWhatIsWorkationAttractionLeftContent = ({
  className = "",
  children,
}: CommonProps) => {
  return (
    <div className={cn("relative flex w-full", className)}>{children}</div>
  );
};

export const AboutWhatIsWorkationAttractionDescription = ({
  className = "",
  children,
}: CommonProps) => {
  return (
    <div className={cn("w-full whitespace-nowrap", className)}>{children}</div>
  );
};

export const AboutWhatIsWorkationAttractionRightContent = ({
  className = "",
  children,
}: CommonProps) => {
  return <div className={cn("flex-shrink-0", className)}>{children}</div>;
};

export const AboutWhatIsWorkationAttractionHighlighted = ({
  className = "",
  children,
}: CommonProps) => {
  return (
    <span className={cn("border-b-[.125rem] font-bold", className)}>
      {children}
    </span>
  );
};
