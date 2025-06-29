"use client";

import { TableAction } from "@/components/feature/datatable";
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
    accessorKey: "jobNumber",
    header: "求人番号",
  },
  {
    accessorKey: "jobTitle",
    header: "求人タイトル",
  },
  {
    accessorKey: "recommendation",
    header: "おすすめ",
  },
  {
    accessorKey: "contractType",
    header: "契約形態",
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
    cell: ({ row }) => {
      const rowData = row.original;
      return <ActionsCell rowData={rowData} />;
    },
  },
];
