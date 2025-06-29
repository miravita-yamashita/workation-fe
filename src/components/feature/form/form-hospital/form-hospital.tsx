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
  FieldGenericTextArea,
  FieldLabel,
  FieldLabelBadge,
  FieldLabelComposite,
  FieldLabelGroup,
  FieldLabelIndicator,
  FieldLabelLine,
  FieldLabelText,
  getAddressByPostcode,
} from "@/components/feature/form";
import { FieldGenericCheckbox } from "../field-generic-checkbox";
import { useRouter, useSearchParams } from "next/navigation";
import {
  hospitalFormSchema,
  setFormHospitalValues,
  useFormHospitalStore,
} from "./lib";

export const FormHospital = ({ className }: CommonProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const storedValues = useFormHospitalStore.getState().formValues;
  const shouldUseStoredValues = searchParams.get("persist") === "true";
  // We are using the store as single source of truth
  const defaultValues = shouldUseStoredValues
    ? storedValues
    : useFormHospitalStore.getState().formValues;
  // Initialize the form
  const form = useForm<z.infer<typeof hospitalFormSchema>>({
    resolver: zodResolver(hospitalFormSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      ...defaultValues,
    },
  });

  const onSubmit = async (values: z.infer<typeof hospitalFormSchema>) => {
    setFormHospitalValues(values);
    router.push("/contact-hospital/check");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("mb-2.5 flex flex-col gap-5", className)}
      >
        <FieldLabelGroup>
          <FieldLabelComposite labelText="法人名" />
          <FieldGenericInput
            formHook={form}
            formInputName="companyName"
            labelText=""
            placeholder=""
            formItemClassName="w-full"
          />
        </FieldLabelGroup>

        <FieldLabelGroup>
          <FieldLabelComposite labelText="病院・施設名" />
          <FieldGenericInput
            formHook={form}
            formInputName="facilityName"
            labelText=""
            placeholder=""
            formItemClassName="w-full"
          />
        </FieldLabelGroup>

        <FieldLabelGroup>
          <FieldLabelComposite labelText="ご担当者様名" />
          <div className="flex gap-1.5 lg:gap-5">
            <FieldGenericInput
              formHook={form}
              formInputName="personInChargeLastName"
              labelText=""
              placeholder="姓"
              formItemClassName="w-full"
            />
            <FieldGenericInput
              formHook={form}
              formInputName="personInChargeFirstName"
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
          <FieldLabelComposite labelText="ご住所（郵便番号）" />
          <div className="flex gap-1.5 lg:gap-5">
            <FieldGenericInput
              formHook={form}
              formInputName="postCode"
              labelText=""
              placeholder="〒"
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
