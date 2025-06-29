"use client";

import { useForm } from "react-hook-form";
import { AdminStaticPageDetailDataType } from "../../../detail";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formAdminStaticBeginnersSchema } from "./lib";
import {
  AdminFieldGenericSelect,
  FieldGenericInput,
  FieldLabel,
  FieldLabelGroup,
  FieldLabelLine,
  FieldLabelText,
  useFormInteraction,
} from "@/components/feature/form";
import { useFormStaticBeginners } from "./use-form-static-beginners";
import { Form } from "@/components/ui/form";
import { cn, getUniqueId } from "@/lib/utils";
import {
  ColumnContainer,
  ColumnItem,
  FieldHorizontalRuleBlock,
} from "@/components/feature/common";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import IconAdd from "@public/icon-add.svg";
import { ArticleDropdownType } from "@/components/admin/posts";
import { useUnsavedPrompt } from "@/components/feature/unsaved-prompt";
import { SectionTitle } from "@/components/feature/dashboard";

type FormStaticBeginnersProps = {
  className?: string;
  id?: string;
  info?: AdminStaticPageDetailDataType;
  postsNameList?: ArticleDropdownType[];
};

export const FormStaticBeginners = ({
  className = "",
  id,
  info,
  postsNameList,
}: FormStaticBeginnersProps) => {
  const { positions } = info || {};
  const jobNumbers =
    positions?.slice(0, 3)?.map((position) => position?.job_number) || [];

  const form = useForm<z.infer<typeof formAdminStaticBeginnersSchema>>({
    resolver: zodResolver(formAdminStaticBeginnersSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      recommendedJobNo1: jobNumbers[0] || "",
      recommendedJobNo2: jobNumbers[1] || "",
      recommendedJobNo3: jobNumbers[2] || "",
      postDropdown: info
        ? info?.posts.map((post) => ({
            id: post.id,
            name: post.title,
            value: false,
          }))
        : [],
    },
  });

  const { formRef, setIsLoading } = useFormInteraction((state) => state);
  const { isDirty, isSubmitting } = form.formState;
  useUnsavedPrompt({ isDirty: isDirty && !isSubmitting, formRef });

  const {
    onSubmit,
    postDropdownItems,
    postDropdownItemsAppend,
    postDropdownItemsRemove,
  } = useFormStaticBeginners({
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
          <ColumnItem className="flex w-full flex-1 flex-col rounded border p-5">
            <FieldLabelGroup className="flex max-w-[45.625rem] flex-col gap-4">
              <FieldLabel>
                <FieldLabelText>投稿</FieldLabelText>
                <FieldLabelLine />
              </FieldLabel>
              {postDropdownItems.map(({}, index) => (
                <ColumnContainer
                  key={getUniqueId(index.toString())}
                  className="flex items-center gap-6"
                >
                  <AdminFieldGenericSelect
                    formHook={form}
                    formInputName={`postDropdown.${index}.id`}
                    formLabelClassName="font-bold"
                    labelText={index === 0 ? "投稿タイトル" : ""}
                    selectPlaceholder="投稿タイトル"
                    variant="secondary"
                    dropdownValues={postsNameList || []}
                    formItemClassName="w-full"
                    selectTriggerClassName="border-shade-250 h-full w-full max-h-10 text-shade-910"
                  />
                  <Button
                    variant="ghost"
                    size="auto"
                    type="button"
                    className="mb-[.625rem] justify-start self-end p-0 text-xs font-bold leading-normal text-red-350"
                    onClick={() => postDropdownItemsRemove(index)}
                  >
                    削除
                  </Button>
                </ColumnContainer>
              ))}
            </FieldLabelGroup>
            <Button
              variant="admin"
              size="auto"
              type="button"
              className="my-5 w-fit gap-2.5 bg-blue-350 px-5 py-1 text-sm"
              onClick={() => {
                postDropdownItemsAppend({ id: "", value: false, name: "" });
              }}
            >
              追加
              <Image src={IconAdd} alt="Add" width={8} height={8} />
            </Button>

            <ColumnContainer className="mb-3 flex max-w-[45.625rem] items-center gap-3">
              <SectionTitle className="shrink-0">おすすめ求人</SectionTitle>
              <FieldHorizontalRuleBlock />
            </ColumnContainer>
            <FieldGenericInput
              formHook={form}
              formInputName="recommendedJobNo1"
              labelText="求人番号"
              placeholder="入力してください"
              variant="secondary"
              formItemClassName="mb-5 w-full max-w-[45.625rem]"
              formLabelClassName="font-bold"
            />

            <FieldGenericInput
              formHook={form}
              formInputName="recommendedJobNo2"
              labelText=""
              placeholder="入力してください"
              variant="secondary"
              formItemClassName="mb-5 w-full max-w-[45.625rem]"
              formLabelClassName="font-bold"
            />

            <FieldGenericInput
              formHook={form}
              formInputName="recommendedJobNo3"
              labelText=""
              placeholder="入力してください"
              variant="secondary"
              formItemClassName="mb-5 w-full max-w-[45.625rem]"
              formLabelClassName="font-bold"
            />
          </ColumnItem>
        </ColumnContainer>
      </form>
    </Form>
  );
};
