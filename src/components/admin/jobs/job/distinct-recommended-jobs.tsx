"use client";

import { UseFormReturn } from "react-hook-form";
import { useState, useMemo, useCallback } from "react";
import { JobSelectOptionsType } from "./lib";
import { AdminFieldGenericSelect } from "@/components/feature/form";
import { FieldLabelGroup } from "@/components/feature/form";
import { SectionHeading } from "@/components/feature/common/section-heading";

type Props = {
  // eslint-disable-next-line
  formHook: UseFormReturn<any>;
  recommendedJobs: JobSelectOptionsType[];
};

type SelectedValuesType = {
  recommendedJobOne: string | number | null;
  recommendedJobTwo: string | number | null;
  recommendedJobThree: string | number | null;
};

export const DistinctRecommendedJobs = ({
  formHook,
  recommendedJobs,
}: Props) => {
  const [selectedValues, setSelectedValues] = useState<SelectedValuesType>({
    recommendedJobOne: null,
    recommendedJobTwo: null,
    recommendedJobThree: null,
  });

  const selectedIds = useMemo(
    () => new Set(Object.values(selectedValues).filter(Boolean)),
    [selectedValues],
  );

  const handleSelectChange = useCallback(
    (field: keyof SelectedValuesType, value: string | number | null) => {
      setSelectedValues((prevState) => {
        if (prevState[field] === value) return prevState;
        return { ...prevState, [field]: value };
      });
    },
    [],
  );

  const getFilteredOptions = useCallback(
    (currentValue: string | number | null): JobSelectOptionsType[] => {
      return recommendedJobs.filter(
        (option) => !selectedIds.has(option.id) || option.id === currentValue,
      );
    },
    [recommendedJobs, selectedIds],
  );

  return (
    <>
      <SectionHeading title="求人情報に表示するおすすめ求人" />
      {(
        [
          "recommendedJobOne",
          "recommendedJobTwo",
          "recommendedJobThree",
        ] as const
      ).map((field, index) => (
        <FieldLabelGroup
          key={field}
          className={index === 0 ? "" : "!mt-[.375rem]"}
        >
          <AdminFieldGenericSelect
            formHook={formHook}
            formInputName={field}
            labelText={index === 0 ? "求人タイトル" : ""}
            selectPlaceholder="選択してください"
            variant="secondary"
            isAdmin={true}
            dropdownValues={getFilteredOptions(selectedValues[field])}
            formLabelClassName="font-bold text-base"
            selectTriggerClassName="!rounded-[.3125rem] h-[2.8125rem] border-[#cccccc]"
            onChange={(value) => handleSelectChange(field, value)}
          />
        </FieldLabelGroup>
      ))}
    </>
  );
};
