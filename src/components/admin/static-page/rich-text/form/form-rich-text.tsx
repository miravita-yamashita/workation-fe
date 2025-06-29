"use client";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { richTextFormSchema, useFormRichText } from "./lib";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldErrorIndicator,
  FieldErrorIndicatorMessage,
  FieldGenericInput,
  JP_ERROR_MESSAGE,
  useFormInteraction,
} from "@/components/feature/form";
import { Form, FormControl } from "@/components/ui/form";
import { Tiptap } from "@/components/feature/tiptap";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { GetStaticPageDetailResponseType } from "../detail";
import { useUnsavedPrompt } from "@/components/feature/unsaved-prompt";

type FormStaticEmployerProps = {
  className?: string;
  isEditMode?: boolean;
  info?: GetStaticPageDetailResponseType["data"];
};

// Note: This is just simple form to cater C-60-70-80 forms since they are very similar
export const FormRichText = ({ className, info }: FormStaticEmployerProps) => {
  const form = useForm<z.infer<typeof richTextFormSchema>>({
    resolver: zodResolver(richTextFormSchema),
    defaultValues: {
      title: info?.title || "",
      richtext: info?.content || "",
    },
  });
  // Access Interaction Context
  const { formRef, setIsLoading } = useFormInteraction((state) => state);
  // Unsaved Prompt
  const { isDirty, isSubmitting } = form.formState;
  useUnsavedPrompt({ isDirty: isDirty && !isSubmitting, formRef });

  // Extract some logic
  const { onSubmit } = useFormRichText({
    setIsLoading,
    info,
  });

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-[1.25rem]", className)}
      >
        <FieldGenericInput
          formHook={form}
          formInputName="title"
          labelText="タイトル"
          placeholder=""
          variant="secondary"
          formItemClassName="w-full"
          formLabelClassName="font-bold"
        />
        <FormControl>
          <Controller
            name="richtext"
            defaultValue=""
            control={form.control}
            render={({ field }) => {
              const { onChange } = field;
              return (
                <>
                  <Label className="mb-2 inline-block font-bold">
                    コンテンツ
                  </Label>
                  <Tiptap
                    onChangeFormHook={onChange}
                    contentHTML={info?.content}
                  />
                </>
              );
            }}
          />
        </FormControl>
        {(form.getFieldState("richtext").error ||
          form.getValues("richtext") === "<p></p>") && (
          <FieldErrorIndicator
            isAdmin={true}
            formMessage={
              <FieldErrorIndicatorMessage>
                <p className="text-red-300">
                  {form.formState.errors.richtext?.message ||
                    JP_ERROR_MESSAGE.GENERIC_REQUIRED_ALT}
                </p>
              </FieldErrorIndicatorMessage>
            }
          />
        )}
      </form>
    </Form>
  );
};
