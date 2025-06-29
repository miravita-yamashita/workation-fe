import { Table, TableItem } from "@/components/feature/common";
import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const PostsInfoTopTable = ({ children, className }: CommonProps) => {
  return (
    <Table
      className={cn(
        "grid-cols-3 border-none lg:grid-cols-[1fr_7.5rem_7.5rem]", // 3 columns for keys/values
        className,
      )}
    >
      {children}
    </Table>
  );
};

export const PostsInfoTopTableItemKey = ({
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

export const PostsInfoTopTableItemValue = ({
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

export const FreelanceNurseInfoTable = ({
  children,
  className,
}: CommonProps) => {
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

export const FreelanceNurseInfoTableItem = ({
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
