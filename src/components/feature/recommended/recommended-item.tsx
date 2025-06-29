import { AssignmentCategory } from "@/components/top/lib";
import iconLike from "@public/icon-like-green.svg";
import { ImageBlock, ImageItem } from "../common";

import {
  Contract,
  FacilityAreaBlock,
  JobName,
  JobTableData,
  RecommendedActions,
  RecruitmentCategories,
} from "@/components/feature/recommended/common";

import { PositionType } from "@/components/static-page";
import { RecommendedGallery } from "./recommended-gallery";

interface Data {
  title: string;
  content: string | AssignmentCategory[];
}

interface Props {
  job: PositionType;
}

export const RecommendedItem = ({ job }: Props) => {
  const tableData: Data[] = [
    { title: "給与", content: job?.recommended_salary || "" },
    { title: "賞与", content: job?.bonus || "" },
    {
      title: "募集形態",
      content:
        job?.recruitment_categories?.length > 0
          ? job.recruitment_categories.map((cat) => cat.name).join(", ")
          : "",
    },
    {
      title: "配属",
      content:
        job?.assignment_categories?.length > 0
          ? job.assignment_categories.map((cat) => cat.name).join(", ")
          : "",
    },
    {
      title: "住所",
      content:
        [job?.area?.label, job?.address_city, job?.address_street]
          .filter((value) => value?.trim())
          .join(", ") || "",
    },
    { title: "アクセス", content: job?.access || "" },
    {
      title: "診療科目",
      content:
        job?.medical_subject_categories?.length > 0
          ? job.medical_subject_categories.map((cat) => cat.name).join(", ")
          : "",
    },
  ];

  return (
    <div>
      <div className="mb-5 rounded-[.625rem] border-t-[.3125rem] border-pink-200 bg-white px-[.875rem] py-[.875rem] pb-[1.25rem] lg:mb-10 lg:px-[1.875rem] lg:py-[1.875rem] lg:pb-[1.875rem]">
        <div className="flex-wrap gap-[2%] pb-5 lg:flex lg:pb-[1.875rem]">
          <div className="lg:w-[57.15%]">
            <h2 className="pb-[.625rem] text-lg font-bold leading-[1.6875rem] lg:text-xl lg:leading-[1.875rem]">
              {job?.name}
            </h2>

            <p className="pb-6 text-xs font-medium leading-[1.375rem] lg:pb-10 lg:text-sm lg:leading-[1.375rem]">
              {job?.description}
            </p>

            <h3 className="mb-[.625rem] bg-green-500 px-[.625rem] py-1 text-sm font-bold text-white">
              おすすめポイント
            </h3>
            <div className="gap-[.625rem] pb-[.3125rem] lg:flex lg:pb-0">
              {job?.recommendation_point_1 && (
                <div className="mb-[.625rem] flex flex-1 gap-[.6875rem] rounded-lg border border-shade-250 p-[.625rem]">
                  <div>
                    <ImageBlock className="relative h-[3.25rem] w-[3.25rem]">
                      <ImageItem src={iconLike} altText="like icon point" />
                    </ImageBlock>
                  </div>
                  <div>
                    <h3 className="pb-[.125rem] font-albertsans text-base font-bold leading-[1.1875rem]">
                      POINT 01
                    </h3>
                    <p className="text-sm font-medium leading-[1.0625rem]">
                      {job.recommendation_point_1}
                    </p>
                  </div>
                </div>
              )}

              {job?.recommendation_point_2 && (
                <div className="mb-[.625rem] flex flex-1 gap-[.6875rem] rounded-lg border border-shade-250 p-[.625rem]">
                  <div>
                    <ImageBlock className="relative h-[3.25rem] w-[3.25rem]">
                      <ImageItem src={iconLike} altText="like icon point" />
                    </ImageBlock>
                  </div>
                  <div>
                    <h3 className="pb-[.125rem] font-albertsans text-base font-bold leading-[1.1875rem]">
                      POINT 02
                    </h3>
                    <p className="text-sm font-medium leading-[1.0625rem]">
                      {job.recommendation_point_2}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="lg:w-[40.817%]">
            <RecommendedGallery jobGallery={job.position_images} />
          </div>
        </div>
        <div>
          <JobName name={job?.name} size="md" />
          <FacilityAreaBlock
            size="md"
            facility={job.facility.name}
            area={job?.area?.label}
          />
          <RecruitmentCategories
            size="md"
            categories={job?.specific_condition_categories}
          />

          <Contract
            size="md"
            contractType={job?.contract_categories}
            salary={job?.recommended_salary}
          />
          <JobTableData tableData={tableData} />
          <RecommendedActions
            jobId={job.id}
            isKeep={job?.keep_flag ? Boolean(job.keep_flag) : false}
          />
        </div>
      </div>
    </div>
  );
};
