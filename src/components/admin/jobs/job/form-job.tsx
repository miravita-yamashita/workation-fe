"use client";

import {
  ColumnContainer,
  ColumnItem,
  LabelBlock,
  LabelFieldBlock,
  Spinner,
} from "@/components/feature/common";
import { SectionHeading } from "@/components/feature/common/section-heading";
import {
  AdminFieldGenericSelect,
  FieldGenericInput,
  FieldGenericTextArea,
  FieldLabelGroup,
} from "@/components/feature/form";
import { FieldMultipleCheckboxAdmin } from "@/components/feature/form/field-multiple-checkbox-admin";
import { useUnsavedPrompt } from "@/components/feature/unsaved-prompt";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { generateUnixTimestamp, mapToCategoryFormat } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { forwardRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import BannerImageUpload from "./banner-image-upload";
import { DistinctRecommendedJobs } from "./distinct-recommended-jobs";
import { DistinctSelectableOptions } from "./distinct-selectable-options";
import FAQ from "./faq";
import ImageUpload from "./image-upload";
import {
  JobCatData,
  JobDetailsPageType,
  JobFAQType,
  JobSelectOptionsType,
  TIME_WORK,
  createUpdateJob,
  getAdminAreaNameList,
  getFacilityList,
  getJobCategories,
  getJobFAQ,
  getJobRecommended,
} from "./lib";
import { JobFormSchema } from "./lib/form-schema";

export type MedCatType = {
  id: string;
  value: string;
  label: string;
};

type Props = {
  detail?: JobDetailsPageType | null;
};

export const FormJob = forwardRef<HTMLFormElement, Props>(({ detail }, ref) => {
  const router = useRouter();
  const isEditMode = Boolean(detail);
  const [jobFAQ, setJobFAQ] = useState<JobFAQType>();
  const [selectOptions, setSelectOptions] = useState<JobCatData>();
  const [facilitiesOptions, setFacilitiesOptions] =
    useState<JobSelectOptionsType[]>();
  const [recommendedJobs, setRecommendedJobs] =
    useState<JobSelectOptionsType[]>();
  const [loading, setLoading] = useState(true);
  const [areaNameList, setAreaNameList] = useState<JobSelectOptionsType[]>();

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const [
          jobCategoriesResponse,
          facilityListResponse,
          FAQResponse,
          recommendedJobsResponse,
          areaNameListResponse,
        ] = await Promise.all([
          getJobCategories(),
          getFacilityList(),
          getJobFAQ(),
          getJobRecommended(),
          getAdminAreaNameList(),
        ]);

        if (isMounted) {
          setSelectOptions(jobCategoriesResponse?.data || []);
          setFacilitiesOptions((prev) =>
            prev?.length === facilityListResponse?.data?.length
              ? prev // Prevent unnecessary updates
              : mapToCategoryFormat(facilityListResponse?.data || []),
          );
          setRecommendedJobs((prev) =>
            prev?.length === recommendedJobsResponse?.data?.length
              ? prev // Prevent unnecessary updates
              : mapToCategoryFormat(recommendedJobsResponse?.data || []),
          );

          setJobFAQ(FAQResponse?.data || []);

          setAreaNameList((prev) =>
            prev?.length === areaNameListResponse?.data?.length
              ? prev // Prevent unnecessary updates
              : mapToCategoryFormat(areaNameListResponse?.data || []),
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    const timeout = setTimeout(() => {
      fetchData();
    }, 300);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, []);

  const form = useForm<z.infer<typeof JobFormSchema>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(JobFormSchema),
    defaultValues: {
      jobTitle: detail?.name || "",
      facilityName: detail?.facility_id || "",
      description: detail?.description || "",
      recommendedPointsOne: detail?.recommendation_point_1 || "",
      recommendedPointsTwo: detail?.recommendation_point_2 || "",
      jobNumber: detail?.job_number || generateUnixTimestamp().toString(),
      employmentType:
        (detail?.recruitment_categories.map((cat) => cat.id) as string[]) || "",
      medicalSpecialty:
        (detail?.medical_subject_categories.map((cat) => cat.id) as string[]) ||
        [],
      assignment: detail?.assignment_categories[0]?.id || "",
      facilityType: detail?.facility_form_categories[0]?.id || "",
      cityAddress: detail?.address_city || "",
      streetAddress: detail?.address_street || "",
      minimumSalary: detail?.salary_min || "",
      maximumSalary: detail?.salary_max || "",
      bonus: detail?.bonus || "",
      startWorkingHours: detail?.work_start_time || "00:00",
      endWorkingHours: detail?.work_end_time || "",
      workingHoursNotes: detail?.work_time_notes || "",
      daysOff: detail?.holiday || "",
      prefecture: detail?.area?.prefectures.toString() || "",
      recommendedJobOne: detail?.recommended_jobs[0]?.id || "",
      recommendedJobTwo: detail?.recommended_jobs[1]?.id || "",
      recommendedJobThree: detail?.recommended_jobs[2]?.id || "",
      faqForNursesQuestionOne: detail?.faq_nurses[0]?.id || "",
      faqForNursesQuestionTwo: detail?.faq_nurses[1]?.id || "",
      faqForNursesQuestionThree: detail?.faq_nurses[2]?.id || "",
      faqForNursesAnswerOne: "",
      faqForNursesAnswerTwo: "",
      faqForNursesAnswerThree: "",
      faqForMedicalInstitutionsQuestionOne:
        detail?.faq_medical_institutions[0]?.id || "",
      faqForMedicalInstitutionsQuestionTwo:
        detail?.faq_medical_institutions[1]?.id || "",
      faqForMedicalInstitutionsQuestionThree:
        detail?.faq_medical_institutions[2]?.id || "",
      faqForMedicalInstitutionsAnswerOne: "",
      faqForMedicalInstitutionsAnswerTwo: "",
      faqForMedicalInstitutionsAnswerThree: "",
      faqForGeneralAudienceQuestionOne: detail?.faq_general[0]?.id || "",
      faqForGeneralAudienceQuestionTwo: detail?.faq_general[1]?.id || "",
      faqForGeneralAudienceQuestionThree: detail?.faq_general[2]?.id || "",
      faqForGeneralAudienceAnswerOne: "",
      faqForGeneralAudienceAnswerTwo: "",
      faqForGeneralAudienceAnswerThree: "",
      contractType: detail?.contract_categories?.id || "",
      recommendationOne: detail?.specific_condition_categories[0]?.id || "",
      recommendationTwo: detail?.specific_condition_categories[1]?.id || "",
      recommendationThree: detail?.specific_condition_categories[2]?.id || "",
      recommendationFour: detail?.specific_condition_categories[3]?.id || "",
      recommendationFive: detail?.specific_condition_categories[4]?.id || "",
      imagesData:
        detail?.media?.featured?.map((item) => ({
          id: item.id.toString(),
          url: item.url,
        })) || [],
      imagesBannerData:
        detail?.media?.banner?.map((item) => ({
          id: item.id.toString(),
          url: item.url,
          custom_attr: item.custom_attr.link,
        })) || [],
    },
  });

  const { isDirty, isSubmitting } = form.formState;
  useUnsavedPrompt({
    isDirty: isDirty && !isSubmitting,
    formRef: ref as React.RefObject<HTMLFormElement | null>,
  });

  const onSubmit = async (values: z.infer<typeof JobFormSchema>) => {
    const afterSubmissionPath =
      isEditMode && detail?.id ? `/admin/jobs/${detail?.id}` : "/admin/jobs";

    try {
      let response;
      if (isEditMode && detail?.id) {
        response = await createUpdateJob({ ...values }, detail?.id);
      } else {
        response = await createUpdateJob({ ...values });
      }

      if (response?.success) {
        router.push(afterSubmissionPath);
        form.reset();
        router.refresh();
      } else {
        toast({
          description: response?.message,
        });
      }
    } catch (error) {
      toast({
        description: `${String(error)}asdasd`,
      });
    } finally {
    }
  };

  if (loading) return <Spinner className="mt-[20%]" />;

  return (
    <>
      <Form {...form}>
        <form
          ref={ref}
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div className="flex gap-5">
            <div className="min-h-[95vh] w-full flex-1 rounded border p-5">
              <ColumnContainer className="justify-between">
                <ColumnItem className="w-full space-y-5">
                  <SectionHeading title="求人概要" />
                  <FieldGenericInput
                    formHook={form}
                    formInputName="jobTitle"
                    labelText="名称【必須】"
                    variant="secondary"
                    formInputClassName="w-full"
                    isAdmin={true}
                    placeholder=""
                    formLabelClassName="font-bold text-base"
                  />
                  <FieldLabelGroup>
                    <AdminFieldGenericSelect
                      formHook={form}
                      formInputName="facilityName"
                      labelText="施設名【必須】"
                      selectPlaceholder="選択してください"
                      variant="secondary"
                      isAdmin={true}
                      dropdownValues={facilitiesOptions || []}
                      selectTriggerClassName="!rounded-[.3125rem] h-[2.8125rem] border-[#cccccc]"
                      formLabelClassName="font-bold text-base"
                    />
                  </FieldLabelGroup>
                  <FieldLabelGroup>
                    <FieldGenericTextArea
                      formHook={form}
                      formInputName="description"
                      labelText="説明文【必須】※250文字以内"
                      placeholder=""
                      textAreaClassName="h-[8.5rem]"
                      isAdmin={true}
                    />
                  </FieldLabelGroup>
                  <SectionHeading title="オススメポイント※30文字以内" />
                  <ColumnContainer className="gap-5">
                    <ColumnItem className="flex-1">
                      <FieldGenericInput
                        formHook={form}
                        formInputName="recommendedPointsOne"
                        labelText="01"
                        variant="secondary"
                        formInputClassName="w-full"
                        isAdmin={true}
                        placeholder=""
                        formLabelClassName="font-bold text-base"
                      />
                    </ColumnItem>
                    <ColumnItem className="flex-1">
                      <FieldGenericInput
                        formHook={form}
                        formInputName="recommendedPointsTwo"
                        labelText="02"
                        variant="secondary"
                        formInputClassName="w-full"
                        isAdmin={true}
                        placeholder=""
                        formLabelClassName="font-bold text-base"
                      />
                    </ColumnItem>
                  </ColumnContainer>
                  <SectionHeading title="募集中の求人" />
                  <FieldLabelGroup className="max-w-[31.1875rem]">
                    <FieldGenericInput
                      disabled={true}
                      formHook={form}
                      formInputName="jobNumber"
                      labelText="求人番号【必須】"
                      variant="secondary"
                      formInputClassName="w-full"
                      isAdmin={true}
                      placeholder=""
                      formLabelClassName="font-bold text-base"
                    />
                  </FieldLabelGroup>
                  <LabelFieldBlock>
                    <LabelBlock variant="empty" className="text-black">
                      勤務形態【必須】
                    </LabelBlock>
                    <FieldMultipleCheckboxAdmin
                      formHook={form}
                      formInputName="employmentType"
                      items={
                        selectOptions?.work_form ? selectOptions?.work_form : []
                      }
                    />
                  </LabelFieldBlock>

                  <LabelFieldBlock>
                    <LabelBlock variant="empty" className="text-black">
                      診療科目【必須】
                    </LabelBlock>
                    <FieldMultipleCheckboxAdmin
                      formHook={form}
                      formInputName="medicalSpecialty"
                      items={
                        selectOptions?.medical_specialty
                          ? selectOptions?.medical_specialty
                          : []
                      }
                    />
                  </LabelFieldBlock>

                  <ColumnContainer className="gap-5">
                    <ColumnItem className="w-full max-w-[31.1875rem]">
                      <FieldLabelGroup>
                        <AdminFieldGenericSelect
                          formHook={form}
                          formInputName="assignment"
                          labelText="配属【必須】"
                          selectPlaceholder="選択してください"
                          variant="secondary"
                          isAdmin={true}
                          dropdownValues={
                            selectOptions?.assignment
                              ? mapToCategoryFormat(selectOptions?.assignment)
                              : []
                          }
                          formLabelClassName="font-bold text-base"
                          selectTriggerClassName="!rounded-[.3125rem] h-[2.8125rem] border-[#cccccc]"
                        />
                      </FieldLabelGroup>
                    </ColumnItem>
                    <ColumnItem className="flex-1">
                      <FieldLabelGroup>
                        <AdminFieldGenericSelect
                          formHook={form}
                          formInputName="facilityType"
                          labelText="施設形態【必須】"
                          selectPlaceholder="選択してください"
                          variant="secondary"
                          isAdmin={true}
                          dropdownValues={
                            selectOptions?.facility_form
                              ? mapToCategoryFormat(
                                  selectOptions?.facility_form,
                                )
                              : []
                          }
                          formLabelClassName="font-bold text-base"
                          selectTriggerClassName="!rounded-[.3125rem] h-[2.8125rem] border-[#cccccc]"
                        />
                      </FieldLabelGroup>
                    </ColumnItem>
                  </ColumnContainer>
                  <ColumnContainer className="gap-5">
                    <ColumnItem className="w-full max-w-[31.1875rem] flex-1">
                      <FieldLabelGroup>
                        <AdminFieldGenericSelect
                          formHook={form}
                          formInputName="prefecture"
                          labelText="都道府県【必須】"
                          selectPlaceholder="選択してください"
                          variant="secondary"
                          isAdmin={true}
                          dropdownValues={areaNameList || []}
                          formLabelClassName="font-bold text-base"
                          selectTriggerClassName="!rounded-[.3125rem] h-[2.8125rem] border-[#cccccc]"
                        />
                      </FieldLabelGroup>
                    </ColumnItem>
                  </ColumnContainer>
                  <FieldGenericInput
                    formHook={form}
                    formInputName="cityAddress"
                    labelText="市区町村【必須】"
                    variant="secondary"
                    formInputClassName="w-full"
                    isAdmin={true}
                    placeholder=""
                    formLabelClassName="font-bold text-base"
                  />
                  <FieldGenericInput
                    formHook={form}
                    formInputName="streetAddress"
                    labelText="番地"
                    variant="secondary"
                    formInputClassName="w-full"
                    isAdmin={true}
                    placeholder=""
                    formLabelClassName="font-bold text-base"
                  />
                  <ColumnContainer className="gap-5">
                    <ColumnItem className="flex-1">
                      <FieldGenericInput
                        formHook={form}
                        formInputName="minimumSalary"
                        labelText="給与（最低）※半角数字"
                        variant="secondary"
                        formInputClassName="w-full"
                        isAdmin={true}
                        placeholder=""
                        formLabelClassName="font-bold text-base"
                      />
                    </ColumnItem>
                    <ColumnItem className="flex-1">
                      <FieldGenericInput
                        formHook={form}
                        formInputName="maximumSalary"
                        labelText="給与（最高）※半角数字"
                        variant="secondary"
                        formInputClassName="w-full"
                        isAdmin={true}
                        placeholder=""
                        formLabelClassName="font-bold text-base"
                      />
                    </ColumnItem>
                  </ColumnContainer>
                  <FieldGenericInput
                    formHook={form}
                    formInputName="bonus"
                    labelText="賞与【必須】"
                    variant="secondary"
                    formInputClassName="w-full"
                    isAdmin={true}
                    placeholder=""
                    formLabelClassName="font-bold text-base"
                  />
                  <ColumnContainer className="gap-5">
                    <ColumnItem className="flex-1">
                      <FieldLabelGroup>
                        <AdminFieldGenericSelect
                          formHook={form}
                          formInputName="startWorkingHours"
                          labelText="開始勤務時間【必須】"
                          selectPlaceholder="00:00"
                          variant="secondary"
                          isAdmin={true}
                          dropdownValues={TIME_WORK}
                          selectTriggerClassName="!rounded-[.3125rem] h-[2.8125rem] border-[#cccccc]"
                          formLabelClassName="font-bold text-base"
                        />
                      </FieldLabelGroup>
                    </ColumnItem>
                    <ColumnItem className="flex-1">
                      <FieldLabelGroup>
                        <AdminFieldGenericSelect
                          formHook={form}
                          formInputName="endWorkingHours"
                          labelText="終了勤務時間【必須】"
                          selectPlaceholder="00:00"
                          variant="secondary"
                          isAdmin={true}
                          dropdownValues={TIME_WORK}
                          selectTriggerClassName="!rounded-[.3125rem] h-[2.8125rem] border-[#cccccc]"
                          formLabelClassName="font-bold text-base"
                        />
                      </FieldLabelGroup>
                    </ColumnItem>
                  </ColumnContainer>
                  <FieldGenericInput
                    formHook={form}
                    formInputName="workingHoursNotes"
                    labelText="勤務時間備考"
                    variant="secondary"
                    formInputClassName="w-full"
                    isAdmin={true}
                    placeholder=""
                    formLabelClassName="font-bold text-base"
                  />
                  <FieldGenericInput
                    formHook={form}
                    formInputName="daysOff"
                    labelText="休日【必須】"
                    variant="secondary"
                    formInputClassName="w-full"
                    isAdmin={true}
                    placeholder=""
                    formLabelClassName="font-bold text-base"
                  />

                  <DistinctRecommendedJobs
                    formHook={form}
                    recommendedJobs={recommendedJobs ?? []}
                  />

                  {/* Nurse FAQ */}
                  <SectionHeading title="求人情報に表示するよくある質問（看護師向け）" />
                  <FAQ
                    formHook={form}
                    isCustom="faqForNursesIdOne"
                    formInputNameQuestion="faqForNursesQuestionOne"
                    formInputNameAnswer="faqForNursesAnswerOne"
                    questionLabel="質問1（入力or選択）"
                    answerLabel="回答1"
                    faqOptions={
                      jobFAQ?.看護師向け
                        ? mapToCategoryFormat(jobFAQ?.看護師向け)
                        : []
                    }
                  />
                  <FAQ
                    formHook={form}
                    isCustom="faqForNursesIdTwo"
                    formInputNameQuestion="faqForNursesQuestionTwo"
                    formInputNameAnswer="faqForNursesAnswerTwo"
                    questionLabel="質問2（入力or選択）"
                    answerLabel="回答2"
                    faqOptions={
                      jobFAQ?.看護師向け
                        ? mapToCategoryFormat(jobFAQ?.看護師向け)
                        : []
                    }
                  />
                  <FAQ
                    formHook={form}
                    isCustom="faqForNursesIdThree"
                    formInputNameQuestion="faqForNursesQuestionThree"
                    formInputNameAnswer="faqForNursesAnswerThree"
                    questionLabel="質問3（入力or選択）"
                    answerLabel="回答3"
                    faqOptions={
                      jobFAQ?.看護師向け
                        ? mapToCategoryFormat(jobFAQ?.看護師向け)
                        : []
                    }
                  />
                  {/* Medical Institutions FAQ */}
                  <SectionHeading title="求人情報に表示するよくある質問（医療機関向け）" />
                  <FAQ
                    formHook={form}
                    isCustom="faqForMedicalIdOne"
                    formInputNameQuestion="faqForMedicalInstitutionsQuestionOne"
                    formInputNameAnswer="faqForMedicalInstitutionsAnswerOne"
                    questionLabel="質問1（入力or選択）"
                    answerLabel="回答1"
                    faqOptions={
                      jobFAQ?.医療機関向け
                        ? mapToCategoryFormat(jobFAQ?.医療機関向け)
                        : []
                    }
                  />
                  <FAQ
                    formHook={form}
                    isCustom="faqForMedicalIdTwo"
                    formInputNameQuestion="faqForMedicalInstitutionsQuestionTwo"
                    formInputNameAnswer="faqForMedicalInstitutionsAnswerTwo"
                    questionLabel="質問2（入力or選択）"
                    answerLabel="回答2"
                    faqOptions={
                      jobFAQ?.医療機関向け
                        ? mapToCategoryFormat(jobFAQ?.医療機関向け)
                        : []
                    }
                  />
                  <FAQ
                    formHook={form}
                    isCustom="faqForMedicalIdThree"
                    formInputNameQuestion="faqForMedicalInstitutionsQuestionThree"
                    formInputNameAnswer="faqForMedicalInstitutionsAnswerThree"
                    questionLabel="質問3（入力or選択）"
                    answerLabel="回答3"
                    faqOptions={
                      jobFAQ?.医療機関向け
                        ? mapToCategoryFormat(jobFAQ?.医療機関向け)
                        : []
                    }
                  />
                  {/* General Audience FAQ */}
                  <SectionHeading title="求人情報に表示するよくある質問（一般向け）" />
                  <FAQ
                    formHook={form}
                    isCustom="faqForGeneralIdOne"
                    formInputNameQuestion="faqForGeneralAudienceQuestionOne"
                    formInputNameAnswer="faqForGeneralAudienceAnswerOne"
                    questionLabel="質問1（入力or選択）"
                    answerLabel="回答1"
                    faqOptions={
                      jobFAQ?.一般向け
                        ? mapToCategoryFormat(jobFAQ?.一般向け)
                        : []
                    }
                  />
                  <FAQ
                    formHook={form}
                    isCustom="faqForGeneralIdTwo"
                    formInputNameQuestion="faqForGeneralAudienceQuestionTwo"
                    formInputNameAnswer="faqForGeneralAudienceAnswerTwo"
                    questionLabel="質問2（入力or選択）"
                    answerLabel="回答2"
                    faqOptions={
                      jobFAQ?.一般向け
                        ? mapToCategoryFormat(jobFAQ?.一般向け)
                        : []
                    }
                  />
                  <FAQ
                    formHook={form}
                    isCustom="faqForGeneralIdThree"
                    formInputNameQuestion="faqForGeneralAudienceQuestionThree"
                    formInputNameAnswer="faqForGeneralAudienceAnswerThree"
                    questionLabel="質問3（入力or選択）"
                    answerLabel="回答3"
                    faqOptions={
                      jobFAQ?.一般向け
                        ? mapToCategoryFormat(jobFAQ?.一般向け)
                        : []
                    }
                  />
                </ColumnItem>
              </ColumnContainer>
            </div>
            <div className="w-[19.375rem] self-start rounded border p-5">
              <ColumnContainer className="justify-between">
                <ColumnItem className="w-full max-w-[46.875rem]">
                  <SectionHeading title="契約形態" />
                  <FieldLabelGroup className="mb-5 mt-[.625rem]">
                    <AdminFieldGenericSelect
                      formHook={form}
                      formInputName="contractType"
                      labelText=""
                      selectPlaceholder="選択してください"
                      variant="secondary"
                      isAdmin={true}
                      dropdownValues={
                        selectOptions?.contract
                          ? mapToCategoryFormat(selectOptions?.contract)
                          : []
                      }
                      formLabelClassName="font-bold text-base"
                      selectTriggerClassName="!rounded-[.3125rem] h-[2.8125rem] border-[#cccccc]"
                    />
                  </FieldLabelGroup>
                  <SectionHeading title="画像（5枚まで）" />
                  <ImageUpload formHook={form} formInputName="imagesData" />

                  <SectionHeading title="バナー" />
                  <BannerImageUpload
                    formHook={form}
                    formInputName="imagesBannerData"
                  />
                  <DistinctSelectableOptions
                    formHook={form}
                    selectOptions={
                      selectOptions?.specific
                        ? mapToCategoryFormat(selectOptions?.specific)
                        : []
                    }
                  />
                </ColumnItem>
              </ColumnContainer>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
});

FormJob.displayName = "FormJob";
