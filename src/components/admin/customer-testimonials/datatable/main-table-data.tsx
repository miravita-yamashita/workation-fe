import { MainTable } from "@/components/feature/datatable";
import { AdminCustomerTestimonialsColumnType, columns } from "./columns";
import { AdminCustomerTestimonialListDataType } from "../lib";
import { formatStarRating } from "@/lib/utils";

type MainTableDataProps = {
  data: AdminCustomerTestimonialListDataType[];
};

const getData = (
  data: AdminCustomerTestimonialListDataType[],
): AdminCustomerTestimonialsColumnType[] => {
  if (!data) return [];

  return data?.map((data) => {
    const {
      id,
      name,
      title,
      rating,
      created_at_list,
      updated_at_list,
      status,
    } = data || {};

    return {
      id: id?.toString(),
      name: name || "",
      reputation: formatStarRating(rating) || "",
      title: title || "",
      createdDate: created_at_list || updated_at_list || "",
      status: status?.status || "",
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
