"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type AdminFaqColumnType = {
  id: string;
  question: string;
  answer: string;
  categories: string;
  createdDate: string;
};

const ActionsCell = ({ rowData }: { rowData: AdminFaqColumnType }) => {
  const path = `/admin/faq/${rowData.id}`;

  return (
    <div className="flex justify-center">
      <Link className="text-sm font-medium text-blue-350 underline" href={path}>
        詳細へ
      </Link>
    </div>
  );
};

export const columns: ColumnDef<AdminFaqColumnType>[] = [
  {
    accessorKey: "question",
    header: "質問",
  },
  {
    accessorKey: "answer",
    header: "回答",
  },
  {
    accessorKey: "categories",
    header: "カテゴリー",
  },
  {
    accessorKey: "createdDate",
    header: "作成日",
    size: 100,
  },
  {
    id: "actions",
    size: 200,
    cell: ({ row }) => {
      const rowData = row.original;
      return <ActionsCell rowData={rowData} />;
    },
  },
];
