"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type AdminEmailTemplatesColumnType = {
  id: string;
  templateName: string;
  body: string;
};

const ActionsCell = ({
  rowData,
}: {
  rowData: AdminEmailTemplatesColumnType;
}) => {
  const path = `/admin/email-templates/${rowData.id}`;

  return (
    <div className="flex justify-center">
      <Link className="text-sm font-medium text-blue-350 underline" href={path}>
        詳細へ
      </Link>
    </div>
  );
};

export const columns: ColumnDef<AdminEmailTemplatesColumnType>[] = [
  {
    accessorKey: "templateName",
    header: "テンプレート名",
  },
  {
    accessorKey: "body",
    header: "本文",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const rowData = row.original;
      return <ActionsCell rowData={rowData} />;
    },
  },
];
