import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { Table } from "../feature/common";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const CompanyProfile = ({ className = "", children }: CommonProps) => {
  return <div className={cn("w-full bg-white", className)}>{children}</div>;
};

export const CompanyProfileContent = ({
  className = "",
  children,
}: CommonProps) => {
  return <div className={cn("flex flex-col", className)}>{children}</div>;
};

export const CompanyProfileTable = ({
  className = "",
  children,
}: CommonProps) => {
  return (
    <Table
      className={cn(
        "grid border-collapse border text-sm font-medium text-black",
        className,
      )}
    >
      {children}
    </Table>
  );
};
