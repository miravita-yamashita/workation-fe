"use client";

import { MainTable } from "@/components/feature/datatable";
import { SubCategoryType } from "../lib";
import { AdminSubCategoryColumnType, generateTableColumns } from "./columns";

type MainTableDataProps = {
  data: SubCategoryType[];
  parentCategoryId: string;
};

const getData = (data: SubCategoryType[]): AdminSubCategoryColumnType[] => {
  if (!data) return [];

  return data?.map((data) => {
    const { id, name, created_at, updated_at, status } = data || {};

    return {
      id: id?.toString(),
      categoryName: name || "",
      createdDate: created_at || "",
      updatedDate: updated_at || "",
      subCategoryListStatus: status || "",
    };
  });
};

export const MainTableData = ({
  data,
  parentCategoryId,
}: MainTableDataProps) => {
  return (
    <div className="relative">
      <MainTable
        columns={generateTableColumns(parentCategoryId)}
        data={getData(data)}
        detailLinkBase=""
        containsEdit={true}
      />
    </div>
  );
};
