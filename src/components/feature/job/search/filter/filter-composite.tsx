"use client";

import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  Filter,
  FilterAccordion,
  FilterAccordionContent,
  FilterAccordionItem,
  FilterAccordionTrigger,
  FilterHeader,
  FilterSection,
  FilterSectionGroup,
  FilterSectionTitle,
} from "./filter";
import { Button } from "@/components/ui/button";
import { FieldHorizontalRuleBlock } from "@/components/feature/common";
import { z } from "zod";
import { searchFilterFormSchema } from "./lib/form-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FieldGenericInput } from "@components/feature/form";
import { useFilter } from "./lib/use-filter";
import { FieldGenericCheckbox } from "@/components/feature/form/field-generic-checkbox";
import {
  getPrefectureByRegion,
  JobFiltersResponseType,
  JobSearchParamKey,
  PrefectureResponseType,
  updateCheckboxPrefectureByRegionValues,
  updateCheckboxValues,
} from "./lib";
import { useSearchParams } from "next/navigation";
import { NEW_INFORMATION } from "./lib/static-values";

export const FilterComposite = ({
  className,
  jobSearchFilter,
  jobSearchPrefectures,
}: CommonProps & {
  jobSearchFilter: JobFiltersResponseType["data"];
  jobSearchPrefectures: PrefectureResponseType["data"];
}) => {
  const searchParams = useSearchParams();
  const monthlySalary = searchParams.get(JobSearchParamKey.MonthlySalary);
  const prefectureByRegion = getPrefectureByRegion(jobSearchPrefectures ?? []);
  const updatedPrefectureCheckboxValue = updateCheckboxPrefectureByRegionValues(
    prefectureByRegion,
    searchParams.get(JobSearchParamKey.Prefecture) || "",
  );
  const form = useForm<z.infer<typeof searchFilterFormSchema>>({
    resolver: zodResolver(searchFilterFormSchema),
    defaultValues: {
      searchTerm: searchParams.get(JobSearchParamKey.Name) || "",
      newInformation: [
        {
          ...NEW_INFORMATION,
          value: searchParams.get(JobSearchParamKey.NewInformation) === "true",
        },
      ], // Note: newInformation is just a static value as discussed with backend
      specificSearchCriteria: updateCheckboxValues(
        jobSearchFilter?.specific ?? [],
        searchParams.get(JobSearchParamKey.SpecificSearchCriteria) || "",
      ),
      monthlySalaryMin: monthlySalary
        ? monthlySalary.split(",")[0].toString()
        : "",
      monthlySalaryMax: monthlySalary
        ? monthlySalary.split(",")[1].toString()
        : "",
      prefectures: updatedPrefectureCheckboxValue,
      occupation: updateCheckboxValues(
        jobSearchFilter?.occupation ?? [],
        searchParams.get(JobSearchParamKey.Occupation) || "",
      ),
      contract: updateCheckboxValues(
        jobSearchFilter?.contract ?? [],
        searchParams.get(JobSearchParamKey.Contract) || "",
      ),
      assignment: updateCheckboxValues(
        jobSearchFilter?.assignment ?? [],
        searchParams.get(JobSearchParamKey.Assignment) || "",
      ),
      workForm: updateCheckboxValues(
        jobSearchFilter?.work_form ?? [],
        searchParams.get(JobSearchParamKey.WorkForm) || "",
      ),
      medicalSpecialty: updateCheckboxValues(
        jobSearchFilter?.medical_specialty ?? [],
        searchParams.get(JobSearchParamKey.MedicalSpecialty) || "",
      ),
      facilityForm: updateCheckboxValues(
        jobSearchFilter?.facility_form ?? [],
        searchParams.get(JobSearchParamKey.FacilityForm) || "",
      ),
    },
  });

  // Separate some logic from Form
  const {
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
    previewCount,
    onSubmit,
    isLoading,
    accordionValues,
    setAccordionValues,
  } = useFilter({ form, prefectureByRegion, jobSearchFilter });

  return (
    <Filter
      className={cn("", className, {
        "pointer-events-none opacity-50": isLoading,
      })}
    >
      <FilterHeader>
        <span>絞り込み</span>
        <Button
          variant="form"
          size="auto"
          className="bg-white px-[1.25rem] py-0.5 text-sm font-bold text-pink-200"
          type="button"
          onClick={() => {
            forceReset();
          }}
        >
          条件をクリア
        </Button>
      </FilterHeader>

      <section className="px-3.5 py-5 lg:p-5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn("space-y-[1.25rem]", className)}
          >
            <FilterSection id="searchTerm">
              <FilterSectionGroup>
                <FilterSectionTitle>フリーワードで探す</FilterSectionTitle>
                <FieldHorizontalRuleBlock />
              </FilterSectionGroup>
              <FieldGenericInput
                formHook={form}
                formInputName="searchTerm"
                labelText=""
                placeholder="例：テキスト"
                formItemClassName="border-shade-550 space-y-0 w-full"
                formInputClassName="placeholder:text-[#B3B3B3] max-h-[2.5rem] py-[.75rem] px-4 h-auto leading-none"
              />
            </FilterSection>

            <FilterSection id="newInformation">
              <FilterSectionGroup>
                <FilterSectionTitle>新規情報</FilterSectionTitle>
                <FieldHorizontalRuleBlock />
              </FilterSectionGroup>
              <div className="flex flex-wrap">
                {newInformation.map((field, index) => (
                  <FieldGenericCheckbox
                    key={field.id}
                    formHook={form}
                    formInputName={`newInformation.${index}.value`}
                    labelText={field.name}
                    hideTick={true}
                    formItemClassName="w-auto"
                  />
                ))}
              </div>
            </FilterSection>

            <FilterSection id="specificSearchCriteria">
              <FilterSectionGroup>
                <FilterSectionTitle>こだわり検索条件</FilterSectionTitle>
                <FieldHorizontalRuleBlock />
              </FilterSectionGroup>
              <div className="flex flex-wrap gap-1.5">
                {specificSearchCriteria.map((field, index) => (
                  <FieldGenericCheckbox
                    key={field.id}
                    formHook={form}
                    formInputName={`specificSearchCriteria.${index}.value`}
                    labelText={field.name}
                    hideTick={true}
                  />
                ))}
              </div>
            </FilterSection>

            <FilterSection id="monthlySalary">
              <FilterSectionGroup>
                <FilterSectionTitle>月給</FilterSectionTitle>
                <FieldHorizontalRuleBlock />
              </FilterSectionGroup>
              <div className="flex items-center gap-3.5">
                <FieldGenericInput
                  formHook={form}
                  formInputName="monthlySalaryMin"
                  labelText=""
                  placeholder="15万円"
                  variant="secondary"
                  formItemClassName=""
                />
                <span>〜</span>
                <FieldGenericInput
                  formHook={form}
                  formInputName="monthlySalaryMax"
                  labelText=""
                  placeholder="50万円"
                  variant="secondary"
                  formItemClassName=""
                />
              </div>
            </FilterSection>

            <FilterSection id="prefectures">
              <FilterSectionGroup>
                <FilterSectionTitle>都道府県</FilterSectionTitle>
                <FieldHorizontalRuleBlock />
              </FilterSectionGroup>
              <div className="flex flex-col gap-1.5">
                <FilterAccordion values={accordionValues} setValues={setAccordionValues}>
                  {prefectures.map(({ region, values }, regionIndex) => (
                    <FilterAccordionItem value={region} key={region}>
                      <FilterAccordionTrigger>{region}</FilterAccordionTrigger>
                      <FilterAccordionContent>
                        <div className="grid grid-cols-2 gap-1.5">
                          {values.map((field, prefectureIndex) => (
                            <FieldGenericCheckbox
                              key={field.id}
                              formHook={form}
                              formInputName={`prefectures.${regionIndex}.values.${prefectureIndex}.value`}
                              labelText={field.prefecture}
                              hideTick={true}
                            />
                          ))}
                        </div>
                      </FilterAccordionContent>
                    </FilterAccordionItem>
                  ))}
                </FilterAccordion>
              </div>
            </FilterSection>

            <FilterSection id="occupation">
              <FilterSectionGroup>
                <FilterSectionTitle>職種検索条件</FilterSectionTitle>
                <FieldHorizontalRuleBlock />
              </FilterSectionGroup>
              <div className="flex flex-wrap gap-1.5">
                {occupation.map((field, index) => (
                  <FieldGenericCheckbox
                    key={field.id}
                    formHook={form}
                    formInputName={`occupation.${index}.value`}
                    labelText={field.name}
                    hideTick={true}
                  />
                ))}
              </div>
            </FilterSection>

            <FilterSection id="contract">
              <FilterSectionGroup>
                <FilterSectionTitle>契約形態</FilterSectionTitle>
                <FieldHorizontalRuleBlock />
              </FilterSectionGroup>
              <div className="flex flex-wrap gap-1.5">
                {contract.map((field, index) => (
                  <FieldGenericCheckbox
                    key={field.id}
                    formHook={form}
                    formInputName={`contract.${index}.value`}
                    labelText={field.name}
                    hideTick={true}
                  />
                ))}
              </div>
            </FilterSection>

            <FilterSection id="assignment">
              <FilterSectionGroup>
                <FilterSectionTitle>職種</FilterSectionTitle>
                <FieldHorizontalRuleBlock />
              </FilterSectionGroup>
              <div className="flex flex-wrap gap-1.5">
                {assignment.map((field, index) => (
                  <FieldGenericCheckbox
                    key={field.id}
                    formHook={form}
                    formInputName={`assignment.${index}.value`}
                    labelText={field.name}
                    hideTick={true}
                  />
                ))}
              </div>
            </FilterSection>

            <FilterSection id="workForm">
              <FilterSectionGroup>
                <FilterSectionTitle>勤務形態</FilterSectionTitle>
                <FieldHorizontalRuleBlock />
              </FilterSectionGroup>
              <div className="flex flex-wrap gap-1.5">
                {workForm.map((field, index) => (
                  <FieldGenericCheckbox
                    key={field.id}
                    formHook={form}
                    formInputName={`workForm.${index}.value`}
                    labelText={field.name}
                    hideTick={true}
                  />
                ))}
              </div>
            </FilterSection>

            <FilterSection id="medicalSpecialty">
              <FilterSectionGroup>
                <FilterSectionTitle>診療科目</FilterSectionTitle>
                <FieldHorizontalRuleBlock />
              </FilterSectionGroup>
              <div className="flex flex-wrap gap-1.5">
                {medicalSpecialty.map((field, index) => (
                  <FieldGenericCheckbox
                    key={field.id}
                    formHook={form}
                    formInputName={`medicalSpecialty.${index}.value`}
                    labelText={field.name}
                    hideTick={true}
                  />
                ))}
              </div>
            </FilterSection>

            <FilterSection id="facilityForm">
              <FilterSectionGroup>
                <FilterSectionTitle>施設実態</FilterSectionTitle>
                <FieldHorizontalRuleBlock />
              </FilterSectionGroup>
              <div className="flex flex-wrap gap-1.5">
                {facilityForm.map((field, index) => (
                  <FieldGenericCheckbox
                    key={field.id}
                    formHook={form}
                    formInputName={`facilityForm.${index}.value`}
                    labelText={field.name}
                    hideTick={true}
                  />
                ))}
              </div>
            </FilterSection>

            <Button
              className="flex w-full flex-col bg-red-100 px-5 py-1 text-sm leading-normal"
              size="auto"
            >
              <span>この条件で検索</span>
              <span>（{previewCount === 0 ? "0" : `${previewCount}件`}）</span>
            </Button>
          </form>
        </Form>
      </section>
    </Filter>
  );
};
