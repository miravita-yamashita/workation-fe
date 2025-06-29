"use client";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getJobSearchResults,
  CategoryKeyValue,
  topSearchFormSchema,
} from "./lib";
import {
  FieldBlock,
  FieldHorizontalRuleBlock,
  LabelBlock,
  LabelFieldBlock,
} from "../common";
import { FieldGenericInput, FieldMultipleCheckbox } from "../form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { PropsWithChildren, useRef, useState } from "react";
import { checkIfFormHasNoValues, cn, setQueryParamValue } from "@/lib/utils";
import { getTopSearchQueryString, TopSearchQueryKeys } from "./lib/helper";
import { useRouter } from "next/navigation";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const FormTopSearch = ({
  className = "",
  jobSearchCheckboxValues,
  commitmentSearchCheckboxValues,
}: CommonProps & {
  jobSearchCheckboxValues: CategoryKeyValue[];
  commitmentSearchCheckboxValues: CategoryKeyValue[];
}) => {
  const [searchResultsCount, setSearchResultsCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const delayRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const form = useForm<z.infer<typeof topSearchFormSchema>>({
    resolver: zodResolver(topSearchFormSchema),
    defaultValues: {
      freeWordSearch: "",
      jobSearchCheckboxItems: [],
      commitmentCheckboxItems: [],
    },
  });

  const onSubmit = (data: z.infer<typeof topSearchFormSchema>) => {
    const {
      jobSearchCheckboxItems = [],
      commitmentCheckboxItems = [],
      freeWordSearch,
    } = data;

    // Construct query string for search
    const queryString = getTopSearchQueryString({
      queryParams: {
        [TopSearchQueryKeys.Categories]: setQueryParamValue(
          (jobSearchCheckboxItems || []).join(","),
        ),
        [TopSearchQueryKeys.Commitment]: setQueryParamValue(
          (commitmentCheckboxItems || []).join(","),
        ),
        [TopSearchQueryKeys.Name]: setQueryParamValue(freeWordSearch ?? ""),
      },
    });

    const formattedQueryString = new URLSearchParams(queryString).toString();

    router.push(`/result?${formattedQueryString}`);
  };

  const triggerFormSubmit = async () => {
    setIsLoading(true);
    const isValid = await form.trigger();
    if (isValid) {
      const data = form.getValues();
      const {
        jobSearchCheckboxItems = [],
        commitmentCheckboxItems = [],
        freeWordSearch,
      } = data;

      // If the form has no valid values, reset the result count and stop loading
      if (checkIfFormHasNoValues(data)) {
        setSearchResultsCount(0);
        setIsLoading(false);
        return;
      }

      // Construct query string for search
      const queryString = getTopSearchQueryString({
        queryParams: {
          [TopSearchQueryKeys.Categories]: setQueryParamValue(
            (jobSearchCheckboxItems || []).join(","),
          ),
          [TopSearchQueryKeys.Commitment]: setQueryParamValue(
            (commitmentCheckboxItems || []).join(","),
          ),
          [TopSearchQueryKeys.Name]: setQueryParamValue(freeWordSearch ?? ""),
        },
      });

      const formattedQueryString = new URLSearchParams(queryString).toString();

      try {
        const searchResultCount =
          await getJobSearchResults(formattedQueryString);
        setSearchResultsCount(searchResultCount?.count);
      } catch (error) {
        console.error("Error fetching job search results: ", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        className={cn(
          "mx-0 rounded-[1.25rem] p-5 shadow-[0_4px_20px_rgba(145,145,145,0.15)] lg:mx-4 lg:p-[1.875rem] xl:mx-0",
          className,
        )}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <LabelFieldBlock className="mb-[1.625rem]">
          <LabelBlock
            variant="empty"
            className="gap-[.75rem] whitespace-nowrap text-black"
          >
            フリーワードで探す
            <FieldHorizontalRuleBlock />
          </LabelBlock>
          <FieldGenericInput
            formHook={form}
            formInputName="freeWordSearch"
            labelText=""
            formItemClassName="w-full"
            placeholder="宮古島"
            isSearchField={true}
            isReadOnly={isLoading}
            onChange={() => {
              clearTimeout(delayRef.current);

              delayRef.current = setTimeout(() => {
                triggerFormSubmit();
              }, 400);
            }}
          />
        </LabelFieldBlock>

        <LabelFieldBlock className="mb-[1.625rem]">
          <LabelBlock
            variant="empty"
            className="mb-3 gap-[.75rem] whitespace-nowrap text-black"
          >
            職種検索条件
            <FieldHorizontalRuleBlock />
          </LabelBlock>
          <FieldBlock className="lg:p-0">
            {/* Checkbox */}
            <FieldMultipleCheckbox
              formHook={form}
              formInputName="jobSearchCheckboxItems"
              items={jobSearchCheckboxValues}
              hideTick={false}
              onChange={triggerFormSubmit}
              disabled={isLoading}
            />
          </FieldBlock>
        </LabelFieldBlock>

        {/* CHECKBOX WITHOUT TICK */}
        <LabelFieldBlock className="mb-[1.625rem]">
          <LabelBlock
            variant="empty"
            className="mb-3 gap-[.75rem] whitespace-nowrap text-black"
          >
            よく選ばれているこだわり検索条件
            <FieldHorizontalRuleBlock />
          </LabelBlock>
          <FieldBlock className="lg:p-0">
            {/* Checkbox */}
            <FieldMultipleCheckbox
              formHook={form}
              formInputName="commitmentCheckboxItems"
              items={commitmentSearchCheckboxValues}
              hideTick={true}
              onChange={triggerFormSubmit}
              disabled={isLoading}
            />
          </FieldBlock>
        </LabelFieldBlock>

        <Button
          type="submit"
          className="flex h-full max-h-[3.125rem] w-full flex-col p-4 text-sm font-bold hover:bg-red-200 lg:gap-1"
          disabled={isLoading}
        >
          <span>この条件で検索</span>
          <span>{searchResultsCount ? `${searchResultsCount}件` : "(0)"}</span>
        </Button>
      </form>
    </Form>
  );
};
