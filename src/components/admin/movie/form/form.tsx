"use client";

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formAdminMovieSchema } from "../lib/form-schema";
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
import { useFormMovies } from "./use-form-movies";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ColumnContainer, ColumnItem } from "@/components/feature/common";
import { DropDownValuesType } from "@/components/feature/form/field-generic-select";
import { SectionTitle } from "@/components/feature/dashboard";
import { MovieDataType } from "@/components/movie";
import { useUnsavedPrompt } from "@/components/feature/unsaved-prompt";
import ImageNoPhoto from "@public/image-no-photo.jpg";

type FormMovieProps = {
  className?: string;
  isEditMode?: boolean;
  movieId?: string;
  movieCategoryNameList?: DropDownValuesType[];
  info?: MovieDataType;
};

export const FormMovie = ({
  className = "",
  isEditMode = false,
  movieId,
  movieCategoryNameList,
  info,
}: FormMovieProps) => {
  const form = useForm<z.infer<typeof formAdminMovieSchema>>({
    resolver: zodResolver(formAdminMovieSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      title: info?.name || "",
      description: info?.description || "",
      videoUrl: info?.link || "",
      category: info?.movie_category?.id || "",
      mediaImgSrc: info?.media[0]?.url || ImageNoPhoto?.src,
      mediaId: info?.media[0]?.id,
    },
  });

  const { formRef, setIsLoading } = useFormInteraction((state) => state);
  const { isDirty, isSubmitting } = form.formState;
  useUnsavedPrompt({ isDirty: isDirty && !isSubmitting, formRef });

  const { onSubmit } = useFormMovies({
    isEditMode,
    movieId,
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
            <ColumnContainer className="mb-5 flex items-center gap-3">
              <SectionTitle className="shrink-0">動画情報</SectionTitle>
              <hr className="w-full" />
            </ColumnContainer>

            <FieldGenericInput
              formHook={form}
              formInputName="title"
              labelText="タイトル【必須】"
              placeholder=""
              variant="secondary"
              formItemClassName="w-full max-w-[22.1875rem]"
              formLabelClassName="font-bold"
            />

            <FieldGenericInput
              formHook={form}
              formInputName="description"
              labelText="説明文【必須】※65文字以内"
              placeholder=""
              variant="secondary"
              formItemClassName="w-full max-w-[22.1875rem]"
              formLabelClassName="font-bold"
            />

            <FieldGenericInput
              formHook={form}
              formInputName="videoUrl"
              labelText="動画のリンク"
              placeholder=""
              variant="secondary"
              formItemClassName="w-full max-w-[22.1875rem]"
              formLabelClassName="font-bold"
            />
          </ColumnItem>
          <ColumnItem className="flex w-[19.375rem] flex-col gap-5 self-start rounded border p-5">
            <FieldLabelGroup className="flex flex-col gap-4">
              <FieldLabel>
                <FieldLabelText>サムネイル</FieldLabelText>
                <FieldLabelLine />
              </FieldLabel>
              <FieldUploadThumbnail
                formHook={form}
                formInputName="mediaId"
                mediaImgSrc={info?.media[0]?.url || ImageNoPhoto?.src}
              />
            </FieldLabelGroup>

            <FieldLabelGroup className="flex flex-col gap-4">
              <FieldLabel className="pb-0">
                <FieldLabelText>カテゴリー</FieldLabelText>
                <FieldLabelLine />
              </FieldLabel>
              <AdminFieldGenericSelect
                formHook={form}
                formInputName="category"
                formLabelClassName="font-bold"
                labelText=""
                selectPlaceholder="施設"
                variant="secondary"
                dropdownValues={movieCategoryNameList ?? []}
                selectTriggerClassName="border-shade-250 h-full max-h-10 text-shade-910"
              />
            </FieldLabelGroup>
          </ColumnItem>
        </ColumnContainer>
      </form>
    </Form>
  );
};
