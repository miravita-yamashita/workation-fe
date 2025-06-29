import { MainTable } from "@/components/feature/datatable";
import { AdminInquiriesColumnType, columns } from "./columns";
import { AdminInquiriesListDataType } from "../lib/types";

type MainTableDataProps = {
  data: AdminInquiriesListDataType[];
};

const getData = (
  data: AdminInquiriesListDataType[],
): AdminInquiriesColumnType[] => {
  if (!data) return [];

  return data?.map((data) => {
    const {
      id,
      email,
      is_replied,
      given_name,
      lastname,
      created_at,
      form_type,
    } = data || {};

    return {
      id: id?.toString(),
      idNumber: id?.toString() || "",
      status: is_replied ? "返信済" : "未返信",
      type: form_type || "",
      name: `${lastname || ""} ${given_name || ""}`,
      email: email || "",
      dateOfReceipt: created_at || "",
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
