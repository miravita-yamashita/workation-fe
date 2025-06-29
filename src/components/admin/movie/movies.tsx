import { Table, TableItem } from "@/components/feature/common";
import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Movies = ({ className = "", children }: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};

export const MovieItem = ({ className = "", children }: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};

export const MovieInfoDates = ({ className = "", children }: CommonProps) => {
  return <div className={cn("flex", className)}>{children}</div>;
};

export const MovieInfoTitle = ({ className = "", children }: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};

export const MovieInfoTable = ({ children, className }: CommonProps) => {
  return (
    <Table
      className={cn(
        "grid-cols-2 border-none lg:grid-cols-[11.25rem_1fr]",
        className,
      )}
    >
      {children}
    </Table>
  );
};

export const MovieInfoTableItem = ({ children, className }: CommonProps) => {
  return (
    <TableItem
      className={cn(
        "border-none px-[.875rem] py-[.625rem] lg:px-5 lg:py-[1rem]",
        className,
      )}
    >
      {children}
    </TableItem>
  );
};
