import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { FacilityTypecolumn } from "@/app/(admin)/admin/facilities/[id]/page";

type Props = {
  column: FacilityTypecolumn[];
};

export const TableDetail = ({ column }: Props) => {
  return (
    <Table className="mb-10 mt-[.875rem] text-sm font-medium lg:mt-0">
      <TableBody className="last:border-w-1">
        {column?.map((data) => (
          <TableRow
            key={data?.id}
            className="border-0 !border-b even:bg-shade-210"
          >
            <TableCell className="w-[9.5rem] p-[.625rem] align-top text-base font-bold">
              {data?.label}
            </TableCell>
            <TableCell className="whitespace-pre-wrap p-[.625rem] align-top font-inter text-sm font-medium">
              {data?.value}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
