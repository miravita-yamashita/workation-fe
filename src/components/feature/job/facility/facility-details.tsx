import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { Table, TableItem } from "../../common";

type CommonProps = PropsWithChildren & {
  className?: string;
};
export const FacilityDetails = ({ children, className = "" }: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};

export const FacilityDetailsHeader = ({ children, className }: CommonProps) => {
  return <div className={cn("flex", className)}>{children}</div>;
};

export const FacilityDetailsTable = ({ children, className }: CommonProps) => {
  return (
    <Table
      className={cn(
        "grid-cols-2 border border-t-0 border-none lg:grid-cols-[11.25rem_1fr]",
        className,
      )}
    >
      {children}
    </Table>
  );
};

export const FacilityDetailsTableItem = ({
  children,
  className,
}: CommonProps) => {
  return (
    <TableItem
      className={cn(
        "odd-border-0 border-b border-t-0 border-dashed px-[.875rem] py-[.625rem] lg:px-5 lg:py-[1rem]",
        className,
      )}
    >
      {children}
    </TableItem>
  );
};
