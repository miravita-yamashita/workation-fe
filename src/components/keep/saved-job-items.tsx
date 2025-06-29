"use client";

import { openModalApplication } from "@/components/feature/modal/modal-application";
import {
  openModalMessage,
  ModalMessageVariant,
} from "../feature/modal/modal-message";
import {
  FacilityAreaBlock,
  JobName,
  JobTableData,
  RecruitmentCategories,
  Contract,
} from "@/components/feature/recommended/common";

import { AssignmentCategory } from "@/components/top/lib";
import { useToast } from "@/hooks/use-toast";
import iconMail from "@public/icon-mail.svg";
import iconTrash from "@public/icon-trash.svg";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { SavedJobActions } from ".";
import { MainBlock } from "../feature/common";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { KeepJobsType, removeJobs } from "./lib";
import { SavedJobNoResult } from "./saved-job-no-result";
import { SavedJobResults } from "./saved-job-results";
import { setEngagementCount } from "../feature/engagement";

interface Data {
  title: string;
  content: string | AssignmentCategory[];
}

interface Props {
  jobs: KeepJobsType[];
  count: { from: number; total: number };
}

export const SavedJobItems = ({ jobs, count }: Props) => {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const router = useRouter();
  const [savedJobs, setSavedJobs] = useState(
    jobs.map((job) => ({ ...job, checked: false })),
  );
  const [checkAll, setCheckAll] = useState(false);
  const [isClicked, setClicked] = useState(false);

  const selectedCount = savedJobs.filter((job) => job.checked).length;
  const selectedJobs = savedJobs
    .filter((job) => job.checked)
    .map((job) => ({ id: job.id, name: job.name }));

  const clearSelectedJobs = useCallback(
    () => () => {
      setSavedJobs(savedJobs.map((job) => ({ ...job, checked: false })));
      setCheckAll(false);
    },
    [savedJobs],
  );

  useEffect(() => {
    const reset = searchParams.get("reset");
    if (reset === "true") {
      clearSelectedJobs();
    }
  }, [searchParams, clearSelectedJobs]);

  const handleCheckAll = () => {
    const newCheckAllStatus = !checkAll;
    setCheckAll(newCheckAllStatus);
    setSavedJobs(
      savedJobs.map((job) => ({ ...job, checked: newCheckAllStatus })),
    );
  };

  const handleItemChange = (id: string) => {
    const updatedItems = savedJobs.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item,
    );
    setSavedJobs(updatedItems);

    const allChecked = updatedItems.every((item) => item.checked);
    setCheckAll(allChecked);
  };

  const handleOpenApplicationForm = (job?: KeepJobsType) => {
    if (job) {
      openModalApplication({ selectedJobs: [{ id: job.id, name: job.name }] });
      return;
    }
    if (selectedJobs.length === 0) {
      toast({
        title: "警告",
        description: "少なくとも1つの仕事を選択してください",
      });
      return;
    }
    openModalApplication({ selectedJobs: selectedJobs });
  };

  const handleOpenConfirmDeletion = () => {
    if (selectedCount === 0) {
      toast({
        title: "警告",
        description: "少なくとも1つの仕事を選択してください",
      });
      return;
    }
    const title = "";
    const message = "本当に削除してもよろしいですか?";

    openModalMessage({
      title,
      message,
      variant: ModalMessageVariant.Confirm,
      handler: () => onRemoveKeepJobs(),
    });
  };

  const onRemoveKeepJobs = async () => {
    const selectedIds = selectedJobs.map((job) => job.id);

    try {
      setClicked(true);
      const response = await removeJobs(selectedIds);

      if (response?.success) {
        const filteredJobs = savedJobs.filter(
          (job) => !selectedIds.includes(job.id),
        );
        setSavedJobs(filteredJobs);

        setEngagementCount("savedJob", filteredJobs.length);

        toast({
          title: "Success",
          description: "Successfully removed from favorites",
        });

        router.refresh();
      }

      if (response?.errors) {
        toast({
          title: "Error during removing to favorites",
          description:
            "An error occurred during the process. Please try again later.",
          variant: "destructive",
        });
      }

      setClicked(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      toast({
        title: "Error during removing to favorites",
        description: errorMessage,
      });
      setClicked(false);
    }
  };

  return (
    <>
      <MainBlock size="sm" className="px-4 lg:p-0">
        <div className="mt-5 bg-white md:mt-10">
          {count?.total === 0 ? (
            <SavedJobNoResult />
          ) : (
            <div className={savedJobs?.length === 0 ? "hidden" : ""}>
              <SavedJobResults count={savedJobs.length} total={count?.total} />
            </div>
          )}
        </div>
      </MainBlock>
      <div
        className={
          savedJobs?.length === 0
            ? "hidden bg-white md:bg-transparent"
            : "bg-white md:bg-transparent"
        }
      >
        <MainBlock size="sm" className="px-4 lg:p-0">
          <div className="bg-white px-0 py-[2.5rem] md:mx-0 md:bg-transparent lg:p-0">
            <div className="bg-white md:p-10">
              <div className="mb-[.875rem] items-center justify-between md:mb-5 md:flex">
                <div>
                  <p className="mb-[.875rem] md:mb-0">
                    <span className="text-[1.625rem] font-bold leading-[2.4375rem] text-pink-200">
                      {selectedCount}
                    </span>
                    <span className="font-bold text-pink-200">件</span>選択中
                  </p>
                </div>

                <div className="space- max-w-[46.1875rem] flex-1 gap-[.625rem] space-y-[.375rem] md:flex md:space-y-0">
                  <Button
                    className="h-[3.125rem] w-full flex-1 rounded-xl bg-pink-200 text-sm md:text-base"
                    size="lg"
                    onClick={() => handleOpenApplicationForm()}
                  >
                    <Image src={iconMail} alt="save icon" priority={true} />
                    チェックをしている求人に応募する
                  </Button>
                  <Button
                    className="h-[3.125rem] w-full flex-1 rounded-xl bg-shade-800 text-sm hover:bg-shade-600 md:text-base"
                    size="lg"
                    disabled={isClicked}
                    onClick={handleOpenConfirmDeletion}
                  >
                    <Image src={iconTrash} alt="details icon" priority={true} />
                    チェックをしている求人のキープを削除
                  </Button>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="flex gap-2">
                  <Checkbox
                    id="selectAll"
                    checked={checkAll}
                    onCheckedChange={handleCheckAll}
                  />
                  <label
                    aria-label="Select all"
                    htmlFor="selectAll"
                    className="text-sm font-medium leading-none underline peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    全てチェックする
                  </label>
                </div>
              </div>
              {savedJobs.map((job) => {
                const tableData: Data[] = [
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
                        ? job.assignment_categories
                            .map((cat) => cat.name)
                            .join(", ")
                        : "-",
                  },
                  { title: "勤務時間", content: job?.working_hours || "-" },
                  { title: "休日", content: job?.holiday || "-" },
                ];
                return (
                  <div
                    key={job.id}
                    className="my-5 overflow-hidden rounded-xl shadow-sm"
                  >
                    <div className="items-stretch md:flex">
                      <div className="flex-1 bg-white px-[.875rem] py-[.875rem] pb-[1.25rem] shadow-md lg:px-[1.875rem] lg:py-[1.875rem] lg:pb-[1.875rem] lg:shadow-sm">
                        <div className="mt-1 lg:mt-0">
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
                            salary={job.recommended_salary}
                          />
                          <JobTableData tableData={tableData} />
                          <SavedJobActions
                            action={handleOpenApplicationForm}
                            job={job}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-center bg-coral-100 md:w-14">
                        <div className="flex items-center gap-[.625rem] p-[.5938rem] md:block md:p-0">
                          <label
                            aria-label="Select job"
                            htmlFor={`job-${job.id}`}
                            className="block text-sm font-bold leading-none underline peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            削除
                          </label>
                          <Checkbox
                            id={`job-${job.id}`}
                            className="mx-auto block h-4 w-4 bg-white md:mt-2"
                            checked={job.checked}
                            onCheckedChange={() => handleItemChange(job.id)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </MainBlock>
      </div>
    </>
  );
};
