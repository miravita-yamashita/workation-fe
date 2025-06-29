import { MainTable } from "@/components/feature/datatable";
import { AdminUserMgtListColumnType, columns } from "./columns";
import { AdminUserListDataType } from "../lib/types";

type MainTableDataProps = {
  data: AdminUserListDataType[];
};

const getData = (
  data: AdminUserListDataType[],
): AdminUserMgtListColumnType[] => {
  if (!data) return [];

  return data?.map((data) => {
    const { id, name, email, role } = data || {};

    return {
      id: id?.toString(),
      name,
      email,
      authority: role,
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
