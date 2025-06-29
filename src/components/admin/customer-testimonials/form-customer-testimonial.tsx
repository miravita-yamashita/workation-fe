"use client";

import { ColumnContainer, ColumnItem } from "@/components/feature/common";
import { SectionHeading } from "@/components/feature/common/section-heading";
import {
  AdminFieldGenericSelect,
  FieldGenericInput,
  FieldGenericTextArea,
  FieldLabel,
  FieldLabelGroup,
  FieldLabelLine,
  FieldLabelText,
} from "@/components/feature/form";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import { createUpdateFaq } from "./lib";

import { useUnsavedPrompt } from "@/components/feature/unsaved-prompt";
import { createUpdateTestimonials, testimonialFormSchema } from "./lib";
import { CustomerTestimonialDetailType } from "./lib/types";
import ThumbnailUpload from "./thumbnail-upload";

export type MedCatType = {
  id: string;
  value: string;
  label: string;
};

type Props = {
  detail?: CustomerTestimonialDetailType | null;
};

export const FormCustomerTestimonial = forwardRef<HTMLFormElement, Props>(
  ({ detail }, ref) => {
    const router = useRouter();
    const isEditMode = Boolean(detail);

    const form = useForm<z.infer<typeof testimonialFormSchema>>({
      mode: "onBlur",
      reValidateMode: "onBlur",
      resolver: zodResolver(testimonialFormSchema),
      defaultValues: {
        name: detail?.name || "",
        rating: detail?.rating.toString() || "",
        title: detail?.title || "",
        content: detail?.body || "",
        thumbnail: detail?.media[0]?.id
          ? [
              {
                id: String(detail.media[0].id),
                url: detail.media[0]?.url ?? null,
              },
            ]
          : [undefined],
        status: detail?.status?.id.toString() || "",
      },
    });

    const { isDirty, isSubmitting } = form.formState;
    useUnsavedPrompt({
      isDirty: isDirty && !isSubmitting,
      formRef: ref as React.RefObject<HTMLFormElement | null>,
    });

    const onSubmit = async (values: z.infer<typeof testimonialFormSchema>) => {
      const afterSubmissionPath =
        isEditMode && detail?.id
          ? `/admin/customer-testimonials/${detail?.id}`
          : "/admin/customer-testimonials";
      try {
        let response;
        if (isEditMode && detail?.id) {
          response = await createUpdateTestimonials({ ...values }, detail?.id);
        } else {
          response = await createUpdateTestimonials({ ...values });
        }

        if (response?.success) {
          router.push(afterSubmissionPath);
          // form.reset();
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

    const ratingData = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      label: "★".repeat(i + 1),
      value: i + 1,
    }));

    const statusData = [
      {
        id: 0,
        label: "公開",
        value: 0,
      },
      {
        id: 1,
        label: "非公開 ",
        value: 1,
      },
    ];

    return (
      <>
        <div className="relative w-full">
          <Form {...form}>
            <form
              ref={ref}
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <div className="flex gap-5">
                <div className="w-full flex-1 rounded border p-5">
                  <ColumnContainer className="justify-between">
                    <ColumnItem className="w-full space-y-5">
                      <SectionHeading title="検索条件内容" />
                      <FieldGenericInput
                        formHook={form}
                        formInputName="name"
                        labelText="お名前"
                        variant="secondary"
                        formInputClassName="w-full"
                        isAdmin={true}
                        placeholder=""
                        formLabelClassName="font-bold text-base"
                      />
                      <FieldLabelGroup className="max-w-[22.1875rem]">
                        <AdminFieldGenericSelect
                          formHook={form}
                          formInputName="rating"
                          labelText="評判"
                          selectPlaceholder="選択してください"
                          variant="secondary"
                          isAdmin={true}
                          dropdownValues={ratingData}
                          selectTriggerClassName="!rounded-[.3125rem] h-[2.8125rem] border-[#cccccc]"
                          formLabelClassName="font-bold text-base"
                        />
                      </FieldLabelGroup>
                      <FieldGenericInput
                        formHook={form}
                        formInputName="title"
                        labelText="タイトル"
                        variant="secondary"
                        formInputClassName="w-full"
                        isAdmin={true}
                        placeholder=""
                        formLabelClassName="font-bold text-base"
                      />

                      <FieldLabelGroup>
                        <FieldGenericTextArea
                          formHook={form}
                          formInputName="content"
                          labelText="本文"
                          placeholder=""
                          textAreaClassName="h-[5rem]"
                          isAdmin={true}
                        />
                      </FieldLabelGroup>
                      <FieldLabelGroup className="max-w-[22.1875rem]">
                        <AdminFieldGenericSelect
                          formHook={form}
                          formInputName="status"
                          labelText="ステータス"
                          selectPlaceholder="選択してください"
                          variant="secondary"
                          isAdmin={true}
                          dropdownValues={statusData}
                          selectTriggerClassName="!rounded-[.3125rem] h-[2.8125rem] border-[#cccccc]"
                          formLabelClassName="font-bold text-base"
                        />
                      </FieldLabelGroup>
                    </ColumnItem>
                  </ColumnContainer>
                </div>
                <div className="w-[19.375rem] self-start rounded border p-5">
                  <FieldLabelGroup className="flex flex-col gap-4">
                    <FieldLabel>
                      <FieldLabelText>サムネイル</FieldLabelText>
                      <FieldLabelLine />
                    </FieldLabel>
                    <ThumbnailUpload
                      formHook={form}
                      formInputName="thumbnail"
                    />
                  </FieldLabelGroup>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </>
    );
  },
);

FormCustomerTestimonial.displayName = "FormCustomerTestimonial";
