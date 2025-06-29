"use client";

import { CommonProps } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  jobApplicationFormSchema,
  setFormJobDetailsValues,
  useFormJobDetails,
  useFormJobDetailsStore,
  useJobDetailsStore,
} from "./lib";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import {
  Consent,
  ConsentDefault,
  FieldGenericTextArea,
  FieldLabel,
  FieldLabelBadge,
  FieldGrid,
  FieldLabelComposite,
  FieldLabelGroup,
  FieldLabelIndicator,
  FieldLabelLine,
  FieldLabelText,
  FieldErrorIndicator,
  FieldErrorIndicatorMessage,
  getAddressByPostcode,
} from "@/components/feature/form";
import { FieldGenericInput } from "../field-generic-input";
import { FieldGenericCheckbox } from "../field-generic-checkbox";
import { Button } from "@/components/ui/button";
import { JobDetailsDataType } from "../../job";

export const FormJobDetails = ({
  className = "",
  data,
  jobNumber,
}: CommonProps & {
  data: JobDetailsDataType;
  jobNumber?: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const storedValues = useFormJobDetailsStore.getState().formValues;
  const shouldUseStoredValues = searchParams.get("persist") === "true";

  // We are using the store as single source of truth
  const defaultValues = shouldUseStoredValues
    ? storedValues
    : useFormJobDetailsStore.getState().formValues;

  const form = useForm<z.infer<typeof jobApplicationFormSchema>>({
    resolver: zodResolver(jobApplicationFormSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      ...defaultValues,
    },
  });

  // Separate some logic from Form
  useFormJobDetails({ form });

  // Extract data from the job details
  const { id, name, page_description, bonus, working_hours } = data || {};
  const setJobDetailsStore = useJobDetailsStore((state) => state.setJobDetails);

  // Set job details to the store
  setJobDetailsStore({
    jobId: id,
    jobNumber: jobNumber?.toString() || "",
    jobTitle: name,
    eligibility: "",
    jobDescription: page_description,
    workingHours: working_hours,
    salaryIncrease: bonus,
  });

  const onSubmit = async (values: z.infer<typeof jobApplicationFormSchema>) => {
    setFormJobDetailsValues({
      ...values,
      id,
      jobNumber: jobNumber ? jobNumber.toString() : "",
    });
    router.push("/recruit/check");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("mb-2.5 flex flex-col gap-5", className)}
      >
        <FieldLabelGroup>
          <FieldLabelText className="mb-3 text-base">
            応募する求人
          </FieldLabelText>
          <FieldLabel className="rounded border border-shade-450 bg-shade-10 px-4 py-3 leading-[1rem] text-shade-800">
            {jobNumber}
          </FieldLabel>
        </FieldLabelGroup>

        <FieldLabelGroup>
          <FieldLabelComposite labelText="お問い合わせ内容" />
          <div className="flex flex-col gap-1.5"></div>
          <FieldGrid>
            <FieldGenericCheckbox
              formHook={form}
              formInputName="inquiryDetailsJobApplication"
              labelText="求人の応募"
            />
            <FieldGenericCheckbox
              formHook={form}
              formInputName="inquiryDetailsTourFacility"
              labelText="入職後のご相談"
            />
          </FieldGrid>
          <FieldGrid>
            <FieldGenericCheckbox
              formHook={form}
              formInputName="inquiryDetailsJob"
              labelText="求人の登録について"
            />
            <FieldGenericCheckbox
              formHook={form}
              formInputName="inquiryDetailsOthers"
              labelText="その他"
            />
          </FieldGrid>

          {form.getFieldState("inquiryDetailsTypes").error && (
            <FieldErrorIndicator
              formMessage={
                <FieldErrorIndicatorMessage>
                  <p>{form.formState.errors.inquiryDetailsTypes?.message}</p>
                </FieldErrorIndicatorMessage>
              }
            />
          )}
        </FieldLabelGroup>

        <FieldLabelGroup>
          <FieldLabelComposite labelText="求人資格" />
          <div className="flex flex-col gap-1.5"></div>
          <FieldGrid>
            <FieldGenericCheckbox
              formHook={form}
              formInputName="nurse"
              labelText="看護師"
            />
            <FieldGenericCheckbox
              formHook={form}
              formInputName="publicHealthNurse"
              labelText="保健師"
            />
          </FieldGrid>
          <FieldGrid>
            <FieldGenericCheckbox
              formHook={form}
              formInputName="associateNurse"
              labelText="准看護師"
            />
            <FieldGenericCheckbox
              formHook={form}
              formInputName="midwife"
              labelText="助産師"
            />
          </FieldGrid>

          {form.getFieldState("jobQualificationsTypes").error && (
            <FieldErrorIndicator
              formMessage={
                <FieldErrorIndicatorMessage>
                  <p>{form.formState.errors.jobQualificationsTypes?.message}</p>
                </FieldErrorIndicatorMessage>
              }
            />
          )}
        </FieldLabelGroup>

        <FieldLabelGroup>
          <FieldLabelComposite labelText="お名前" />
          <div className="flex gap-1.5 lg:gap-5">
            <FieldGenericInput
              formHook={form}
              formInputName="lastName"
              labelText=""
              placeholder="姓"
              variant="secondary"
              formItemClassName="w-full"
              formInputClassName="max-h-[2.5rem] leading-[1rem]"
            />
            <FieldGenericInput
              formHook={form}
              formInputName="firstName"
              labelText=""
              placeholder="名"
              variant="secondary"
              formItemClassName="w-full"
              formInputClassName="max-h-[2.5rem] leading-[1rem]"
            />
          </div>
        </FieldLabelGroup>

        <FieldLabelGroup>
          <FieldLabelComposite labelText="フリガナ" />
          <div className="flex gap-1.5 lg:gap-5">
            <FieldGenericInput
              formHook={form}
              formInputName="sei"
              labelText=""
              placeholder="セイ"
              variant="secondary"
              formItemClassName="w-full"
              formInputClassName="max-h-[2.5rem] leading-[1rem]"
            />
            <FieldGenericInput
              formHook={form}
              formInputName="may"
              labelText=""
              placeholder="メイ"
              variant="secondary"
              formItemClassName="w-full"
              formInputClassName="max-h-[2.5rem] leading-[1rem]"
            />
          </div>
        </FieldLabelGroup>

        <FieldLabelGroup>
          <FieldLabelComposite labelText="生年月日" />
          <div className="flex gap-1.5 lg:gap-5">
            <FieldGenericInput
              formHook={form}
              formInputName="dobYear"
              labelText=""
              placeholder="年"
              variant="secondary"
              formItemClassName="w-full"
              formInputClassName="max-h-[2.5rem] leading-[1rem]"
            />
            <FieldGenericInput
              formHook={form}
              formInputName="dobMonth"
              labelText=""
              placeholder="月"
              variant="secondary"
              formItemClassName="w-full"
              formInputClassName="max-h-[2.5rem] leading-[1rem]"
            />

            <FieldGenericInput
              formHook={form}
              formInputName="dobDay"
              labelText=""
              placeholder="日"
              variant="secondary"
              formItemClassName="w-full"
              formInputClassName="max-h-[2.5rem] leading-[1rem]"
            />
          </div>
        </FieldLabelGroup>

        <FieldLabelGroup>
          <FieldLabelComposite labelText="ご住所（郵便番号）" />
          <div className="flex gap-1.5 lg:gap-5">
            <FieldGenericInput
              formHook={form}
              formInputName="postCode"
              labelText=""
              placeholder="〒"
              variant="secondary"
              formItemClassName="w-full"
              formInputClassName="max-h-[2.5rem] leading-[1rem]"
              onChange={(value) => {
                form.setValue("address", getAddressByPostcode(value), {
                  shouldValidate: true,
                });
              }}
            />
            <div></div>
          </div>
        </FieldLabelGroup>

        <FieldLabelGroup>
          <FieldLabelComposite labelText="ご住所（住所）" />
          <FieldGenericInput
            formHook={form}
            formInputName="address"
            labelText=""
            placeholder=""
            variant="secondary"
            formItemClassName="w-full"
            formInputClassName="max-h-[2.5rem] leading-[1rem]"
          />
        </FieldLabelGroup>

        <FieldLabelGroup>
          <FieldLabelComposite labelText="電話番号" />
          <FieldGenericInput
            formHook={form}
            formInputName="telephoneNumber"
            labelText=""
            placeholder="000-0000-0000"
            variant="secondary"
            formItemClassName="w-full"
            formInputClassName="max-h-[2.5rem] leading-[1rem]"
          />
        </FieldLabelGroup>

        <FieldLabelGroup>
          <FieldLabel>
            <FieldLabelText>メールアドレス</FieldLabelText>
            <FieldLabelIndicator>
              <FieldLabelBadge>必須</FieldLabelBadge>
              <FieldLabelLine />
            </FieldLabelIndicator>
          </FieldLabel>
          <FieldGenericInput
            formHook={form}
            formInputName="email"
            labelText=""
            placeholder="sample@company.com"
            variant="secondary"
            formItemClassName="w-full"
            formInputClassName="max-h-[2.5rem] leading-[1rem]"
          />
        </FieldLabelGroup>

        <FieldLabelGroup>
          <FieldLabelComposite labelText="その他のご希望" />
          <FieldGenericTextArea
            formHook={form}
            formInputName="inquiryContent"
            labelText=""
            placeholder="テキスト"
            textAreaClassName="h-[5rem]"
          />
        </FieldLabelGroup>

        <Consent>
          <ConsentDefault />
        </Consent>
        <div className="flex justify-center">
          <FieldGenericCheckbox
            formHook={form}
            formInputName="consent"
            labelText="同意する"
            formItemClassName="max-w-max justify-center lg:min-w-[10.3125rem]"
            formCheckboxContainerClassName="justify-center"
          />
        </div>

        <div className="flex justify-center">
          <Button
            variant="form"
            size="auto"
            className="lg:max-auto block w-full lg:w-[25rem]"
          >
            送信する
          </Button>
        </div>
      </form>
    </Form>
  );
};
