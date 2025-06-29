"use client";

import { ColumnContainer, ColumnItem } from "@/components/feature/common";
import {
  AdminFieldGenericSelect,
  FieldGenericTextArea,
  FieldLabelGroup,
} from "@/components/feature/form";
import { useUnsavedPrompt } from "@/components/feature/unsaved-prompt";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { forwardRef, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateInquiry } from "./lib";
import { replyFormSchema } from "./lib/form-schema";
import { InquiryDetailsType } from "./lib/types";

export type MedCatType = {
  id: string;
  value: string;
  label: string;
};

type Props = {
  detail?: InquiryDetailsType | null;
};

export const SectionHeading = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <div className={cn("relative mb-3", className)}>
      <h2 className="relative z-10 inline-block bg-white pr-4 text-base font-bold">
        {title}
      </h2>
      <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 transform bg-[#dddddd]"></div>
    </div>
  );
};

export const FormReply = forwardRef<HTMLFormElement, Props>(
  ({ detail }, ref) => {
    const router = useRouter();
    const form = useForm<z.infer<typeof replyFormSchema>>({
      mode: "onBlur",
      reValidateMode: "onBlur",
      resolver: zodResolver(replyFormSchema),
      defaultValues: {
        emailTemplate: "",
        reply: "",
      },
    });

    const lastSelectedTemplate = useRef<string | null>(null);
    const selectedTemplate = form.watch("emailTemplate");

    const { isDirty, isSubmitting } = form.formState;
    useUnsavedPrompt({
      isDirty: isDirty && !isSubmitting,
      formRef: ref as React.RefObject<HTMLFormElement | null>,
    });

    useEffect(() => {
      if (
        selectedTemplate &&
        selectedTemplate !== lastSelectedTemplate.current
      ) {
        // Reset to the newly selected template
        form.setValue("reply", selectedTemplate);
        lastSelectedTemplate.current = selectedTemplate;
      }
    }, [selectedTemplate, form, form.setValue]);

    const onSubmit = async (values: z.infer<typeof replyFormSchema>) => {
      const afterSubmissionPath = `/admin/inquiries/${detail?.inquiry.id}`;

      try {
        const response = await updateInquiry(
          { ...values },
          detail?.inquiry?.id,
        );

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
          description: `${String(error)}`,
        });
      } finally {
      }
    };

    return (
      <>
        <div className="relative w-full rounded border p-5">
          <Form {...form}>
            <form
              ref={ref}
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <div className="">
                <ColumnContainer className="justify-between">
                  <ColumnItem className="w-full space-y-5">
                    <SectionHeading title="質問内容" />
                    <FieldLabelGroup className="max-w-[22.1875rem]">
                      <AdminFieldGenericSelect
                        formHook={form}
                        formInputName="emailTemplate"
                        labelText="カテゴリー"
                        selectPlaceholder="選択してください"
                        variant="secondary"
                        isAdmin={true}
                        dropdownValues={
                          detail?.email_templates
                            ? detail?.email_templates.map((typeOption) => ({
                                label: typeOption.name,
                                value: typeOption.name,
                                id: typeOption.content,
                              }))
                            : []
                        }
                        selectTriggerClassName="!rounded-[.3125rem] h-[2.8125rem] border-[#cccccc]"
                        formLabelClassName="font-bold text-base"
                      />
                    </FieldLabelGroup>
                    <FieldGenericTextArea
                      formHook={form}
                      formInputName="reply"
                      labelText="説明文【必須】※250文字以内"
                      placeholder=""
                      textAreaClassName="h-[5rem]"
                      isAdmin={true}
                    />
                  </ColumnItem>
                </ColumnContainer>
              </div>
            </form>
          </Form>
        </div>
      </>
    );
  },
);

FormReply.displayName = "FormReply";
