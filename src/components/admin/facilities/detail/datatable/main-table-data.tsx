import { MainTable } from "./main-table";
import { AdminJobsColumnType, columns } from "./columns";
import { AdminJobListDataType } from "../../lib";

type MainTableDataProps = {
  data: AdminJobListDataType[];
};
const getData = (data: AdminJobListDataType[]): AdminJobsColumnType[] => {
  if (!data) return [];

  return data?.map((data) => {
    const {
      id,
      name,
      job_number,
      contract_categories,
      area,
      created_at,
      specific_condition_categories,
    } = data || {};

    return {
      id: id?.toString(),
      jobNumber: job_number || "",
      jobTitle: name,
      contractType: contract_categories?.name,
      recommendation: specific_condition_categories
        ?.map((category) => category.name)
        ?.join(", "),
      area: area?.label || "",
      creationDate: created_at || "",
    };
  });
};

export const MainTableData = async ({ data }: MainTableDataProps) => {
  return (
    <div className="relative m-5 rounded border p-5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-base font-bold leading-[1.5rem]">求人情報</h2>
        <p className="text-sm font-medium">求人数：{data.length}件</p>
      </div>
      <MainTable
        columns={columns}
        data={getData(data)}
        detailLinkBase=""
        containsEdit={true}
      />
    </div>
  );
};
