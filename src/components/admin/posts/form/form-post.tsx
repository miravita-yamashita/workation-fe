"use client";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { formPostFormSchema } from "./lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl } from "@/components/ui/form";
import {
  FieldErrorIndicator,
  FieldErrorIndicatorMessage,
  FieldGenericInput,
  FieldGenericTextArea,
  FieldLabel,
  FieldLabelGroup,
  FieldLabelIndicator,
  FieldLabelLine,
  FieldLabelText,
  FieldUploadThumbnail,
  JP_ERROR_MESSAGE,
  useFormInteraction,
} from "@/components/feature/form";
import {
  ArticleDropdownType,
  CommonListType,
  FAQDropdownType,
} from "./lib/types";
import { FieldGenericSelect } from "@/components/feature/form/field-generic-select";
import { ColumnContainer, ColumnItem } from "@/components/feature/common";
import { useFormPost } from "./lib/use-form-post";
import { FieldGenericCheckbox } from "@/components/feature/form/field-generic-checkbox";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { EXISTING_TAG_NAME } from "@/lib/message-map";
import { PostDetailDataType } from "../detail";
import { Label } from "@/components/ui/label";
import { Tiptap } from "@/components/feature/tiptap";
import { Button } from "@/components/ui/button";
import IconAdd from "@public/icon-add.svg";
import Image from "next/image";
import { useUnsavedPrompt } from "@/components/feature/unsaved-prompt";

export const FormPost = ({
  isEditMode = false,
  postCategories,
  postTags,
  info,
  articleDropdown,
  faqDropdown,
}: {
  isEditMode?: boolean;
  postCategories: CommonListType[];
  postTags: CommonListType[];
  info?: PostDetailDataType | null;
  articleDropdown: ArticleDropdownType[];
  faqDropdown: FAQDropdownType[];
}) => {
  const form = useForm<z.infer<typeof formPostFormSchema>>({
    resolver: zodResolver(formPostFormSchema),
    defaultValues: {
      id: info?.id || "",
      title: info?.title || "",
      richtext: info?.content || "",
      metaTitle: info?.meta_title || "",
      metaDescription: info?.meta_description || "",
      permaLink: info?.slug || "",
      shortTitle: info?.short_title || "",
      longTile: info?.long_title || "",
      relatedArticleFirst: info?.recommended_articles?.[0]?.id || "",
      relatedArticleSecond: info?.recommended_articles?.[1]?.id || "",
      relatedArticleThird: info?.recommended_articles?.[2]?.id || "",
      // In edit mode, the FAQ will always have an id (since it's already saved),
      // and the custom question and answer will always be blank.
      faqFirst: info?.questions?.[0]?.id || "",
      faqFirstCustom: {
        question: "",
        answer: "",
      },
      faqSecond: info?.questions?.[1]?.id || "",
      faqSecondCustom: {
        question: "",
        answer: "",
      },
      faqThird: info?.questions?.[2]?.id || "",
      faqThirdCustom: {
        question: "",
        answer: "",
      },
      categories: info
        ? postCategories.map((category) => {
            const isAlreadySelected = info.article_categories?.some(
              (savedCategory) => savedCategory.id === category.id,
            );
            return {
              ...category,
              value: isAlreadySelected,
            };
          })
        : postCategories,
      thumbnail: info?.media?.featured?.[0]?.id || -1,
      tags: info
        ? postTags.map((tag) => {
            const isAlreadySelected = info.tags?.some(
              (savedTag) => savedTag.id === tag.id,
            );
            return {
              ...tag,
              value: isAlreadySelected,
            };
          })
        : postTags,
      banners: info
        ? info.media?.banner?.map(({ id, url, custom_attr, pivot_id }) => ({
            mediaId: id,
            mediaURL: url,
            url: custom_attr?.link || "",
            pivotId: pivot_id.toString(),
          }))
        : [],
    },
  });

  // Access Interaction Context
  const { formRef, setIsLoading } = useFormInteraction((state) => state);
  // Unsaved Prompt
  const { isDirty, isSubmitting } = form.formState;
  useUnsavedPrompt({ isDirty: isDirty && !isSubmitting, formRef });

  // Extract some
  const {
    onSubmit,
    articleDropdownValues,
    categoryItems,
    tagItems,
    tagItemsPrepend,
    bannerItems,
    bannerItemsAppend,
    bannerItemsRemove,
  } = useFormPost({
    isEditMode,
    form,
    articleDropdown,
    setIsLoading,
  });

  return (
    <Form {...form}>
      <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="">
        <ColumnContainer className="flex-wrap gap-5">
          <ColumnItem className="w-full max-w-[45.625rem] space-y-5 bg-white p-5">
            <FieldGenericInput
              formHook={form}
              formInputName="title"
              labelText="タイトル"
              placeholder=""
              variant="secondary"
              formItemClassName="w-full"
              formLabelClassName="font-bold"
              isAdmin={true}
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
                      <Label className="mb-2 inline-block text-base font-bold">
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
                    <p className="text-red-300 font-normal">
                      {form.formState.errors.richtext?.message ||
                        JP_ERROR_MESSAGE.POST_CONTENT_REQUIRED}
                    </p>
                  </FieldErrorIndicatorMessage>
                }
              />
            )}
            <FieldGenericInput
              formHook={form}
              formInputName="permaLink"
              labelText="パーマリンク"
              placeholder=""
              variant="secondary"
              formItemClassName="w-full"
              formLabelClassName="font-bold"
              isAdmin={true}
            />
            <FieldGenericInput
              formHook={form}
              formInputName="metaTitle"
              labelText="meta title"
              placeholder=""
              variant="secondary"
              formItemClassName="w-full"
              formLabelClassName="font-bold"
              isAdmin={true}
            />
            <FieldGenericTextArea
              formHook={form}
              formInputName="metaDescription"
              labelText="meta description"
              placeholder="テキスト"
              textAreaClassName="h-[10rem]"
              formLabelClassName="font-bold"
              isAdmin={true}
            />
            <FieldGenericInput
              formHook={form}
              formInputName="shortTitle"
              labelText="タイトル小"
              placeholder="このテキストは記事のタイトルです"
              variant="secondary"
              formItemClassName="w-full"
              formLabelClassName="font-bold"
              isAdmin={true}
            />
            <FieldGenericInput
              formHook={form}
              formInputName="longTile"
              labelText="タイトル大"
              placeholder="このテキストは記事のタイトルです"
              variant="secondary"
              formItemClassName="w-full"
              formLabelClassName="font-bold"
              isAdmin={true}
            />
            <FieldLabelGroup>
              <FieldLabel className="pb-3">
                <FieldLabelText>おすすめ記事</FieldLabelText>
                <FieldLabelIndicator>
                  <FieldLabelLine />
                </FieldLabelIndicator>
              </FieldLabel>
              <FieldLabel>
                <FieldLabelText>記事タイトル</FieldLabelText>
              </FieldLabel>
            </FieldLabelGroup>
            <ColumnContainer className="flex flex-col gap-1.5">
              <FieldGenericSelect
                formHook={form}
                formInputName="relatedArticleFirst"
                labelText=""
                selectPlaceholder="選択してください"
                dropdownValues={articleDropdownValues.first}
                variant="secondary"
                formItemClassName="w-full"
                formLabelClassName="font-bold"
                selectTriggerClassName="rounded-[.3125rem] h-[2.8125rem] border-[#cccccc] [&>svg]:text-black"
              />
              <FieldGenericSelect
                formHook={form}
                formInputName="relatedArticleSecond"
                labelText=""
                selectPlaceholder="選択してください"
                dropdownValues={articleDropdownValues.second}
                variant="secondary"
                formItemClassName="w-full"
                formLabelClassName="font-bold"
                selectTriggerClassName="rounded-[.3125rem] h-[2.8125rem] border-[#cccccc] [&>svg]:text-black"
              />
              <FieldGenericSelect
                formHook={form}
                formInputName="relatedArticleThird"
                labelText=""
                selectPlaceholder="選択してください"
                dropdownValues={articleDropdownValues.third}
                variant="secondary"
                formItemClassName="w-full"
                formLabelClassName="font-bold"
                selectTriggerClassName="rounded-[.3125rem] h-[2.8125rem] border-[#cccccc] [&>svg]:text-black"
              />
            </ColumnContainer>
            <div>
              <FieldLabelGroup>
                <FieldLabel className="pb-3">
                  <FieldLabelText>投稿に表示するよくある質問</FieldLabelText>
                  <FieldLabelIndicator>
                    <FieldLabelLine />
                  </FieldLabelIndicator>
                </FieldLabel>
              </FieldLabelGroup>
              <ColumnContainer className="flex flex-col gap-1.5">
                <ColumnContainer className="flex flex-col gap-1.5">
                  <FieldGenericSelect
                    formHook={form}
                    formInputName="faqFirst"
                    labelText="質問1（入力or選択）"
                    selectPlaceholder="選択してください"
                    dropdownValues={faqDropdown}
                    variant="secondary"
                    formItemClassName="w-full"
                    formLabelClassName="font-bold"
                    selectTriggerClassName="rounded-[.3125rem] h-[2.8125rem] border-[#cccccc] [&>svg]:text-black"
                    isDisabled={
                      form.getValues("faqFirstCustom.question") !== ""
                    }
                    onChange={() => {
                      form.setValue(
                        "faqFirstCustom",
                        {
                          question: "",
                          answer: "",
                        },
                        { shouldValidate: true },
                      );
                    }}
                  />
                  <FieldGenericInput
                    formHook={form}
                    formInputName="faqFirstCustom.question"
                    labelText=""
                    placeholder=""
                    variant="secondary"
                    formItemClassName="w-full"
                    formLabelClassName="font-bold"
                    isAdmin={true}
                    onChange={(value) => {
                      const hasValue = value?.trim() !== "";
                      const hasFAQDropdownValue =
                        form.getValues("faqFirst") !== "";

                      if (hasValue && hasFAQDropdownValue) {
                        form.setValue("faqFirst", "", { shouldValidate: true });
                      }
                    }}
                  />
                  <FieldGenericInput
                    formHook={form}
                    formInputName="faqFirstCustom.answer"
                    labelText="回答1"
                    placeholder=""
                    variant="secondary"
                    formItemClassName="w-full"
                    formLabelClassName="font-bold"
                    isAdmin={true}
                  />
                </ColumnContainer>
                <ColumnContainer className="flex flex-col gap-1.5">
                  <FieldGenericSelect
                    formHook={form}
                    formInputName="faqSecond"
                    labelText="質問2（入力or選択）"
                    selectPlaceholder="選択してください"
                    dropdownValues={faqDropdown}
                    variant="secondary"
                    formItemClassName="w-full"
                    formLabelClassName="font-bold"
                    selectTriggerClassName="rounded-[.3125rem] h-[2.8125rem] border-[#cccccc] [&>svg]:text-black"
                    isDisabled={
                      form.getValues("faqSecondCustom.question") !== ""
                    }
                    onChange={() => {
                      form.setValue(
                        "faqSecondCustom",
                        {
                          question: "",
                          answer: "",
                        },
                        { shouldValidate: true },
                      );
                    }}
                  />
                  <FieldGenericInput
                    formHook={form}
                    formInputName="faqSecondCustom.question"
                    labelText=""
                    placeholder=""
                    variant="secondary"
                    formItemClassName="w-full"
                    formLabelClassName="font-bold"
                    isAdmin={true}
                    onChange={(value) => {
                      const hasValue = value?.trim() !== "";
                      const hasFAQDropdownValue =
                        form.getValues("faqSecond") !== "";

                      if (hasValue && hasFAQDropdownValue) {
                        form.setValue("faqSecond", "", {
                          shouldValidate: true,
                        });
                      }
                    }}
                  />
                  <FieldGenericInput
                    formHook={form}
                    formInputName="faqSecondCustom.answer"
                    labelText="回答2"
                    placeholder=""
                    variant="secondary"
                    formItemClassName="w-full"
                    formLabelClassName="font-bold"
                    isAdmin={true}
                  />
                </ColumnContainer>
                <ColumnContainer className="flex flex-col gap-1.5">
                  <FieldGenericSelect
                    formHook={form}
                    formInputName="faqThird"
                    labelText="質問3（入力or選択）"
                    selectPlaceholder="選択してください"
                    dropdownValues={faqDropdown}
                    variant="secondary"
                    formItemClassName="w-full"
                    formLabelClassName="font-bold"
                    selectTriggerClassName="rounded-[.3125rem] h-[2.8125rem] border-[#cccccc] [&>svg]:text-black"
                    isDisabled={
                      form.getValues("faqFirstCustom.question") !== ""
                    }
                    onChange={() => {
                      form.setValue(
                        "faqThirdCustom",
                        {
                          question: "",
                          answer: "",
                        },
                        { shouldValidate: true },
                      );
                    }}
                  />
                  <FieldGenericInput
                    formHook={form}
                    formInputName="faqThirdCustom.question"
                    labelText=""
                    placeholder=""
                    variant="secondary"
                    formItemClassName="w-full"
                    formLabelClassName="font-bold"
                    isAdmin={true}
                    onChange={(value) => {
                      const hasValue = value?.trim() !== "";
                      const hasFAQDropdownValue =
                        form.getValues("faqSecond") !== "";

                      if (hasValue && hasFAQDropdownValue) {
                        form.setValue("faqSecond", "", {
                          shouldValidate: true,
                        });
                      }
                    }}
                  />
                  <FieldGenericInput
                    formHook={form}
                    formInputName="faqThirdCustom.answer"
                    labelText="回答3"
                    placeholder=""
                    variant="secondary"
                    formItemClassName="w-full"
                    formLabelClassName="font-bold"
                    isAdmin={true}
                  />
                </ColumnContainer>
              </ColumnContainer>
            </div>
          </ColumnItem>
          <ColumnItem className="w-full max-w-[19.375rem] gap-5 space-y-5 bg-white p-5">
            <div>
              <FieldLabelGroup>
                <FieldLabel className="pb-3">
                  <FieldLabelText>カテゴリー</FieldLabelText>
                  <FieldLabelIndicator>
                    <FieldLabelLine />
                  </FieldLabelIndicator>
                </FieldLabel>
              </FieldLabelGroup>
              {categoryItems.map(({ id, name }, index) => (
                <FieldGenericCheckbox
                  key={id}
                  formHook={form}
                  formInputName={`categories.${index}.value`}
                  labelText={name}
                  isHighlighted={false}
                  checkboxClassName="data-[state=checked]:bg-black"
                  formCheckboxContainerClassName="border-0 py-1.5 px-0"
                />
              ))}
            </div>
            <div>
              <FieldLabelGroup>
                <FieldLabel className="pb-3">
                  <FieldLabelText>カスタム画像</FieldLabelText>
                  <FieldLabelIndicator>
                    <FieldLabelLine />
                  </FieldLabelIndicator>
                </FieldLabel>
              </FieldLabelGroup>
              <FieldUploadThumbnail
                formHook={form}
                formInputName="thumbnail"
                mediaImgSrc={info?.media?.featured?.[0]?.url || ""}
              />
            </div>
            <div>
              <FieldLabelGroup>
                <FieldLabel className="pb-3">
                  <FieldLabelText>タグ</FieldLabelText>
                  <FieldLabelIndicator>
                    <FieldLabelLine />
                  </FieldLabelIndicator>
                </FieldLabel>
              </FieldLabelGroup>
              <Input
                className="mb-2.5 rounded-none"
                placeholder="タグ追加"
                onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => {
                  if (event?.key === "Enter") {
                    const isExistingTagLabel = tagItems.some(
                      (item) =>
                        item.name.toLowerCase() ===
                        event?.currentTarget?.value.toLowerCase(),
                    );
                    // Handle adding the tag
                    if (!isExistingTagLabel) {
                      tagItemsPrepend({
                        id: "",
                        name: event?.currentTarget?.value,
                        value: true,
                      });
                      event.currentTarget.value = "";
                    } else {
                      // Handle existing tags
                      toast({
                        description: EXISTING_TAG_NAME,
                      });
                    }
                  }
                }}
              />
              <div className="flex flex-wrap gap-1.5">
                {tagItems.map(({ id, name }, index) => (
                  <FieldGenericCheckbox
                    key={id}
                    formHook={form}
                    formInputName={`tags.${index}.value`}
                    labelText={name}
                    checkboxClassName="data-[state=checked]:bg-black"
                    formCheckboxContainerClassName="py-0.5 px-3 border-shade-910 font-medium [&_label]:leading-normal"
                    hideTick={true}
                  />
                ))}
              </div>
            </div>
            <div>
              <FieldLabelGroup>
                <FieldLabel className="pb-3">
                  <FieldLabelText>バナー</FieldLabelText>
                  <FieldLabelIndicator>
                    <FieldLabelLine />
                  </FieldLabelIndicator>
                </FieldLabel>
              </FieldLabelGroup>
              <ColumnContainer className="flex flex-col gap-3">
                {bannerItems.map(({ mediaId, mediaURL }, index) => (
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
                ))}
                <Button
                  variant="admin"
                  size="auto"
                  type="button"
                  className="max-w-fit gap-2.5 bg-blue-350 px-5 py-1 text-sm"
                  disabled={bannerItems.length >= 3}
                  onClick={() => {
                    bannerItemsAppend({
                      mediaId: -1,
                      mediaURL: "",
                      url: "",
                      pivotId: "",
                    });
                  }}
                >
                  追加
                  <Image src={IconAdd} alt="Add" width={8} height={8} />
                </Button>
              </ColumnContainer>
            </div>
          </ColumnItem>
        </ColumnContainer>
      </form>
    </Form>
  );
};
