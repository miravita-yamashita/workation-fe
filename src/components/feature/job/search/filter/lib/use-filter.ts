"use client";

import { useFieldArray, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  PrefectureByRegionShapeSchema,
  searchFilterFormSchema,
} from "./form-schema";
import { JobFiltersResponseType } from "./types";
import { NEW_INFORMATION } from "./static-values";
import {
  addDefaultValueFalse,
  buildJobSearchQueryString,
  resetPrefectureByRegion,
} from "./utils";
import { useEffect, useRef, useState } from "react";
import { getJobSearch } from "@components/feature/job/search/result";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export const useFilter = ({
  form,
  prefectureByRegion,
  jobSearchFilter,
}: {
  form: UseFormReturn<z.infer<typeof searchFilterFormSchema>>;
  prefectureByRegion: z.infer<typeof PrefectureByRegionShapeSchema>[];
  jobSearchFilter: JobFiltersResponseType["data"];
}) => {
  const { control } = form;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [previewCount, setPreviewCount] = useState(0);
  const [accordionValues, setAccordionValues] = useState<string[]>([]);
  const delayRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const onSubmit = async (values: z.infer<typeof searchFilterFormSchema>) => {
    const queryString = buildJobSearchQueryString(values);

    router.push(`/result?${queryString}`);
  };

  const { fields: newInformation } = useFieldArray({
    name: "newInformation",
    control,
  });

  const { fields: specificSearchCriteria } = useFieldArray({
    name: "specificSearchCriteria",
    control,
  });

  const { fields: occupation } = useFieldArray({
    name: "occupation",
    control,
  });

  const { fields: contract } = useFieldArray({
    name: "contract",
    control,
  });

  const { fields: assignment } = useFieldArray({
    name: "assignment",
    control,
  });

  const { fields: workForm } = useFieldArray({
    name: "workForm",
    control,
  });

  const { fields: medicalSpecialty } = useFieldArray({
    name: "medicalSpecialty",
    control,
  });

  const { fields: facilityForm } = useFieldArray({
    name: "facilityForm",
    control,
  });

  const { fields: prefectures } = useFieldArray({
    name: "prefectures",
    control,
  });

  // this custom reset is created so that we only reset the form fields and not depending on the search param value
  const forceReset = () => {
    form.setValue("searchTerm", "");
    form.setValue("newInformation", [NEW_INFORMATION]);
    form.setValue(
      "specificSearchCriteria",
      addDefaultValueFalse(jobSearchFilter.specific ?? []),
    );
    form.setValue("monthlySalaryMin", "");
    form.setValue("monthlySalaryMax", "");

    form.setValue("prefectures", resetPrefectureByRegion(prefectureByRegion));
    setAccordionValues([]);

    form.setValue(
      "occupation",
      addDefaultValueFalse(jobSearchFilter.occupation ?? []),
    );
    form.setValue(
      "contract",
      addDefaultValueFalse(jobSearchFilter.contract ?? []),
    );
    form.setValue(
      "assignment",
      addDefaultValueFalse(jobSearchFilter.assignment ?? []),
    );
    form.setValue(
      "workForm",
      addDefaultValueFalse(jobSearchFilter.work_form ?? []),
    );
    form.setValue(
      "medicalSpecialty",
      addDefaultValueFalse(jobSearchFilter.medical_specialty ?? []),
    );
    form.setValue(
      "facilityForm",
      addDefaultValueFalse(jobSearchFilter.facility_form ?? []),
    );
  };

  // Handle preview count
  useEffect(() => {
    clearTimeout(delayRef.current);
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await getJobSearch(
          buildJobSearchQueryString(form.getValues()),
        );

        setPreviewCount(result?.count || 0);
      } catch (err) {
        toast({
          description: String(err),
        });
      } finally {
        setIsLoading(false);
      }
    };

    delayRef.current = setTimeout(() => {
      fetchData();
    }, 400);
  }, [form]);

  return {
    newInformation,
    specificSearchCriteria,
    occupation,
    contract,
    assignment,
    workForm,
    medicalSpecialty,
    facilityForm,
    prefectures,
    forceReset,
    isLoading,
    previewCount,
    onSubmit,
    accordionValues,
    setAccordionValues,
  };
};
