"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
export type AdminSubCategoryColumnType = {
  id: string;
  categoryName: string;
  createdDate: string;
  updatedDate: string;
  subCategoryListStatus: string;
};

const ActionsCell = ({
  rowData,
  parentCategoryId,
}: {
  rowData: AdminSubCategoryColumnType;
  parentCategoryId: string;
}) => {
  return (
    <div className="flex justify-center">
      <Link
        className="text-sm font-medium text-blue-350 underline"
        href={`/admin/categories/${parentCategoryId}/list/${rowData.id}/detail`}
      >
        詳細へ
      </Link>
    </div>
  );
};


// Pass the parent category id to the actions cell
export const generateTableColumns = (
  parentCategoryId: string,
): ColumnDef<AdminSubCategoryColumnType>[] => {
  return [
    {
      accessorKey: "id",
      header: "Category ID",
    },
    {
      accessorKey: "categoryName",
      header: "カテゴリー名",
    },
    {
      accessorKey: "createdDate",
      header: "作成日",
    },
    {
      accessorKey: "updatedDate",
      header: "更新日",
    },
    {
      accessorKey: "subCategoryListStatus",
      header: "ステータス",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const rowData = row.original;
        return (
          <ActionsCell rowData={rowData} parentCategoryId={parentCategoryId} />
        );
      },
    },
  ];
};
