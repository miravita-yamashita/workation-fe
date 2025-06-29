import { Table, TableItem } from "@/components/feature/common";
import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const PostsInfoBeginnersTable = ({
  children,
  className,
}: CommonProps) => {
  return (
    <Table
      className={cn(
        "grid-cols-3 border-none lg:grid-cols-[1fr_100px_100px]", // 3 columns for keys/values
        className,
      )}
    >
      {children}
    </Table>
  );
};

export const PostsInfoBeginnersTableTableItemKey = ({
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

export const PostsInfoBeginnersTableTableItemValue = ({
  children,
  className,
}: CommonProps) => {
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
