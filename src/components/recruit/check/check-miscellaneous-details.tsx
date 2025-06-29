"use client";

import { useJobDetailsStore } from "@/components/feature/form/form-job";
import {
  MiscellaneousJob,
  MiscellaneousJobHeader,
  MiscellaneousJobContent,
  MiscellaneousJobKey,
  MiscellaneousJobValue,
} from "@/components/feature/job";

export const CheckMiscellaneousDetails = () => {
  const jobDetailsValues = useJobDetailsStore.getState().jobDetails;
  const {
    jobTitle,
    eligibility,
    jobDescription,
    workingHours,
    salaryIncrease,
  } = jobDetailsValues;

  return (
    <MiscellaneousJob className="w-full lg:mt-5">
      <MiscellaneousJobHeader className="items-center rounded-t-xl bg-coral-200 px-[.875rem] py-5 font-bold text-pink-200 lg:px-[1.875rem] lg:py-[.8438rem] lg:text-[1.375rem] lg:leading-[2.0625rem]">
        職務内容
      </MiscellaneousJobHeader>
      <MiscellaneousJobContent className="gap-[.625rem] p-5">
        <MiscellaneousJobKey>求人タイトル</MiscellaneousJobKey>
        <MiscellaneousJobValue>{jobTitle}</MiscellaneousJobValue>
        <MiscellaneousJobKey>応募資格</MiscellaneousJobKey>
        <MiscellaneousJobValue>{eligibility}</MiscellaneousJobValue>
        <MiscellaneousJobKey>職務内容</MiscellaneousJobKey>
        <MiscellaneousJobValue>{jobDescription}</MiscellaneousJobValue>
        <MiscellaneousJobKey>勤務時間</MiscellaneousJobKey>
        <MiscellaneousJobValue>{workingHours}</MiscellaneousJobValue>
        <MiscellaneousJobKey>昇給・賞与</MiscellaneousJobKey>
        <MiscellaneousJobValue>{salaryIncrease}</MiscellaneousJobValue>
      </MiscellaneousJobContent>
    </MiscellaneousJob>
  );
};
