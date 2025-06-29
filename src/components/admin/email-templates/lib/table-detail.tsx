import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { FacilityTypecolumn } from "@/app/(admin)/admin/facilities/[id]/page";
import { cn } from "@/lib/utils";

type Props = {
  column: FacilityTypecolumn[];
  className?: string;
};

export const TableDetail = ({ column, className = "" }: Props) => {
  return (
    <div className={cn("flex flex-col", className)}>
      <Table className="mb-10 mt-[.875rem] text-sm font-medium lg:mt-0">
        <TableBody className="last:border-w-0">
          {column?.map((data) => (
            <TableRow key={data?.id} className="border-0 even:bg-shade-210">
              <TableCell className="w-[9.5rem] p-[.625rem] align-top text-base font-bold">
                {data?.label}
              </TableCell>
              <TableCell className="p-[.625rem] align-top font-inter text-base">
                {data?.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
