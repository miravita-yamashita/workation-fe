import { MainTable } from "@/components/feature/datatable";
import { AdminStaticPageColumnType, columns } from "./columns";
import { AdminStaticPageListDataType } from "./lib/types";

type MainTableDataProps = {
  data: AdminStaticPageListDataType[];
};

const getData = (
  data: AdminStaticPageListDataType[],
): AdminStaticPageColumnType[] => {
  if (!data) return [];
  return data?.map((data) => {
    const {
      id,
      title,
      slug,
      visits,
      author,
      created_at_list,
      updated_at_list,
    } = data || {};

    return {
      id: id?.toString(),
      title: title || "",
      slug: slug || "",
      creator: author?.name || "",
      noOfViews: visits?.toString() || "",
      createdDate: created_at_list || updated_at_list || "",
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
