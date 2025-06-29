"use client";

import {
  Consent,
  ConsentDefault,
  FieldErrorIndicator,
  FieldErrorIndicatorMessage,
  FieldGenericTextArea,
  FieldGrid,
  FieldLabel,
  FieldLabelBadge,
  FieldLabelComposite,
  FieldLabelGroup,
  FieldLabelIndicator,
  FieldLabelLine,
  FieldLabelText,
  getAddressByPostcode,
} from "@/components/feature/form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import closeIcon from "@public/icon-x.svg";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FieldGenericCheckbox } from "../field-generic-checkbox";
import { FieldGenericInput } from "../field-generic-input";
import { applicationFormSchema } from "./lib/form-schema";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useModalApplicationStore } from "../../modal/modal-application";
import { submitFormApplication } from "./lib";
import {
  formApplicationInitialState,
  useFormApplicationStore,
} from "./lib/store";
import { useFormApplication } from "./lib/use-form-application";

interface Props {
  closeModal: () => void;
  className?: string;
}

export const FormApplication = ({ closeModal, className }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const storedValues = useFormApplicationStore.getState().formValues;
  const shouldUseStoredValues = searchParams.get("persist") === "true";
  const [isClicked, setClicked] = useState(false);
  const [jobs, setJobs] = useState(
    useModalApplicationStore.getState().selectedJobs,
  );
  const { toast } = useToast();

  // We are using the store as single source of truth
  const defaultValues = shouldUseStoredValues
    ? storedValues
    : formApplicationInitialState.formValues;
  // Initialize the form
  const form = useForm<z.infer<typeof applicationFormSchema>>({
    resolver: zodResolver(applicationFormSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      ...defaultValues,
    },
  });
  // Separate some logic from Form
  useFormApplication({ form });

  const onSubmit = async (values: z.infer<typeof applicationFormSchema>) => {
    try {
      setClicked(true);
      const response = await submitFormApplication(values, jobs);

      if (response?.success) {
        toast({
          title: "成功",
          description: "正常に送信されました",
        });
        closeModal();
        router.push("/keep?reset=true");
        router.refresh();
      }

      if (response?.errors) {
        toast({
          title: "Error during Submission",
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
        title: "Error during Submission",
        description: errorMessage,
      });
      setClicked(false);
    }
  };

  const handleRemovedJob = (id: string) => {
    const newJobs = jobs.filter((job) => job.id !== id);
    setJobs(newJobs);
    if (newJobs.length === 0) {
      closeModal();
    }
  };

  return (
    <>
      <div className="pb-[1.1875rem]">
        <p className="mb-[.375rem] text-base font-bold">応募する求人</p>
        {jobs.map((job) => (
          <div key={job.id} className="flex items-center pb-[.6875rem]">
            <div
              className={cn(
                "text-bas flex-1 rounded-xl border border-[#D4D4D4] bg-[#EBEBEB] px-4 py-3 leading-4 text-shade-800",
                jobs.length > 1 && "rounded-br-none rounded-tr-none",
              )}
            >
              {job.name}
            </div>
            {jobs.length !== 1 && (
              <button
                onClick={() => handleRemovedJob(job.id)}
                className="flex h-[2.625rem] w-10 items-center justify-center rounded-br-xl rounded-tr-xl bg-[#d4d4d4] hover:opacity-75"
              >
                <Image src={closeIcon} alt="remove job" />
              </button>
            )}
          </div>
        ))}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("mb-2.5 flex flex-col gap-5", className)}
        >
          <FieldLabelGroup>
            <FieldLabelComposite labelText="お問い合わせ内容" />
            <div className="flex flex-col gap-1.5"></div>
            <FieldGrid>
              <FieldGenericCheckbox
                formHook={form}
                formInputName="inquiryTypeApply"
                labelText="求人に応募する"
              />
              <FieldGenericCheckbox
                formHook={form}
                formInputName="inquiryTypeInquire"
                labelText="求人に質問する"
              />
            </FieldGrid>
            <FieldGrid>
              <FieldGenericCheckbox
                formHook={form}
                formInputName="inquiryTypeVisit"
                labelText="施設の見学をする"
              />
              <FieldGenericCheckbox
                formHook={form}
                formInputName="inquiryTypeOther"
                labelText="その他"
              />
            </FieldGrid>

            {form.getFieldState("inquiryTypes").error && (
              <FieldErrorIndicator
                formMessage={
                  <FieldErrorIndicatorMessage>
                    <p>{form.formState.errors.inquiryTypes?.message}</p>
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
                formInputName="qualificationsNurse"
                labelText="看護師"
              />
              <FieldGenericCheckbox
                formHook={form}
                formInputName="qualificationsAssistant"
                labelText="准看護師"
              />
            </FieldGrid>
            <FieldGrid>
              <FieldGenericCheckbox
                formHook={form}
                formInputName="qualificationsHealth"
                labelText="保健師"
              />
              <FieldGenericCheckbox
                formHook={form}
                formInputName="qualificationsMidWife"
                labelText="助産師"
              />
            </FieldGrid>

            {form.getFieldState("qualifications").error && (
              <FieldErrorIndicator
                formMessage={
                  <FieldErrorIndicatorMessage>
                    <p>{form.formState.errors.qualifications?.message}</p>
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
              />
              <FieldGenericInput
                formHook={form}
                formInputName="firstName"
                labelText=""
                placeholder="名"
                variant="secondary"
                formItemClassName="w-full"
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
              />
              <FieldGenericInput
                formHook={form}
                formInputName="may"
                labelText=""
                placeholder="メイ"
                variant="secondary"
                formItemClassName="w-full"
              />
            </div>
          </FieldLabelGroup>
          <FieldLabelGroup>
            <FieldLabelComposite labelText="生年月日" />
            <div className="flex gap-[.375rem] md:gap-5">
              <FieldGenericInput
                formHook={form}
                formInputName="year"
                labelText=""
                placeholder="年"
                variant="secondary"
                formItemClassName="w-full"
              />
              <FieldGenericInput
                formHook={form}
                formInputName="month"
                labelText=""
                placeholder="月"
                variant="secondary"
                formItemClassName="w-full"
              />
              <FieldGenericInput
                formHook={form}
                formInputName="day"
                labelText=""
                placeholder="日"
                variant="secondary"
                formItemClassName="w-full"
              />
            </div>
          </FieldLabelGroup>
          <FieldLabelGroup>
            <FieldLabelComposite labelText="ご住所（郵便番号）" />
            <div className="flex gap-1.5 md:max-w-[18.75rem] lg:gap-5">
              <FieldGenericInput
                formHook={form}
                formInputName="postCode"
                labelText=""
                placeholder="〒"
                variant="secondary"
                formItemClassName="w-full"
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
              disabled={isClicked}
              variant="form"
              size="auto"
              className="lg:max-auto block w-full lg:w-[25rem]"
            >
              送信する
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
