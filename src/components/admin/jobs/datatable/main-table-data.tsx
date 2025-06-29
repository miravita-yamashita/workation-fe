import {
  getAdminAreaNameList,
  MainTable,
} from "@/components/feature/datatable";
import { AdminJobsColumnType, columns } from "./columns";
import { FormTableFilter } from "../form";
import { AdminJobListDataType } from "../lib/types";
import { getAdminFacilityNameList } from "../../facilities";
import { getFilterCategoryNameList } from "@/components/feature/top";

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
      facility,
      area,
      created_at,
      specific_condition_categories,
    } = data || {};

    return {
      id: id?.toString(),
      name,
      facility: facility?.name,
      jobNumber: job_number || "",
      jobTitle: name,
      facilityName: facility?.name,
      recommendation: specific_condition_categories
        ?.map((category) => category.name)
        ?.join(", "),
      area: area?.label || "",
      creationDate: created_at || "",
    };
  });
};

export const MainTableData = async ({ data }: MainTableDataProps) => {
  const [
    adminFacilityNameListResponse,
    filterCategoryNameListResponse,
    adminAreaNameListResponse,
  ] = await Promise.all([
    getAdminFacilityNameList(),
    getFilterCategoryNameList(),
    getAdminAreaNameList(),
  ]);
  const { data: facilityNameList = [] } = adminFacilityNameListResponse ?? {};
  const { data: filterCategoryNameList } = filterCategoryNameListResponse || {};
  const recommendationNameList = filterCategoryNameList?.specific || [];
  const { data: adminAreaNameList = [] } = adminAreaNameListResponse ?? {};

  return (
    <div className="relative">
      <MainTable
        columns={columns}
        data={getData(data)}
        detailLinkBase=""
        containsEdit={true}
        bulkDeleteEndpoint="/job/delete"
        filter={
          <FormTableFilter
            facilityNameList={facilityNameList}
            recommendationNameList={recommendationNameList}
            adminAreaNameList={adminAreaNameList}
            className="pb-5"
          />
        }
      />
    </div>
  );
};
