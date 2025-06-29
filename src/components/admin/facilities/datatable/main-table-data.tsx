import { MainTable } from "@/components/feature/datatable";
import { AdminFacilitiesColumnType, columns } from "./columns";
import { AdminFacilityDataType } from "../lib";

type MainTableDataProps = {
  data: AdminFacilityDataType[];
};

const getData = (
  data: AdminFacilityDataType[],
): AdminFacilitiesColumnType[] => {
  if (!data) return [];

  return data?.map((data) => {
    const { id, name, email, address_city, phone_number, no_openings } =
      data || {};

    return {
      id: id?.toString(),
      name: name || "",
      location: address_city || "",
      email: email || "",
      telephone: phone_number || "",
      number_of_job_openings: no_openings || 0,
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
