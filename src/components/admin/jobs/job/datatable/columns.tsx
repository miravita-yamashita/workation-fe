"use client";

import { TableAction } from "@/components/feature/datatable";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type AdminJobsColumnType = {
  id: string;
  jobNumber: string;
  jobTitle: string;
  contractType: string;
  recommendation: string;
  area: string;
  creationDate: string;
};

const ActionsCell = ({ rowData }: { rowData: AdminJobsColumnType }) => {
  const [loading] = useState(false);
  const router = useRouter();

  const handleEdit = (event: React.MouseEvent) => {
    router.push(`/admin/jobs/${rowData.id}`);
    event.stopPropagation();
  };

  const buttons = [
    {
      label: "詳細へ",
      onClick: handleEdit,
      disabled: loading,
      styles:
        "underline bg-transparent hover:bg-transparent font-medium rounded-none text-sm text-blue-350",
    },
  ];

  return (
    <div className="flex justify-center">
      <TableAction buttons={buttons} className="gap-2" />
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
    accessorKey: "area",
    header: "エリア",
  },
  {
    accessorKey: "creationDate",
    header: "作成日",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const rowData = row.original;
      return <ActionsCell rowData={rowData} />;
    },
  },
];
