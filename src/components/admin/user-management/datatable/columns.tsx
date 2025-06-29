"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type AdminUserMgtListColumnType = {
  id: string;
  name: string;
  email: string;
  authority: string;
};

const ActionsCell = ({ rowData }: { rowData: AdminUserMgtListColumnType }) => {
  const path = `/admin/user-management/${rowData.id}`;

  return (
    <div className="flex justify-center">
      <Link className="text-sm font-medium text-blue-350 underline" href={path}>
        詳細へ
      </Link>
    </div>
  );
};

export const columns: ColumnDef<AdminUserMgtListColumnType>[] = [
  {
    accessorKey: "name",
    header: "名前",
  },
  {
    accessorKey: "email",
    header: "メールアドレス",
  },
  {
    accessorKey: "authority",
    header: "権限",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const rowData = row.original;
      return <ActionsCell rowData={rowData} />;
    },
  },
];
