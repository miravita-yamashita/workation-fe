"use client";

import {
  ColumnContainer,
  ColumnItem,
  Spinner,
} from "@/components/feature/common";
import {
  AdminFieldGenericSelect,
  FieldGenericInput,
  FieldLabelGroup,
} from "@/components/feature/form";
import { useUnsavedPrompt } from "@/components/feature/unsaved-prompt";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { forwardRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createUpdateFaq, FaqFormSchema, getFaqCategories } from "./lib";
import { FaqCategory, FAQDetailsPageType } from "./lib/types";

export type MedCatType = {
  id: string;
  value: string;
  label: string;
};

type Props = {
  detail?: FAQDetailsPageType | null;
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

export const FormFaq = forwardRef<HTMLFormElement, Props>(({ detail }, ref) => {
  const router = useRouter();
  const isEditMode = Boolean(detail);
  const [faqCategories, setFaqCategories] = useState<FaqCategory[]>();
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      const [faqCategoriesResponse] = await Promise.all([getFaqCategories()]);
      setFaqCategories(faqCategoriesResponse?.data || []);
    } catch (error) {
      console.error("Error fetching medical categories:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchData();
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  const form = useForm<z.infer<typeof FaqFormSchema>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(FaqFormSchema),
    defaultValues: {
      category: detail?.category?.toString(),
      question: detail?.question || "",
      answer: detail?.answer || "",
    },
  });

  const { isDirty, isSubmitting } = form.formState;
  useUnsavedPrompt({
    isDirty: isDirty && !isSubmitting,
    formRef: ref as React.RefObject<HTMLFormElement | null>,
  });

  const onSubmit = async (values: z.infer<typeof FaqFormSchema>) => {
    const afterSubmissionPath =
      isEditMode && detail?.id ? `/admin/faq/${detail?.id}` : "/admin/faq";
    try {
      let response;
      if (isEditMode && detail?.id) {
        response = await createUpdateFaq({ ...values }, detail?.id);
      } else {
        response = await createUpdateFaq({ ...values });
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
        description: `${String(error)}`,
      });
    } finally {
    }
  };

  if (loading) return <Spinner className="mt-[20%]" />;

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
                      formInputName="category"
                      labelText="カテゴリー"
                      selectPlaceholder="選択してください"
                      variant="secondary"
                      isAdmin={true}
                      dropdownValues={
                        faqCategories
                          ? faqCategories.map((category) => ({
                              ...category,
                              id: String(category.name),
                            }))
                          : []
                      }
                      selectTriggerClassName="!rounded-[.3125rem] h-[2.8125rem] border-[#cccccc]"
                      formLabelClassName="font-bold text-base"
                    />
                  </FieldLabelGroup>
                  <FieldGenericInput
                    formHook={form}
                    formInputName="question"
                    labelText="質問"
                    variant="secondary"
                    formInputClassName="w-full"
                    isAdmin={true}
                    placeholder=""
                    formLabelClassName="font-bold text-base"
                  />

                  <FieldGenericInput
                    formHook={form}
                    formInputName="answer"
                    labelText="回答"
                    variant="secondary"
                    formInputClassName="w-full"
                    isAdmin={true}
                    placeholder=""
                    formLabelClassName="font-bold text-base"
                  />
                </ColumnItem>
              </ColumnContainer>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
});

FormFaq.displayName = "FormFaq";
