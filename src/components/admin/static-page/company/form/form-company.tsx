"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { companyFormSchema } from "./lib";
import {
  FieldGenericInput,
  FieldGenericTextArea,
  FieldLabel,
  FieldLabelText,
  useFormInteraction,
} from "@/components/feature/form";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useFormCompany } from "./lib/use-form-company";
import { ColumnContainer } from "@/components/feature/common";
import { SectionTitle } from "@/components/feature/dashboard";
import { Button } from "@/components/ui/button";
import IconAdd from "@public/icon-add.svg";
import IconNoPhotoSmall from "@public/icon-no-photo-small.svg";
import Image from "next/image";
import { openMediaUploadModalAsync } from "@/components/feature/media-upload/gallery";
import { useRef } from "react";
import { CompanyDataType } from "../detail";
import { useUnsavedPrompt } from "@/components/feature/unsaved-prompt";

type FormCompanyProps = {
  className?: string;
  info: CompanyDataType | null;
};

export const FormCompany = ({ className, info }: FormCompanyProps) => {
  const form = useForm<z.infer<typeof companyFormSchema>>({
    resolver: zodResolver(companyFormSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      headline: info?.greetings?.[0]?.title || "",
      body: info?.greetings?.[0]?.plain_content || "",
      eyeCatchingImage: info?.greetings?.[0]?.media?.[0]?.id?.toString() || "",
      philosophy: info?.greetings?.[0]?.philosophy || "",
      guidelines: info
        ? info?.guide?.map(({ id, title, plain_content }) => ({
            id,
            title,
            body: plain_content,
          }))
        : [],
      companyOverview:
        info?.profile?.map(({ id, title, plain_content }) => ({
          id,
          title,
          body: plain_content,
        })) ?? [],
    },
  });
  const imageSourceRef = useRef<string | null>(
    info?.greetings?.[0]?.media?.[0]?.media || null,
  );

  // Access Form Interaction Context
  const { formRef, setIsLoading } = useFormInteraction((state) => state);
  // Unsaved Prompt
  const { isDirty, isSubmitting } = form.formState;
  useUnsavedPrompt({ isDirty: isDirty && !isSubmitting, formRef });

  // Extract some logic
  const {
    onSubmit,
    guidelinesItems,
    guidelinesRemove,
    guidelinesAppend,
    companyOverviewItems,
    companyOverviewRemove,
    companyOverviewAppend,
  } = useFormCompany({ form, setIsLoading, info });

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "mb-2.5 flex max-w-[45.625rem] flex-col gap-5",
          className,
        )}
      >
        <FieldGenericInput
          formHook={form}
          formInputName="headline"
          labelText="見出し"
          placeholder=""
          variant="secondary"
          formItemClassName="w-full  max-w-[45.625rem]"
          formLabelClassName="font-bold"
          isAdmin={true}
        />

        <FieldGenericTextArea
          formHook={form}
          formInputName="body"
          labelText="本文"
          placeholder=""
          textAreaClassName="h-[5rem]"
          isAdmin={true}
        />
        <section>
          <FieldLabel>
            <FieldLabelText>アイキャッチ画像</FieldLabelText>
          </FieldLabel>
          <div className="relative mb-3 h-[18.75rem] w-[15.625rem] bg-shade-550">
            {form.getValues("eyeCatchingImage") ? (
              <>
                <Image
                  src={imageSourceRef.current || ""}
                  alt="アイキャッチ画像"
                  fill
                  className="object-contain"
                  sizes="100%"
                />
                <Button
                  type="button"
                  className="absolute right-2 top-2 z-20 rounded bg-red-300 text-xs font-bold text-white hover:bg-red-300"
                  onClick={() => {
                    form.setValue("eyeCatchingImage", "", {
                      shouldValidate: true,
                    });
                    imageSourceRef.current = "";
                  }}
                >
                  削除
                </Button>
              </>
            ) : (
              <Image
                src={IconNoPhotoSmall}
                alt="no photo"
                className="absolute inset-0 m-auto object-contain"
                width={20}
                height={20}
              />
            )}
          </div>

          <Button
            variant="admin"
            size="auto"
            type="button"
            className="gap-2.5 bg-blue-350 px-5 py-1 text-sm"
            onClick={async () => {
              // Open Media Library and get the selected media
              const data = await openMediaUploadModalAsync();

              if (data) {
                imageSourceRef.current = data.url;
                form.setValue("eyeCatchingImage", String(data.id), {
                  shouldValidate: true,
                });
              }
            }}
          >
            アップロード
          </Button>
        </section>
        <ColumnContainer className="mb-5 flex items-center gap-3">
          <SectionTitle className="shrink-0">理念</SectionTitle>
          <hr className="w-full" />
        </ColumnContainer>
        <FieldGenericTextArea
          formHook={form}
          formInputName="philosophy"
          labelText="見出し"
          placeholder=""
          textAreaClassName="h-[5rem]"
          isAdmin={true}
        />
        <ColumnContainer className="mb-5 flex items-center gap-3">
          <SectionTitle className="shrink-0">応募ガイドライン</SectionTitle>
          <hr className="w-full" />
        </ColumnContainer>
        <section>
          {guidelinesItems.map(({ id }, index) => (
            <ColumnContainer
              key={id}
              className="mb-5 flex-row items-start gap-5"
            >
              <FieldGenericInput
                formHook={form}
                formInputName={`guidelines.${index}.title`}
                labelText="タイトル"
                placeholder=""
                variant="secondary"
                formItemClassName="w-full"
                formLabelClassName="font-bold"
                isAdmin={true}
              />
              <div className="w-full">
                <FieldGenericTextArea
                  formHook={form}
                  formInputName={`guidelines.${index}.body`}
                  labelText="本文"
                  placeholder="本文"
                  textAreaClassName="h-[5rem] w-full"
                  isAdmin={true}
                />
              </div>
              <div className="relative min-h-full">
                <Button
                  type="button"
                  variant="ghost"
                  size="auto"
                  className="absolute top-1/2 -translate-y-1/2 self-center p-0 font-bold text-red-300 hover:text-red-300"
                  onClick={() => {
                    guidelinesRemove(index);
                  }}
                >
                  削除
                </Button>
              </div>
            </ColumnContainer>
          ))}
          <Button
            variant="admin"
            size="auto"
            type="button"
            className="gap-2.5 bg-blue-350 px-5 py-1 text-sm"
            onClick={() => {
              guidelinesAppend({ id: "", title: "", body: "" });
            }}
          >
            追加
            <Image src={IconAdd} alt="Add" width={8} height={8} />
          </Button>
        </section>
        <ColumnContainer className="mb-5 flex items-center gap-3">
          <SectionTitle className="shrink-0">会社概要</SectionTitle>
          <hr className="w-full" />
        </ColumnContainer>
        <section>
          {companyOverviewItems.map(({ id }, index) => (
            <ColumnContainer
              key={id}
              className="mb-5 flex-row items-start gap-5"
            >
              <FieldGenericInput
                formHook={form}
                formInputName={`companyOverview.${index}.title`}
                labelText="タイトル"
                placeholder=""
                variant="secondary"
                formItemClassName="w-full"
                formLabelClassName="font-bold"
                isAdmin={true}
              />
              <div className="w-full">
                <FieldGenericTextArea
                  formHook={form}
                  formInputName={`companyOverview.${index}.body`}
                  labelText="本文"
                  placeholder="本文"
                  textAreaClassName="h-[5rem] w-full"
                  isAdmin={true}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="auto"
                className="mt-[1.625rem] self-center p-0 font-bold text-red-300 hover:text-red-300"
                onClick={() => {
                  companyOverviewRemove(index);
                }}
              >
                削除
              </Button>
            </ColumnContainer>
          ))}
          <Button
            variant="admin"
            size="auto"
            type="button"
            className="gap-2.5 bg-blue-350 px-5 py-1 text-sm"
            onClick={() => {
              companyOverviewAppend({ id: "", title: "", body: "" });
            }}
          >
            追加
            <Image src={IconAdd} alt="Add" width={8} height={8} />
          </Button>
        </section>
      </form>
    </Form>
  );
};
