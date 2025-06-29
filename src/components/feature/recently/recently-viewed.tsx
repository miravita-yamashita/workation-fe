import {
  Contract,
  FacilityAreaBlock,
  JobName,
  JobTableData,
  RecommendedActions,
  RecruitmentCategories,
} from "@/components/feature/recommended/common";
import { AssignmentCategory } from "@/components/top/lib";
import noPhoto from "@public/image-no-photo.jpg";
import { ImageBlock, ImageItem } from "../common";
import { RecentlyViewed as RecentlyViewedType } from "./lib";

interface Data {
  title: string;
  content: string | AssignmentCategory[];
}

interface Props {
  jobs: RecentlyViewedType[];
}

export const RecentlyViewed = ({ jobs }: Props) => {
  return (
    <>
      {jobs.map((job) => {
        const tableData: Data[] = [
          {
            title: "募集形態",
            content:
              job?.recruitment_categories?.length > 0
                ? job.recruitment_categories.map((cat) => cat.name).join(", ")
                : "-",
          },
          {
            title: "診療科目",
            content:
              job?.medical_subject_categories?.length > 0
                ? job.medical_subject_categories
                    .map((cat) => cat.name)
                    .join(", ")
                : "-",
          },
          {
            title: "配属",
            content:
              job?.assignment_categories?.length > 0
                ? job.assignment_categories.map((cat) => cat.name).join(", ")
                : "-",
          },
          {
            title: "住所",
            content:
              [job?.address_street, job?.address_city, job?.area?.label]
                .filter(Boolean) // Remove null or undefined values
                .join(", ") || "-",
          },
          {
            title: "給与",
            content: `${job?.salary_min}円～${job?.salary_max}円` || "-",
          },
          { title: "賞与", content: job?.bonus || "-" },
          {
            title: "勤務時間",
            content:
              job?.working_hours && job?.work_time_notes
                ? `${job.working_hours} (${job.work_time_notes})`
                : job?.working_hours || job?.work_time_notes || "-",
          },
          { title: "休日", content: job?.holiday || "-" },
        ];
        return (
          <div
            key={job.id}
            className="mb-5 rounded-[.625rem] border-t-[.3125rem] border-pink-200 bg-white px-[.875rem] py-[.875rem] pb-[1.25rem] shadow-md lg:mb-10 lg:px-[1.875rem] lg:py-[1.875rem] lg:pb-[1.875rem] lg:shadow-sm"
          >
            <div className="flex-wrap gap-[1.875rem] lg:flex">
              <div className="lg:w-[24.49%]">
                <ImageBlock className="relative mx-auto mb-[1.25rem] h-[19.6875rem] w-full sm:w-[19.6875rem] lg:h-[15rem] lg:w-full">
                  <ImageItem
                    src={job.position_images[0] || noPhoto.src}
                    altText="job image"
                    className="object-cover"
                  />
                </ImageBlock>
                <RecommendedActions
                  jobId={job.id}
                  isKeep={job?.keep_flag ? Boolean(job.keep_flag) : false}
                  layout="col"
                />
              </div>
              <div className="mt-5 flex-1 lg:mt-0">
                <RecruitmentCategories
                  size="md"
                  categories={job?.specific_condition_categories}
                />
                <JobName name={job?.name} size="md" />
                <FacilityAreaBlock
                  size="md"
                  facility={job.facility.name}
                  area={job?.area?.label}
                />
                <Contract
                  size="md"
                  contractType={job?.contract_categories}
                  salary={job?.recommended_salary}
                />
                <JobTableData tableData={tableData} />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
