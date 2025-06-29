import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Recent = ({ className, children }: CommonProps) => {
  return (
    <div
      className={cn(
        "rounded-[.3125rem] border border-shade-250 p-5",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const RecentTitle = ({ className, children }: CommonProps) => {
  return <div className={cn("text-base font-bold", className)}>{children}</div>;
};

export const RecentRedirect = ({ className, children }: CommonProps) => {
  return (
    <div
      className={cn(
        "text-blue-10 flex items-center text-xs leading-normal",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const RecentTable = ({ className, children }: CommonProps) => {
  return (
    <div
      className={cn(
        "rounded-[.3125rem] border border-shade-250 p-5",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const RecentTableHeader = ({ className, children }: CommonProps) => {
  return (
    <TableHeader className={cn("bg-shade-210", className)}>
      {children}
    </TableHeader>
  );
};

export const RecentTableHead = ({ className, children }: CommonProps) => {
  return (
    <TableHead
      className={cn(
        "py-2.5 text-sm font-bold text-black first:pl-2.5 last:pr-2.5",
        className,
      )}
    >
      {children}
    </TableHead>
  );
};

export const RecentTableRow = ({ className, children }: CommonProps) => {
  return (
    <TableRow
      className={cn("border-shade-250 hover:bg-transparent", className)}
    >
      {children}
    </TableRow>
  );
};

export const RecentTableBody = ({ className, children }: CommonProps) => {
  return <TableBody className={cn("", className)}>{children}</TableBody>;
};

export const RecentTableCell = ({ className, children }: CommonProps) => {
  return (
    <TableCell className={cn("py-2.5 first:pl-2.5 last:pr-2.5", className)}>
      {children}
    </TableCell>
  );
};
