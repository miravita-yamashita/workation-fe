import { JobDetailsPageType } from "../lib";
import { AdminJobsColumnType, columns } from "./columns";
import { MainTable } from "./main-table";

type MainTableDataProps = {
  data: JobDetailsPageType[];
};
const getData = (data: JobDetailsPageType[]): AdminJobsColumnType[] => {
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
      creationDate: created_at?.toString() || "",
    };
  });
};

export const MainTableData = async ({ data }: MainTableDataProps) => {
  return (
    <div className="relative mb-8 rounded">
      <MainTable
        columns={columns}
        data={getData(data)}
        detailLinkBase=""
        containsEdit={true}
      />
    </div>
  );
};
