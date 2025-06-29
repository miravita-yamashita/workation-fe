import { Table, TableItem } from "@/components/feature/common";
import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const StaticDetailInfoDates = ({
  className = "",
  children,
}: CommonProps) => {
  return <div className={cn("flex", className)}>{children}</div>;
};

export const RecommendedJobsInfoTable = ({
  children,
  className,
}: CommonProps) => {
  return (
    <Table
      className={cn(
        "grid-cols-5 border-none lg:grid-cols-[200px_1fr_100px_100px_100px]", // 5 columns for keys/values
        className,
      )}
    >
      {children}
    </Table>
  );
};

export const RecommendedJobsInfoTableItemKey = ({
  children,
  className,
}: CommonProps) => {
  return (
    <TableItem
      className={cn(
        "flex items-center border-none bg-shade-210 px-[.875rem] py-[.625rem] font-bold lg:px-5 lg:py-[1rem]",
        className,
      )}
    >
      {children}
    </TableItem>
  );
};

export const RecommendedJobsInfoTableItemValue = ({
  children,
  className,
}: CommonProps) => {
  return (
    <TableItem
      className={cn(
        "w-full whitespace-pre-line border-none px-[.875rem] py-[.625rem] lg:px-5 lg:py-[1rem]",
        className,
      )}
    >
      {children}
    </TableItem>
  );
};
