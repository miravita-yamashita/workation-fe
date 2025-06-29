"use client";

import { TableAction } from "@/components/feature/datatable";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type AdminFacilitiesColumnType = {
  id: string;
  name: string;
  location: string;
};

const ActionsCell = ({ rowData }: { rowData: AdminFacilitiesColumnType }) => {
  const [loading] = useState(false);
  const router = useRouter();

  const handleEdit = (event: React.MouseEvent) => {
    router.push(`/admin/facilities/${rowData.id}`);
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

export const columns: ColumnDef<AdminFacilitiesColumnType>[] = [
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
    accessorKey: "name",
    header: "名称",
  },
  {
    accessorKey: "location",
    header: "所在地",
  },
  {
    accessorKey: "email",
    header: "メールアドレス",
  },
  {
    accessorKey: "telephone",
    header: "電話番号",
  },
  {
    accessorKey: "number_of_job_openings",
    header: "求人数",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const rowData = row.original;
      return <ActionsCell rowData={rowData} />;
    },
  },
];
