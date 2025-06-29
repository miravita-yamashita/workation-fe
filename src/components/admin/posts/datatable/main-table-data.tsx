import { MainTable } from "@/components/feature/datatable";
import { AdminPostsColumnType, columns } from "./columns";
import { PostDetailDataType } from "../detail";

type MainTableDataProps = {
  data: PostDetailDataType[];
};

const getData = (
  data: PostDetailDataType[],
  recommendedArticleCount: number,
): AdminPostsColumnType[] => {
  if (!data) return [];

  return data?.map((data) => {
    const {
      id,
      title,
      number_of_visit,
      created_at,
      author,
      article_categories,
      is_recommended,
    } = data || {};

    return {
      id: id?.toString(),
      isRecommended: is_recommended,
      title: title || "",
      creator: author?.name || "",
      createdOrUpdatedDate: created_at || "",
      category:
        article_categories?.map((category) => category?.name).join(", ") || "",
      noOfViews: number_of_visit || 0,
      recommendedArticleCount,
    };
  });
};

export const MainTableData = ({
  data,
  recommendedArticleCount,
}: MainTableDataProps & {
  recommendedArticleCount: number;
}) => {
  return (
    <div className="relative">
      <MainTable
        columns={columns}
        data={getData(data, recommendedArticleCount)}
        detailLinkBase=""
        containsEdit={true}
      />
    </div>
  );
};
