import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { FAQ } from "./types";
import { Fragment } from "react";

type Props = {
  faq: FAQ[];
  className?: string;
};

export const TableFaq = ({ faq, className = "" }: Props) => {
  return (
    <div className={cn("flex flex-col", className)}>
      <Table className="mb-10 mt-[.875rem] text-sm font-medium lg:mt-0">
        <TableBody className="last:border-w-1">
          {faq?.map((data, index) => (
            <Fragment key={index}>
              <TableRow className="!border-b border-dashed even:bg-shade-210">
                <TableCell className="w-[3rem] p-[.625rem] align-top text-base font-bold">
                  Q.
                </TableCell>
                <TableCell className="p-[.625rem] align-top font-inter text-base">
                  {data?.question}
                </TableCell>
              </TableRow>
              <TableRow className="!border-b border-dashed even:bg-shade-210">
                <TableCell className="w-[3rem] p-[.625rem] align-top text-base font-bold">
                  A.
                </TableCell>
                <TableCell className="p-[.625rem] align-top font-inter text-base">
                  {data?.answer}
                </TableCell>
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
