"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import {
  AdminFieldGenericSelect,
  FieldGenericInput,
  FieldLabel,
  FieldLabelGroup,
  FieldLabelLine,
  FieldLabelText,
  FieldUploadThumbnail,
  useFormInteraction,
} from "@/components/feature/form";
import { useFormStaticTop } from "./lib/use-form-static-top";
import { cn } from "@/lib/utils";
import {
  ColumnContainer,
  ColumnItem,
  FieldHorizontalRuleBlock,
} from "@/components/feature/common";
import { SectionTitle } from "@/components/feature/dashboard";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import IconAdd from "@public/icon-add.svg";
import { formAdminStaticTopSchema } from "./lib";
import { ArticleDropdownType } from "@/components/admin/posts";
import { AdminStaticPageDetailDataType } from "../../../detail";
import { useUnsavedPrompt } from "@/components/feature/unsaved-prompt";

type FormStaticTopProps = {
  className?: string;
  id?: string;
  info?: AdminStaticPageDetailDataType;
  postsNameList?: ArticleDropdownType[];
};

export const FormStaticTop = ({
  className = "",
  id,
  info,
  postsNameList,
}: FormStaticTopProps) => {
  const { positions, posts } = info || {};
  const jobNumbers =
    positions?.slice(0, 3)?.map((position) => position?.job_number) || [];
  const postIds = posts?.map((post) => post?.id) || [];

  const form = useForm<z.infer<typeof formAdminStaticTopSchema>>({
    resolver: zodResolver(formAdminStaticTopSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      recommendedJobNo1: jobNumbers[0] || "",
      recommendedJobNo2: jobNumbers[1] || "",
      recommendedJobNo3: jobNumbers[2] || "",
      post1: postIds[0] || "",
      post2: postIds[1] || "",
      freelanceNurseTitle1: info?.steps[0]?.title || "",
      freelanceNurseBody1: info?.steps[0]?.content || "",
      freelanceNurseTitle2: info?.steps[1]?.title || "",
      freelanceNurseBody2: info?.steps[1]?.content || "",
      freelanceNurseTitle3: info?.steps[2]?.title || "",
      freelanceNurseBody3: info?.steps[2]?.content || "",
      banners: info
        ? info.media?.banner?.map(({ id, pivot_id, url, custom_attr }) => ({
            mediaId: id,
            pivotId: pivot_id,
            mediaURL: url,
            url: custom_attr?.link || "",
          }))
        : [],
    },
  });

  const { formRef, setIsLoading } = useFormInteraction((state) => state);
  const { isDirty, isSubmitting } = form.formState;
  useUnsavedPrompt({ isDirty: isDirty && !isSubmitting, formRef });

  const { onSubmit, bannerItemsAppend, bannerItemsRemove, bannerItems } =
    useFormStaticTop({
      form,
      id,
      setIsLoading,
    });

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("mb-2.5 flex flex-col gap-5", className)}
      >
        <ColumnContainer className="flex w-full gap-5">
          <ColumnItem className="flex w-full flex-1 flex-col gap-5 rounded border p-5">
            <ColumnContainer className="flex items-center gap-3">
              <SectionTitle className="shrink-0">カテゴリー詳細</SectionTitle>
              <FieldHorizontalRuleBlock />
            </ColumnContainer>

            <FieldGenericInput
              formHook={form}
              formInputName="recommendedJobNo1"
              labelText="求人番号"
              placeholder="入力してください"
              variant="secondary"
              formItemClassName="w-full"
              formLabelClassName="font-bold"
            />

            <FieldGenericInput
              formHook={form}
              formInputName="recommendedJobNo2"
              labelText=""
              placeholder="入力してください"
              variant="secondary"
              formItemClassName="w-full"
              formLabelClassName="font-bold"
            />

            <FieldGenericInput
              formHook={form}
              formInputName="recommendedJobNo3"
              labelText=""
              placeholder="入力してください"
              variant="secondary"
              formItemClassName="w-full"
              formLabelClassName="font-bold"
            />

            <FieldLabelGroup className="flex flex-col gap-4">
              <FieldLabel>
                <FieldLabelText>投稿</FieldLabelText>
                <FieldLabelLine />
              </FieldLabel>
              <AdminFieldGenericSelect
                formHook={form}
                formInputName="post1"
                formLabelClassName="font-bold"
                labelText="投稿タイトル"
                selectPlaceholder="投稿タイトル"
                variant="secondary"
                dropdownValues={postsNameList ?? []}
                selectTriggerClassName="border-shade-250 h-full max-h-10 text-shade-910"
              />
              <AdminFieldGenericSelect
                formHook={form}
                formInputName="post2"
                formLabelClassName="font-bold"
                labelText=""
                selectPlaceholder="投稿タイトル"
                variant="secondary"
                dropdownValues={postsNameList ?? []}
                selectTriggerClassName="border-shade-250 h-full max-h-10 text-shade-910"
              />
            </FieldLabelGroup>

            <FieldLabelGroup className="flex flex-col gap-4">
              <FieldLabel>
                <FieldLabelText>転職する方法</FieldLabelText>
                <FieldLabelLine />
              </FieldLabel>
              <FieldGenericInput
                formHook={form}
                formInputName="freelanceNurseTitle1"
                labelText="STEP 01"
                placeholder="タイトル"
                variant="secondary"
                formItemClassName="w-full"
                formLabelClassName="font-bold"
              />
              <FieldGenericInput
                formHook={form}
                formInputName="freelanceNurseBody1"
                labelText=""
                placeholder="本文"
                variant="secondary"
                formItemClassName="w-full"
                formLabelClassName="font-bold"
              />
              <FieldGenericInput
                formHook={form}
                formInputName="freelanceNurseTitle2"
                labelText="STEP 02"
                placeholder="タイトル"
                variant="secondary"
                formItemClassName="w-full "
                formLabelClassName="font-bold"
              />
              <FieldGenericInput
                formHook={form}
                formInputName="freelanceNurseBody2"
                labelText=""
                placeholder="本文"
                variant="secondary"
                formItemClassName="w-full"
                formLabelClassName="font-bold"
              />
              <FieldGenericInput
                formHook={form}
                formInputName="freelanceNurseTitle3"
                labelText="STEP 03"
                placeholder="タイトル"
                variant="secondary"
                formItemClassName="w-full"
                formLabelClassName="font-bold"
              />
              <FieldGenericInput
                formHook={form}
                formInputName="freelanceNurseBody3"
                labelText=""
                placeholder="本文"
                variant="secondary"
                formItemClassName="w-full "
                formLabelClassName="font-bold"
              />
            </FieldLabelGroup>
          </ColumnItem>

          <ColumnItem className="flex w-[19.375rem] flex-col gap-5 self-start rounded border p-5">
            {/* Dynamically render banner fields */}
            <FieldLabelGroup className="flex flex-col gap-3">
              <FieldLabel>
                <FieldLabelText>バナー</FieldLabelText>
                <FieldLabelLine />
              </FieldLabel>
              {bannerItems.map(({ mediaId, mediaURL }, index) => {
                return (
                  <ColumnContainer
                    key={`${mediaId}-${index}`}
                    className="flex flex-col gap-3"
                  >
                    <Button
                      variant="ghost"
                      size="auto"
                      type="button"
                      className="self-end p-0 text-xs font-bold leading-normal text-red-350"
                      onClick={() => bannerItemsRemove(index)}
                    >
                      削除
                    </Button>
                    <FieldUploadThumbnail
                      formHook={form}
                      formInputName={`banners.${index}.mediaId`}
                      mediaImgSrc={mediaURL || ""}
                      formInputNameBanner={`banners.${index}.mediaURL`}
                      errorMessage={
                        form.formState.errors.banners?.[index]?.mediaId?.message
                      }
                    />
                    <FieldGenericInput
                      formHook={form}
                      formInputName={`banners.${index}.url`}
                      labelText="リンク"
                      placeholder=""
                      variant="secondary"
                      formItemClassName="w-full"
                      formLabelClassName="font-bold"
                      isAdmin={true}
                    />
                  </ColumnContainer>
                );
              })}
            </FieldLabelGroup>

            <Button
              variant="admin"
              size="auto"
              type="button"
              className="w-fit gap-2.5 bg-blue-350 px-5 py-1 text-sm"
              onClick={() => {
                bannerItemsAppend({
                  mediaId: -1,
                  mediaURL: "",
                  url: "",
                  pivotId: -1,
                });
              }}
            >
              追加
              <Image src={IconAdd} alt="Add" width={8} height={8} />
            </Button>
          </ColumnItem>
        </ColumnContainer>
      </form>
    </Form>
  );
};
