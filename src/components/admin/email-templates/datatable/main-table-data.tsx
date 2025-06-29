import { MainTable } from "@/components/feature/datatable";
import { AdminEmailTemplatesColumnType, columns } from "./columns";
import { AdminEmailtemplatesListDataType } from "../lib/types";

type MainTableDataProps = {
  data: AdminEmailtemplatesListDataType[];
};

const getData = (
  data: AdminEmailtemplatesListDataType[],
): AdminEmailTemplatesColumnType[] => {
  if (!data) return [];
  return data?.map((data) => {
    const { id, name, content } = data || {};

    return {
      id: id?.toString(),
      templateName: name || "",
      body: content || "",
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
