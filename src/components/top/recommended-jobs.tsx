import {
  Contract,
  FacilityAreaBlock,
  JobName,
  RecruitmentCategories,
} from "@/components/feature/recommended/common";
import chevronIcon from "@public/icon-chevron-right.svg";
import sampleImage from "@public/image-no-photo.jpg";
import recommendedTitleImage from "@public/top/recommended-jobs-title.svg";
import Image from "next/image";
import Link from "next/link";
import { PositionType } from "../static-page";
import { Button } from "../ui/button";

type JobsType = {
  jobs?: PositionType[];
};

export const RecommendedJobs = ({ jobs }: JobsType) => {
  return (
    <section className="mb:mb-10 relative mb-[1.875rem] mt-[1.875rem] w-full rounded-[.625rem] bg-white p-[.625rem] pb-[1.875rem] md:p-10 md:pb-10 lg:mt-[5.625rem]">
      <div className="absolute left-0 right-0 top-[-0.8rem] text-center">
        <h1 className="section-eng-title inline-block rounded-3xl bg-blue-50 px-5 pb-[.3125rem] pt-[.4375rem] text-[.625rem] font-medium uppercase leading-[.75rem] tracking-[.20rem] text-blue-300">
          RECOMMENDED JOBS
        </h1>
      </div>
      <div className="text-center">
        <h2 className="pb-5 text-center text-[2.5rem] font-bold uppercase leading-[3.75rem] text-pink-200">
          <span className="hidden">おすすめ求人</span>
          <div className="relative mx-auto mt-4 h-[2.4375rem] w-[14.5625rem] md:mt-0 md:h-[3.75rem] md:w-[22rem]">
            <Image
              className="object-contain"
              src={recommendedTitleImage}
              fill
              sizes="100%"
              alt={`Recommended Jobs`}
            />
          </div>
        </h2>
      </div>
      <div>
        {jobs?.map((job) => {
          return (
            <Link
              href={`/result/${job?.id}`}
              key={job?.id}
              className="mb-[1.25rem] block rounded-xl bg-white px-[.875rem] py-[1.125rem] shadow-[0px_0px_16px_rgba(217,170,178,0.2)] md:px-5 md:py-4"
            >
              <div className="mb-3 flex justify-between gap-[.625rem] md:mb-0 md:gap-5">
                <div className="max-w-[6.25rem] flex-1">
                  <div className="relative h-[6.25rem] w-[6.25rem] md:h-[6.25rem] md:w-[6.25rem]">
                    <Image
                      className="object-cover"
                      src={job?.media?.featured[0]?.url || sampleImage}
                      fill
                      sizes="100%"
                      alt={`${job?.name}`}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <JobName name={job?.name} />

                  <FacilityAreaBlock
                    facility={job?.facility?.name}
                    area={job?.area?.label}
                  />
                  <RecruitmentCategories
                    categories={job?.specific_condition_categories}
                  />
                  <div className="hidden md:block">
                    <Contract
                      contractType={job?.contract_categories}
                      salary={job.recommended_salary}
                    />
                    {job?.description && (
                      <div className="line-clamp-3 text-[.625rem] font-medium leading-[1.125rem] text-black md:text-xs">
                        {job?.description}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="block md:hidden">
                <Contract
                  contractType={job?.contract_categories}
                  salary={job.recommended_salary}
                />
                {job?.description && (
                  <div className="line-clamp-3 text-[.625rem] font-medium leading-[1.125rem] md:text-xs">
                    {job?.description}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
        <div className="text-center">
          <Button
            asChild
            className="inline-flex min-w-[193px] items-center gap-[.625rem]"
          >
            <Link href="/recommended">
              <span>もっと見る</span>
              <div className="relative h-[.375rem] w-[.1875rem]">
                <Image
                  src={chevronIcon}
                  alt="chevron right icon"
                  priority={true}
                />
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
