"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type AdminCustomerTestimonialsColumnType = {
  id: string;
  name: string;
  reputation: string;
  title: string;
  createdDate: string;
  status: string;
};

const ActionsCell = ({
  rowData,
}: {
  rowData: AdminCustomerTestimonialsColumnType;
}) => {
  const path = `/admin/customer-testimonials/${rowData.id}`;

  return (
    <div className="flex justify-center">
      <Link className="text-sm font-medium text-blue-350 underline" href={path}>
        詳細へ
      </Link>
    </div>
  );
};

export const columns: ColumnDef<AdminCustomerTestimonialsColumnType>[] = [
  {
    accessorKey: "name",
    header: "名前",
  },
  {
    accessorKey: "reputation",
    header: "評判",
  },
  {
    accessorKey: "title",
    header: "タイトル",
  },
  {
    accessorKey: "createdDate",
    header: "作成日",
  },
  {
    accessorKey: "status",
    header: "ステータス",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const rowData = row.original;
      return <ActionsCell rowData={rowData} />;
    },
  },
];
