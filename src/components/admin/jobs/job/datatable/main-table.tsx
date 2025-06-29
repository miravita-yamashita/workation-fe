"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";
import { cn } from "@/lib/utils";
import MainDatatableBulkDelete from "@/components/feature/datatable/bulk-delete";
import { ColumnContainer, ColumnItem } from "@/components/feature/common";

interface WithAddtionalKey {
  id: React.Key; // React.Key is a type that can be used as a React element key (string | number)
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  detailLinkBase?: string;
  containsEdit?: boolean;
  onClickTriggerPreview?: (id: string) => void;
  className?: string;
  bulkDeleteEndpoint?: string;
  filter?: React.ReactNode;
}

// This function is used to get the index of the actions column
const getActionsColumnIndex = <TData, TValue>(
  columns: ColumnDef<TData, TValue>[],
) => {
  const actionsIndex = columns.findIndex((column) => column.id === "actions");
  return actionsIndex !== -1 ? actionsIndex : null;
};

export const MainTable = <TData extends WithAddtionalKey, TValue>({
  columns,
  data,
  detailLinkBase,
  containsEdit = false,
  className = "",
  onClickTriggerPreview,
  bulkDeleteEndpoint = "",
  filter,
}: DataTableProps<TData, TValue>) => {
  const router = useRouter();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const actionsIndex = getActionsColumnIndex(columns);

  return (
    <div>
      <ColumnContainer className="mb-5 justify-between gap-[3.75rem]">
        {filter && <ColumnItem>{filter}</ColumnItem>}
        <ColumnItem>
          {bulkDeleteEndpoint && (
            <MainDatatableBulkDelete
              table={table}
              endpoint={bulkDeleteEndpoint}
              className="h-full max-h-10"
            />
          )}
        </ColumnItem>
      </ColumnContainer>

      <Table parentClassname={cn(className, "")}>
        <TableHeader className="sticky top-0 hidden lg:table-header-group">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-shade-210 hover:bg-shade-250"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={`${
                      header.getSize() !== 150
                        ? "hidden"
                        : "font-bold text-black"
                    } ${header.id === "jobTitle" ? "min-w-[13rem]" : "min-w-[6.25rem]"}`}
                    style={{
                      width:
                        header.getSize() !== 150 ? header.getSize() : "auto",
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="[&_tr:last-child]:border-1 grid grid-cols-1 gap-[0.625rem] lg:table-row-group">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={clsx(
                  "flex flex-col rounded hover:bg-transparent lg:table-row lg:border-0",
                  {
                    "cursor-pointer": row.original.id && detailLinkBase !== "",
                  },
                )}
                onClick={() => {
                  if (!row.original.id || detailLinkBase === "") {
                    return;
                  }
                  if (onClickTriggerPreview) {
                    onClickTriggerPreview(row.original.id.toString());
                  } else if (detailLinkBase) {
                    const url = `${detailLinkBase}/${row.original.id}${
                      containsEdit ? "/edit" : ""
                    }`;
                    router.push(url);
                    router.refresh();
                  }
                }}
              >
                {row.getVisibleCells().map((cell, cellIndex) => {
                  // specific for actions
                  if (cell.column.id === "actions") {
                    return (
                      <TableCell
                        key={cell.id}
                        className="hidden border-b-[1px] px-5 py-2 lg:table-cell lg:p-4"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    );
                  }
                  // checkbox
                  if (cell.column.id === "select") {
                    return (
                      <TableCell
                        key={cell.id}
                        className={clsx(
                          "!hidden grid-cols-3 items-center gap-11 border-b-[1px] px-5 py-2 lg:table-cell lg:bg-transparent lg:p-2",
                          {
                            "bg-shade-300": cellIndex === 0,
                          },
                        )}
                      >
                        {/* Cell Data (the checkbox) */}
                        <div>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </div>
                        <div className="lg:hidden"></div>
                        {/* render actions weh in  mobile  view*/}
                        <div className="lg:hidden">
                          {actionsIndex &&
                            row.getVisibleCells()[actionsIndex] &&
                            flexRender(
                              row.getVisibleCells()[actionsIndex].column
                                .columnDef.cell,
                              row.getVisibleCells()[actionsIndex].getContext(),
                            )}
                        </div>
                      </TableCell>
                    );
                  }

                  const cellValue = flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext(),
                  );

                  return (
                    <TableCell
                      key={cell.id}
                      className={clsx(
                        "grid grid-cols-3 gap-11 border-b px-5 py-2 lg:table-cell lg:border-gray-200 lg:bg-transparent lg:p-2",
                        {
                          "text-white lg:text-black": cellIndex === 0,
                        },
                      )}
                    >
                      {/* Header on Cell */}
                      <div className="font-medium lg:hidden">
                        {cell.column.id !== "actions" &&
                          cell.column.columnDef.header?.toString()}
                      </div>
                      {/* Sub Category List Status */}
                      {cell.column.id === "subCategoryListStatus" && (
                        <div className="w-fit border border-shade-910 px-3 py-1">
                          <span>{cellValue}</span>
                        </div>
                      )}

                      {cell.column.id === "subCategoryListStatus" ? null : (
                        <span>
                          {cell.column.id === "jobTitle" ? (
                            <p className="line-clamp-1">
                              <span>
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext(),
                                )}
                              </span>
                            </p>
                          ) : cell.column.id === "recommendation" ? (
                            <p className="max-w-52">
                              <span>
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext(),
                                )}
                              </span>
                            </p>
                          ) : (
                            flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )
                          )}
                        </span>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <span className="text-sm text-gray-400">
                  データがありません
                </span>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
