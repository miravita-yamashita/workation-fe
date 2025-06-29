"use client";

import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ResultActions, ResultButton } from "./result";
import { useRouter, useSearchParams } from "next/navigation";
import { JobSearchParamKey } from "../filter";

export const ResultActionComposite = ({ className }: CommonProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const toggleSort = (sortKey: JobSearchParamKey) => {
    const params = new URLSearchParams(searchParams.toString());

    let newSortValue = "";

    // Sort buttons are now simplified - they are always active (true) and cannot be toggled off
    newSortValue = "true";

    // Remove the other sort parameter to ensure only one is applied
    if (sortKey === JobSearchParamKey.Sort) {
      params.delete(JobSearchParamKey.SortSalary);
    } else {
      params.delete(JobSearchParamKey.Sort);
    }

    params.set(sortKey, newSortValue);
    router.push(`?${params.toString()}`);
  };

  return (
    <ResultActions className={cn("", className)}>
      <ResultButton
        className={cn("bg-pink-200", {
          "bg-shade-210 text-black":
            Boolean(searchParams.get(JobSearchParamKey.SortSalary)) !== false,
        })}
        handleClick={() => toggleSort(JobSearchParamKey.Sort)}
      >
        新着順
      </ResultButton>
      <ResultButton
        className={cn("bg-shade-210 font-medium text-black", {
          "bg-pink-200 text-white":
            Boolean(searchParams.get(JobSearchParamKey.SortSalary)) === true,
        })}
        handleClick={() => toggleSort(JobSearchParamKey.SortSalary)}
      >
        月収順
      </ResultButton>
    </ResultActions>
  );
};
