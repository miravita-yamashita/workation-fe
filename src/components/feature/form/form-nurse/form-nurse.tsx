"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { CommonProps } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { FieldGenericInput } from "../field-generic-input";
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
} from "@/components/feature/form";
import { FieldGenericCheckbox } from "../field-generic-checkbox";
import { useRouter, useSearchParams } from "next/navigation";
import {
  formNurseInitialState,
  nurseFormSchema,
  setFormNurseValues,
  useFormNurse,
  useFormNurseStore,
} from "./lib";

export const FormNurse = ({ className }: CommonProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const storedValues = useFormNurseStore.getState().formValues;
  const shouldUseStoredValues = searchParams.get("persist") === "true";
  // We are using the store as single source of truth
  const defaultValues = shouldUseStoredValues
    ? storedValues
    : formNurseInitialState.formValues;
  // Initialize the form
  const form = useForm<z.infer<typeof nurseFormSchema>>({
    resolver: zodResolver(nurseFormSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      ...defaultValues,
    },
  });

  // Separate some logic from Form
  useFormNurse({ form });

  const onSubmit = async (values: z.infer<typeof nurseFormSchema>) => {
    setFormNurseValues(values);

    router.push("/contact-nurse/check");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("mb-2.5 flex flex-col gap-5", className)}
      >
        <FieldLabelGroup>
          <FieldLabelComposite labelText="お名前" />
          <div className="flex gap-1.5 lg:gap-5">
            <FieldGenericInput
              formHook={form}
              formInputName="lastName"
              labelText=""
              placeholder="姓"
              formItemClassName="w-full"
            />
            <FieldGenericInput
              formHook={form}
              formInputName="firstName"
              labelText=""
              placeholder="名"
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
              formItemClassName="w-full"
            />
            <FieldGenericInput
              formHook={form}
              formInputName="may"
              labelText=""
              placeholder="メイ"
              formItemClassName="w-full"
            />
          </div>
        </FieldLabelGroup>

        <FieldLabelGroup>
          <FieldLabelComposite labelText="電話番号" />
          <FieldGenericInput
            formHook={form}
            formInputName="telephoneNumber"
            labelText=""
            placeholder="000-0000-0000"
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
            formItemClassName="w-full"
          />
        </FieldLabelGroup>

        <FieldLabelGroup>
          <FieldLabelComposite labelText="お問い合わせの種類" />
          <div className="flex flex-col gap-1.5"></div>
          <FieldGrid>
            <FieldGenericCheckbox
              formHook={form}
              formInputName="inquiryTypeJobApplication"
              labelText="求人の応募"
            />
            <FieldGenericCheckbox
              formHook={form}
              formInputName="inquiryTypeConsultation"
              labelText="入職後のご相談"
            />
          </FieldGrid>
          <FieldGrid>
            <FieldGenericCheckbox
              formHook={form}
              formInputName="inquiryTypeRegisterJob"
              labelText="求人の登録について"
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
          <FieldLabelComposite labelText="お問い合わせ内容" />
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
