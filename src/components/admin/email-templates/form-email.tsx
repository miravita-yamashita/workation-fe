"use client";

import { ColumnContainer, ColumnItem } from "@/components/feature/common";
import {
  FieldGenericInput,
  FieldGenericTextArea,
} from "@/components/feature/form";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createUpdateEmailTemplate, emailFormSchema } from "./lib";
import { EmailTemplateDetailsType } from "./lib/types";
import { useUnsavedPrompt } from "@/components/feature/unsaved-prompt";

export type MedCatType = {
  id: string;
  value: string;
  label: string;
};

type Props = {
  detail?: EmailTemplateDetailsType | null;
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

export const FormEmail = forwardRef<HTMLFormElement, Props>(
  ({ detail }, ref) => {
    const router = useRouter();
    const isEditMode = Boolean(detail);

    const form = useForm<z.infer<typeof emailFormSchema>>({
      mode: "onBlur",
      reValidateMode: "onBlur",
      resolver: zodResolver(emailFormSchema),
      defaultValues: {
        name: detail?.name || "",
        content: detail?.content || "",
      },
    });

    const { isDirty, isSubmitting } = form.formState;
    useUnsavedPrompt({
      isDirty: isDirty && !isSubmitting,
      formRef: ref as React.RefObject<HTMLFormElement | null>,
    });

    const onSubmit = async (values: z.infer<typeof emailFormSchema>) => {
      const afterSubmissionPath =
        isEditMode && detail?.id
          ? `/admin/email-templates/${detail?.id}`
          : "/admin/email-templates";
      try {
        let response;
        if (isEditMode && detail?.id) {
          response = await createUpdateEmailTemplate({ ...values }, detail?.id);
        } else {
          response = await createUpdateEmailTemplate({ ...values });
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
                    <SectionHeading title="送信用メールテンプレート詳細" />
                    <FieldGenericInput
                      formHook={form}
                      formInputName="name"
                      labelText="テンプレート名"
                      variant="secondary"
                      formInputClassName="w-full"
                      isAdmin={true}
                      placeholder=""
                      formLabelClassName="font-bold text-base"
                    />

                    <FieldGenericTextArea
                      formHook={form}
                      formInputName="content"
                      labelText="返信"
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

FormEmail.displayName = "FormEmail";
