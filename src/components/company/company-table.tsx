import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { TableItem } from "../feature/common";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const CompanyTableItem = ({ children, className }: CommonProps) => {
  return (
    <TableItem className={cn("border-t odd:border-r", className)}>
      {children}
    </TableItem>
  );
};

export const CompanyTableItemBorderedDash = ({
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
