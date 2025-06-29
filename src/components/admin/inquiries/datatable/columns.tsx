"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type AdminInquiriesColumnType = {
  id: string;
  idNumber: string;
  status: string;
  type: string;
  name: string;
  email: string;
  dateOfReceipt: string;
};

const ActionsCell = ({ rowData }: { rowData: AdminInquiriesColumnType }) => {
  const path = `/admin/inquiries/${rowData.id}`;

  return (
    <div className="flex justify-center">
      <Link className="text-sm font-medium text-blue-350 underline" href={path}>
        詳細へ
      </Link>
    </div>
  );
};

export const columns: ColumnDef<AdminInquiriesColumnType>[] = [
  {
    accessorKey: "idNumber",
    header: "ID",
  },
  {
    accessorKey: "status",
    header: "お問い合せ状況",
    size: 200,
  },
  {
    accessorKey: "type",
    header: "お問い合わせ種別",
    size: 200,
  },
  {
    accessorKey: "name",
    header: "お名前",
  },
  {
    accessorKey: "email",
    header: "メールアドレス",
  },
  {
    accessorKey: "dateOfReceipt",
    header: "受信日",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const rowData = row.original;
      return <ActionsCell rowData={rowData} />;
    },
  },
];
