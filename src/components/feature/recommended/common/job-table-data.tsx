import { AssignmentCategory } from "@/components/top/lib";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";

interface Data {
  title: string;
  content: string | AssignmentCategory[];
}

interface Props {
  tableData: Data[];
}

export const JobTableData = ({ tableData }: Props) => {
  return (
    <Table className="mb-10 mt-[.875rem] text-sm font-medium lg:mt-0">
      <TableBody className="last:border-w-1">
        {tableData.map((data) => (
          <TableRow key={data?.title} className="!border-b border-dashed">
            <TableCell className="min-w-20 max-w-[6.25rem] p-[.625rem] font-bold lg:w-[6.25rem]">
              {data?.title}
            </TableCell>
            <TableCell className="whitespace-pre-wrap p-[.625rem]">
              {Array.isArray(data?.content) === true
                ? data.content.map((item) => item.name).join(", ")
                : data.content}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
