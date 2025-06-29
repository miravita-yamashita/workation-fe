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
  selectOptions: JobSelectOptionsType[];
};

type SelectedValuesType = {
  recommendationOne: string | number | null;
  recommendationTwo: string | number | null;
  recommendationThree: string | number | null;
  recommendationFour: string | number | null;
  recommendationFive: string | number | null;
};

export const DistinctSelectableOptions = ({
  formHook,
  selectOptions,
}: Props) => {
  const [selectedValues, setSelectedValues] = useState<SelectedValuesType>({
    recommendationOne: null,
    recommendationTwo: null,
    recommendationThree: null,
    recommendationFour: null,
    recommendationFive: null,
  });

  // Memoize selected values to avoid recalculating on each render
  const selectedIds = useMemo(
    () => new Set(Object.values(selectedValues).filter(Boolean)),
    [selectedValues],
  );

  // Function to handle selection changes (memoized)
  const handleSelectChange = useCallback(
    (field: keyof SelectedValuesType, value: string | number | null) => {
      setSelectedValues((prevState) => {
        if (prevState[field] === value) return prevState; // Prevent unnecessary updates
        return { ...prevState, [field]: value };
      });
    },
    [],
  );

  // Function to filter available options per dropdown (memoized)
  const getFilteredOptions = useCallback(
    (currentValue: string | number | null): JobSelectOptionsType[] => {
      return selectOptions.filter(
        (option) => !selectedIds.has(option.id) || option.id === currentValue,
      );
    },
    [selectOptions, selectedIds],
  );

  return (
    <>
      <SectionHeading title="おすすめ" />
      {(
        [
          "recommendationOne",
          "recommendationTwo",
          "recommendationThree",
          "recommendationFour",
          "recommendationFive",
        ] as const
      ).map((field, index) => (
        <FieldLabelGroup key={field} className="mb-5 mt-[.625rem]">
          <AdminFieldGenericSelect
            formHook={formHook}
            formInputName={field}
            labelText={`0${index + 1}`}
            selectPlaceholder="選択してください"
            variant="secondary"
            isAdmin={true}
            dropdownValues={getFilteredOptions(selectedValues[field])}
            formLabelClassName="font-bold text-base"
            onChange={(value) => handleSelectChange(field, value)}
            selectTriggerClassName="!rounded-[.3125rem] h-[2.8125rem] border-[#cccccc]"
          />
        </FieldLabelGroup>
      ))}
    </>
  );
};
