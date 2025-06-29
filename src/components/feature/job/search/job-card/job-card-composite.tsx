"use client";

import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  JobCard,
  JobCardActions,
  JobCardAttribute,
  JobCardAttributes,
  JobCardBadge,
  JobCardMetadata,
  JobCardTag,
  JobCardTags,
  JobCardThumbnail,
  JobCardTitle,
} from "@/components/feature/job/search/job-card";
import IconStar from "@public/icon-star.svg";
import IconChevronRight from "@public/icon-chevron-right.svg";
import IconMarker from "@public/icon-marker.svg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ColumnContainer, ColumnItem } from "@/components/feature/common";
import { JobDetailType } from "../result/lib";
import Link from "next/link";
import { useKeepJob } from "@components/feature/job/keep";
import { useSearchParams } from "next/navigation";
import ImageNoPhoto from "@public/image-no-photo.jpg";
import { handleSalaryRangeDisplay } from "@components/feature/job";

export const JobCardComposite = ({
  className,
  data,
}: CommonProps & {
  data: JobDetailType;
}) => {
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();
  const {
    name,
    position_images,
    occupational_categories,
    facility,
    recommended_salary,
    contract_categories,
    recruitment_categories,
    area,
    address_city,
    address_street,
    salary_min = "",
    salary_max = "",
    bonus,
    holiday,
    working_hours = "",
    assignment_categories,
    medical_subject_categories,
    id,
    keep_flag,
  } = data;
  const { isLoading, handleAddToFavorites, isFavorite } = useKeepJob({
    jobId: id,
    isAlreadyFavorite: keep_flag,
  });

  const combinedWorkingHours = `${working_hours}`;
  const salaryRange = handleSalaryRangeDisplay({
    minSalary: salary_min,
    maxSalary: salary_max,
  });

  return (
    <JobCard className={cn("", className)}>
      <ColumnContainer className="flex-col lg:flex-row lg:gap-10">
        <ColumnItem>
          <div className="flex justify-center">
            <JobCardThumbnail>
              <Image
                src={position_images[0] || ImageNoPhoto}
                alt="job thumbnail"
                fill
                sizes="100%"
                className="object-cover"
              />
            </JobCardThumbnail>
          </div>
          <JobCardActions className="mb-[1.875rem]">
            <Button
              type="button"
              variant="form"
              size="auto"
              className="h-10 w-full gap-2.5 bg-pink-200 lg:h-[3.125rem]"
              onClick={handleAddToFavorites}
              disabled={isLoading || isFavorite}
            >
              <Image src={IconStar} alt="star" />
              {isFavorite ? "キープ済" : "キープする"}
            </Button>
            <Button
              type="button"
              variant="form"
              size="auto"
              className="h-10 w-full gap-2.5 bg-pink-200 text-[.9375rem] leading-none lg:h-[3.125rem]"
              asChild
            >
              <Link href={`/result/${data.id}?${searchParamsString}`}>
                この求人を詳しく見る
                <Image
                  src={IconChevronRight}
                  alt="arrow right"
                  width={5}
                  height={10}
                  className="shrink-0"
                />
              </Link>
            </Button>
          </JobCardActions>
        </ColumnItem>
        <ColumnItem className="w-full min-w-0">
          <section className="space-y-2.5">
            {!!occupational_categories?.length && (
              <JobCardTags>
                {occupational_categories?.map((category) => (
                  <JobCardTag key={category.id}>{category.name}</JobCardTag>
                ))}
              </JobCardTags>
            )}
            <JobCardTitle className="max-w-[25.625rem]">{name}</JobCardTitle>
            <JobCardMetadata>
              <span>{facility?.name ?? "-"}</span>
              <div className="flex gap-1.5">
                <Image src={IconMarker} alt="icon" height={18} width={14} />
                <span>{area?.label ?? "-"}</span>
              </div>
            </JobCardMetadata>
            <div className="flex gap-1">
              <JobCardBadge className="shrink-0">
                {recommended_salary ?? "-"}
              </JobCardBadge>
              <JobCardBadge>{contract_categories?.name ?? "-"}</JobCardBadge>
            </div>

            <JobCardAttributes>
              <JobCardAttribute>
                <span className="font-bold">募集形態</span>
                <span>
                  {recruitment_categories?.length
                    ? recruitment_categories
                        ?.map((category) => category.name)
                        .join(", ")
                    : "-"}
                </span>
              </JobCardAttribute>
              <JobCardAttribute>
                <span className="font-bold">診療科目</span>
                <span>
                  {medical_subject_categories?.length
                    ? medical_subject_categories
                        ?.map((category) => category.name)
                        .join(", ")
                    : "-"}
                </span>
              </JobCardAttribute>
              <JobCardAttribute>
                <span className="font-bold">配属</span>
                <span>
                  {assignment_categories?.length
                    ? assignment_categories
                        ?.map((category) => category.name)
                        .join(", ")
                    : "-"}
                </span>
              </JobCardAttribute>
              <JobCardAttribute>
                <span className="font-bold">住所</span>
                <span>
                  {[area.label, address_city, address_street]
                    .filter((data) => Boolean(data))
                    .join(" ") ?? "-"}
                </span>
              </JobCardAttribute>
              <JobCardAttribute>
                <span className="font-bold">給与</span>
                <span>{salaryRange}</span>
              </JobCardAttribute>
              <JobCardAttribute>
                <span className="font-bold">賞与</span>
                <span>{bonus ?? "-"}</span>
              </JobCardAttribute>
              <JobCardAttribute>
                <span className="font-bold">勤務時間</span>
                <span>
                  {combinedWorkingHours.trim() ? combinedWorkingHours : "-"}
                </span>
              </JobCardAttribute>
              <JobCardAttribute>
                <span className="font-bold">休日</span>
                <span>{holiday ?? "-"}</span>
              </JobCardAttribute>
            </JobCardAttributes>
          </section>
        </ColumnItem>
      </ColumnContainer>
    </JobCard>
  );
};
