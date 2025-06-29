"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
export type AdminJobsColumnType = {
  id: string;
  jobNumber: string;
  jobTitle: string;
  facilityName: string;
  recommendation: string;
  area: string;
  creationDate: string;
};

const ActionsCell = ({ rowData }: { rowData: AdminJobsColumnType }) => {
  const path = `/admin/jobs/${rowData.id}`;

  return (
    <div className="flex justify-center">
      <Link className="text-sm font-medium text-blue-350 underline" href={path}>
        詳細へ
      </Link>
    </div>
  );
};

export const columns: ColumnDef<AdminJobsColumnType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => {
      return (
        <Checkbox
          className="z-50"
          checked={row.getIsSelected()}
          onClick={(event) => {
            event.stopPropagation();
          }}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      );
    },
    enableHiding: false,
    size: 50,
  },
  {
    accessorKey: "jobNumber",
    header: "求人番号",
  },
  {
    accessorKey: "jobTitle",
    header: "求人タイトル",
  },
  {
    accessorKey: "facilityName",
    header: "施設名",
  },
  {
    accessorKey: "recommendation",
    header: "おすすめ",
  },
  {
    accessorKey: "area",
    header: "エリア",
    size: 100,
  },
  {
    accessorKey: "creationDate",
    header: "作成日",
  },
  {
    id: "actions",
    size: 100,
    cell: ({ row }) => {
      const rowData = row.original;
      return <ActionsCell rowData={rowData} />;
    },
  },
];
