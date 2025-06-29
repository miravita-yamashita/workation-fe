"use client";

import { ImageBlock, ImageItem, Block, Actions, NoDataFound } from "../common";
import {
  JobItem,
  JobItemImage,
  JobItemDetails,
  JobItemDetailsHeader,
  JobItemTags,
  JobItemTag,
  JobItemDescription,
} from "../job";
import { RelatedJob } from "./related-job";
import ImageNoPhoto from "@public/image-no-photo.jpg";
import IconPinMarker from "@public/icon-marker.svg";
import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useJobDetailsStore } from "../form";
import { getRelatedJobs, RelatedJobDataType } from "./lib";
import { useEffect, useState } from "react";
import Link from "next/link";
import IconCaretWhite from "@public/icon-caret-white.svg";

export const RelatedJobComposite = ({ className = "" }: CommonProps) => {
  const jobDetailsValues = useJobDetailsStore.getState().jobDetails;
  const { jobId } = jobDetailsValues;
  const [relatedJobs, setRelatedJobs] = useState<RelatedJobDataType[]>([]);

  useEffect(() => {
    const fetchRelatedJobs = async () => {
      const response = await getRelatedJobs(jobId);
      setRelatedJobs(response?.data);
    };
    fetchRelatedJobs();
  }, [jobId]);

  if (!relatedJobs) {
    return <NoDataFound className="my-5 p-5 text-center" />;
  }

  return (
    <>
      <RelatedJob
        className={cn("grid grid-cols-1 gap-5 lg:grid-cols-3", className)}
      >
        {relatedJobs?.map((job) => {
          const specificConditions = job?.specific_condition_categories;
          const contractCategories = job?.contract_categories;
          const salaryRangeTag = `月給${job?.salary_min}万〜${job?.salary_max}万`;
          const jobImage = job?.position_images[0];
          return (
            <JobItem
              className="rounded-xl bg-transparent p-5 shadow-lg"
              key={job?.id}
            >
              <JobItemImage className="mb-[.625rem]">
                <ImageBlock className="h-[10.625rem] w-full">
                  <ImageItem
                    src={jobImage || ImageNoPhoto?.src}
                    altText="image no photo"
                    className="object-cover"
                  />
                </ImageBlock>
              </JobItemImage>
              <JobItemDetails className="flex flex-col gap-[.375rem]">
                <JobItemDetailsHeader>
                  <h3 className="line-clamp-1 text-sm font-bold">
                    {job?.job_title}
                  </h3>
                  <Block className="mt-1 flex items-center justify-between border-b pb-[.375rem]">
                    <p className="line-clamp-1 text-xs">
                      {job?.facility?.name}
                    </p>
                    <Block className="flex items-center gap-[.3125rem]">
                      <ImageBlock className="h-[1.125rem] w-[.875rem]">
                        <ImageItem
                          src={IconPinMarker}
                          altText="icon pin marker"
                        />
                      </ImageBlock>
                      <p className="text-xs">{job?.area?.label}</p>
                    </Block>
                  </Block>
                </JobItemDetailsHeader>
                <JobItemTags className="mb-[.375rem] flex-wrap text-[.625rem] lg:text-base">
                  {specificConditions?.map((condition) => (
                    <JobItemTag key={condition?.id}>
                      {condition?.name}
                    </JobItemTag>
                  ))}
                  <JobItemTag className="bg-blue-300 font-bold text-white">
                    {salaryRangeTag}
                  </JobItemTag>
                  <JobItemTag className="bg-blue-300 font-bold text-white">
                    {contractCategories?.name}
                  </JobItemTag>
                </JobItemTags>
                <JobItemDescription className="line-clamp-3 text-xs leading-[1.375rem]">
                  {job?.description}
                </JobItemDescription>
              </JobItemDetails>
            </JobItem>
          );
        })}
      </RelatedJob>
      <Actions className="mt-5 justify-center">
        <Link
          href="/result"
          className="m-auto flex max-w-[fit-content] items-center justify-center gap-[.625rem] rounded-full bg-red-100 px-[3.75rem] py-[.625rem] text-white"
        >
          <Block className="text-xs font-bold">もっと見る</Block>

          <ImageBlock className="h-[.5rem] w-[.5rem]">
            <ImageItem src={IconCaretWhite} altText="icon caret" />
          </ImageBlock>
        </Link>
      </Actions>
    </>
  );
};
