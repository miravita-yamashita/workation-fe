"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateMediaFormSchema, useMediaUpload } from "./lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  FieldGenericInput,
  FieldGenericTextArea,
  FieldLabel,
} from "@/components/feature/form";
import { MediaImageType } from "../gallery";

export const FormMedia = ({
  formRef,
  selectedMedia,
}: {
  formRef: React.RefObject<HTMLFormElement | null>;
  selectedMedia: MediaImageType | null;
}) => {
  const form = useForm<z.infer<typeof updateMediaFormSchema>>({
    resolver: zodResolver(updateMediaFormSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      url: selectedMedia?.url || "",
      title: selectedMedia?.custom_attr?.title || "",
      caption: selectedMedia?.custom_attr?.caption || "",
      altText: selectedMedia?.custom_attr?.alt || "",
    },
  });
  // Extract some logic
  const { onSubmit } = useMediaUpload({
    form,
    selectedMedia,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-[.625rem]"
        ref={formRef}
      >
        <FieldLabel className="pb-5 text-base font-bold">
          ファイルの編集
        </FieldLabel>
        <FieldGenericInput
          formHook={form}
          formInputName="url"
          labelText="URL"
          placeholder=""
          variant="secondary"
          formItemClassName="w-full"
          formLabelClassName="font-bold"
          isReadOnly
        />
        <FieldGenericInput
          formHook={form}
          formInputName="title"
          labelText="タイトル"
          placeholder=""
          variant="secondary"
          formItemClassName="w-full"
          formLabelClassName="font-bold"
        />
        <FieldGenericTextArea
          formHook={form}
          formInputName="caption"
          labelText="キャプション"
          placeholder=""
          textAreaClassName="h-[7.5rem]"
          formLabelClassName="font-bold"
        />
        <FieldGenericInput
          formHook={form}
          formInputName="altText"
          labelText="alt-text"
          placeholder=""
          variant="secondary"
          formItemClassName="w-full"
          formLabelClassName="font-bold"
        />
      </form>
    </Form>
  );
};
