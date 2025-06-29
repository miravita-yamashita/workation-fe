"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useRecommendToggle } from "./lib/useRecommendToggle";

declare module "@tanstack/table-core" {
  // @ts-expect-error Note: TData and TValue are required by the original type definition
  interface ColumnMeta {
    className?: string;
  }
}

export type AdminPostsColumnType = {
  id: string;
  isRecommended: boolean;
  title: string;
  creator: string;
  category: string;
  createdOrUpdatedDate: string;
  noOfViews: number;
  recommendedArticleCount: number;
};

const ActionsCell = ({ rowData }: { rowData: AdminPostsColumnType }) => {
  const path = `/admin/posts/${rowData.id}/edit`;

  return (
    <div className="flex justify-center">
      <Link className="text-sm font-medium text-blue-350 underline" href={path}>
        詳細へ
      </Link>
    </div>
  );
};

const RecommendedCell = ({ rowData }: { rowData: AdminPostsColumnType }) => {
  const { isChecked, handleClick, isDisabled, isLoading } = useRecommendToggle({
    rowData,
  });

  return (
    <div className="pr-2 text-center">
      <Checkbox
        checked={isChecked}
        disabled={isDisabled || isLoading}
        onClick={async () => {
          await handleClick();
        }}
      />
    </div>
  );
};

export const columns: ColumnDef<AdminPostsColumnType>[] = [
  {
    accessorKey: "isRecommended",
    header: "おすすめ",
    size: 80,
    cell: ({ row }) => <RecommendedCell rowData={row.original} />,
    meta: {
      className: "text-center",
    },
  },
  {
    accessorKey: "title",
    header: "タイトル",
  },
  {
    accessorKey: "creator",
    header: "作成者",
  },
  {
    accessorKey: "createdOrUpdatedDate",
    header: "作成/編集日",
  },
  {
    accessorKey: "category",
    header: "カテゴリー",
  },
  {
    accessorKey: "noOfViews",
    header: "表示回数",
  },
  {
    id: "actions",
    header: "アクション",
    size: 100,
    cell: ({ row }) => {
      const rowData = row.original;
      return <ActionsCell rowData={rowData} />;
    },
  },
];
