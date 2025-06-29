"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type AdminStaticPageColumnType = {
  id: string;
  title: string;
  slug: string;
  creator: string;
  createdDate: string;
  noOfViews: string;
};

// We are using slug as the identifier for each static page - no detail page will redirect to edit page
const SLUG_PAGE_INFO_MAP = [
  {
    slug: "Top",
    page: "top",
    hasDetailPage: true,
  },
  {
    slug: "For-Beginners",
    page: "beginners",
    hasDetailPage: true,
  },
  {
    slug: "About-Workation-Nurse",
    page: "about",
    hasDetailPage: true,
  },
  {
    slug: "Company-Profile",
    page: "company",
    hasDetailPage: true,
  },
  {
    slug: "General-Employer-Action-Plan",
    page: "employer",
    hasDetailPage: false,
  },
  {
    slug: "Content-Creation-Policy",
    page: "content-policy",
    hasDetailPage: false,
  },
  {
    slug: "Privacy-Policy",
    page: "privacy-policy",
    hasDetailPage: false,
  },
];

const ActionsCell = ({ rowData }: { rowData: AdminStaticPageColumnType }) => {
  const info = SLUG_PAGE_INFO_MAP.find((item) => item.slug === rowData.slug);

  // We are using since the API detail endpoint expects an ID (/pages/:id)
  const path = `/admin/static-page/${rowData.id}/${info?.page}/${info?.hasDetailPage ? "detail" : "edit"}`;

  return (
    <div className="flex justify-center">
      <Link className="text-sm font-medium text-blue-350 underline" href={path}>
        詳細へ
      </Link>
    </div>
  );
};

export const columns: ColumnDef<AdminStaticPageColumnType>[] = [
  {
    accessorKey: "title",
    header: "タイトル",
  },
  {
    accessorKey: "creator",
    header: "作成者",
  },
  {
    accessorKey: "createdDate",
    header: "作成/編集日",
  },
  {
    accessorKey: "noOfViews",
    header: "表示回数",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const rowData = row.original;
      return <ActionsCell rowData={rowData} />;
    },
  },
];
