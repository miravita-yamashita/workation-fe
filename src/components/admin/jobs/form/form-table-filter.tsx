"use client";

import {
  adminDatatableFormSchema,
  GenericItemDataType,
  GenericItemsListDataType,
} from "@/components/feature/datatable";
import {
  AdminTableFiltersQueryKeys,
  getAdminTableFiltersQueryString,
} from "@/components/feature/datatable/lib/helper";
import {
  AdminFieldGenericSelect,
  FieldGenericInput,
} from "@/components/feature/form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CommonProps } from "@/lib/types";
import { cn, setQueryParamValue } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const FormTableFilter = ({
  className = "",
  facilityNameList,
  recommendationNameList,
  adminAreaNameList,
}: CommonProps & {
  facilityNameList: GenericItemsListDataType;
  recommendationNameList?: GenericItemsListDataType;
  adminAreaNameList?: GenericItemsListDataType;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof adminDatatableFormSchema>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(adminDatatableFormSchema),
    defaultValues: {
      freeWordSearch: "",
      facilityName: "",
      recommendationName: "",
      areaName: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof adminDatatableFormSchema>) => {
    setIsLoading(true);
    const { freeWordSearch, facilityName } = values;
    const queryString = getAdminTableFiltersQueryString({
      searchParams,
      queryParams: {
        [AdminTableFiltersQueryKeys.Search]: setQueryParamValue(
          freeWordSearch || "",
        ),
        [AdminTableFiltersQueryKeys.FacilityName]: setQueryParamValue(
          facilityName || "",
        ),
        [AdminTableFiltersQueryKeys.RecommendationName]: setQueryParamValue(
          values.recommendationName || "",
        ),
        [AdminTableFiltersQueryKeys.AreaName]: setQueryParamValue(
          values.areaName || "",
        ),
        page: "1",
      },
    });

    router.push(`${pathname}?${queryString}`);
    router.refresh();
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex h-full flex-wrap gap-5", className)}
      >
        {/* Search */}
        <FieldGenericInput
          formHook={form}
          formInputName="freeWordSearch"
          labelText=""
          placeholder="検索"
          variant="secondary"
          isAdmin={true}
          isSearchField={true}
          formLabelClassName="font-bold text-base"
          formItemClassName="space-y-0 "
          formInputClassName="h-full max-h-10"
        />
        {/* Facility */}
        <AdminFieldGenericSelect
          formHook={form}
          formInputName="facilityName"
          labelText=""
          selectPlaceholder="施設"
          variant="secondary"
          dropdownValues={facilityNameList.map((item: GenericItemDataType) => ({
            id: item.id.toString(),
            value: item.name,
            label: item.name,
          }))}
          selectTriggerClassName="border-shade-250 h-full max-h-10 gap-[9.25rem] text-shade-910"
        />

        {/* Recommendation */}
        <AdminFieldGenericSelect
          formHook={form}
          formInputName="recommendationName"
          labelText=""
          selectPlaceholder="おすすめ"
          variant="secondary"
          dropdownValues={
            recommendationNameList?.map((item: GenericItemDataType) => ({
              id: item.id.toString(),
              value: item.name,
              label: item.name,
            })) ?? []
          }
          selectTriggerClassName="border-shade-250 h-full max-h-10 gap-5 text-shade-910"
        />

        {/* Area */}
        <AdminFieldGenericSelect
          formHook={form}
          formInputName="areaName"
          labelText=""
          selectPlaceholder="エリア"
          variant="secondary"
          dropdownValues={
            adminAreaNameList?.map((item: GenericItemDataType) => ({
              id: item.id.toString(),
              value: item.name,
              label: item.name,
            })) ?? []
          }
          selectTriggerClassName="border-shade-250 h-full max-h-10 gap-5 text-shade-910"
        />

        {/* Buttons */}
        <div className="inline-flex flex-row justify-end lg:flex lg:flex-row">
          <Button
            type="submit"
            disabled={isLoading}
            className="h-full w-full rounded bg-blue-350 hover:bg-blue-350 lg:w-auto"
          >
            絞り込み
          </Button>
        </div>
      </form>
    </Form>
  );
};
