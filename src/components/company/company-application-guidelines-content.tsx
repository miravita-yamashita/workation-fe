import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { Table } from "../feature/common";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const CompanyApplicationGuidelines = ({
  className = "",
  children,
}: CommonProps) => {
  return <div className={cn("w-full bg-white", className)}>{children}</div>;
};

export const CompanyApplicationGuidelinesContent = ({
  className = "",
  children,
}: CommonProps) => {
  return <div className={cn("flex flex-col", className)}>{children}</div>;
};

export const CompanyApplicationGuidelinesTable = ({
  className = "",
  children,
}: CommonProps) => {
  return (
    <Table className={cn("grid border-collapse border", className)}>
      {children}
    </Table>
  );
};
