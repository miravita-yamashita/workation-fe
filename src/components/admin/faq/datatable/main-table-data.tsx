import { MainTable } from "@/components/feature/datatable";
import { AdminFaqColumnType, columns } from "./columns";

import { AdminFaqListDataType } from "../lib/types";

type MainTableDataProps = {
  data: AdminFaqListDataType[];
};

const getData = (data: AdminFaqListDataType[]): AdminFaqColumnType[] => {
  if (!data) return [];

  return data?.map((data) => {
    const { id, question, answer, category, created_at_list } = data || {};

    return {
      id: id?.toString(),
      question: question || "",
      answer: answer || "",
      categories: Array.isArray(category)
        ? category.join(", ")
        : category || "",
      createdDate: created_at_list || "",
    };
  });
};

export const MainTableData = ({ data }: MainTableDataProps) => {
  return (
    <div className="relative">
      <MainTable
        columns={columns}
        data={getData(data)}
        detailLinkBase=""
        containsEdit={true}
      />
    </div>
  );
};
