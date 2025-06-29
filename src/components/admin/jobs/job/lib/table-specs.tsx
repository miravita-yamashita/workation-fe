import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Fragment } from "react";
import { JobTypecolumn } from "./types";

type Props = {
  data: JobTypecolumn[];
  className?: string;
};

export const TableSpecs = ({ data, className = "" }: Props) => {
  return (
    <div className={cn("flex flex-col", className)}>
      <Table className="mb-10 mt-[.875rem] text-sm font-medium lg:mt-0">
        <TableBody className="last:border-w-1">
          {data?.map((data) => (
            <Fragment key={data?.id}>
              <TableRow className="!border-b border-dashed even:bg-shade-210">
                <TableCell className="w-[3rem] p-[.625rem] align-top text-base font-bold">
                  {data?.label}
                </TableCell>
                <TableCell className="font-inter p-[.625rem] align-top text-base">
                  {data?.value}
                </TableCell>
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
