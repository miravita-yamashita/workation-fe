"use client";

import { z } from "zod";
import { formPostFormSchema } from "./form-schema";
import { useCallback, useEffect, useState } from "react";
import { ArticleDropdownDataType, ArticleDropdownType } from "./types";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { filterAlreadySelectedArticleDropdown } from "./utils";
import { genericAPICallHandler } from "@/lib/utils";
import { submitPost } from "./actions";
import { useParams, useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export const useFormPost = ({
  isEditMode = false,
  form,
  articleDropdown,
  setIsLoading,
}: {
  isEditMode?: boolean;
  form: UseFormReturn<z.infer<typeof formPostFormSchema>>;
  articleDropdown: ArticleDropdownType[];
  setIsLoading: (isLoading: boolean) => void;
}) => {
  const { control } = form;
  const params = useParams();
  const router = useRouter();
  const [articleDropdownValues, setArticleDropdownValues] =
    useState<ArticleDropdownDataType>({
      first: [],
      second: [],
      third: [],
    });

  // Prepare categories
  const { fields: categoryItems } = useFieldArray({
    name: "categories",
    control,
  });
  // Prepare tags
  const { fields: tagItems, prepend: tagItemsPrepend } = useFieldArray({
    name: "tags",
    control,
  });
  // Prepare banners
  const {
    fields: bannerItems,
    append: bannerItemsAppend,
    remove: bannerItemsRemove,
  } = useFieldArray({
    name: "banners",
    control,
  });

  const onSubmit = async (values: z.infer<typeof formPostFormSchema>) => {
    setIsLoading(true);

    const response = await genericAPICallHandler(() =>
      submitPost({
        isEditMode,
        values,
        postId: isEditMode ? (params?.id as string) : "",
      }),
    );

    setIsLoading(false);

    if (response?.success) {
      router.push("/admin/posts");

      return;
    }
    // Handle errors
    toast({
      description: response?.message,
    });
  };

  const getFilteredArticlePerDropdown = useCallback(() => {
    // Store selected values and we will use it to filter available options on each dropdown
    const selectedArticleDropdownForFirst = [
      form.getValues("relatedArticleSecond"),
      form.getValues("relatedArticleThird"),
    ];
    const selectedArticleDropdownForSecond = [
      form.getValues("relatedArticleFirst"),
      form.getValues("relatedArticleThird"),
    ];
    const selectedArticleDropdownForThird = [
      form.getValues("relatedArticleFirst"),
      form.getValues("relatedArticleSecond"),
    ];

    const filteredRecommendedJobsForFirst =
      filterAlreadySelectedArticleDropdown(
        articleDropdown,
        selectedArticleDropdownForFirst,
      );
    const filteredRecommendedJobsForSecond =
      filterAlreadySelectedArticleDropdown(
        articleDropdown,
        selectedArticleDropdownForSecond,
      );
    const filteredRecommendedJobsForThird =
      filterAlreadySelectedArticleDropdown(
        articleDropdown,
        selectedArticleDropdownForThird,
      );

    return {
      first: filteredRecommendedJobsForFirst,
      second: filteredRecommendedJobsForSecond,
      third: filteredRecommendedJobsForThird,
    };
  }, [form, articleDropdown]);

  // Handle Changes when selecting a related article and hide selected values on each dropdowns
  useEffect(() => {
    setArticleDropdownValues(getFilteredArticlePerDropdown());
  }, [getFilteredArticlePerDropdown]);

  return {
    onSubmit,
    articleDropdownValues,
    categoryItems,
    tagItems,
    tagItemsPrepend,
    bannerItems,
    bannerItemsAppend,
    bannerItemsRemove,
  };
};
