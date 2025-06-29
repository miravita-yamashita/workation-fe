import { useFieldArray, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { subCategoryFormSchema } from "./form-schema";
import { GetSubCategoryResponseType } from "@components/admin/categories/detail";
import { genericAPICallHandler } from "@/lib/utils";
import { createSubCategory, updateSubCategoryDetail } from "./actions";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export const useFormCategory = ({
  form,
  isEditMode,
  info,
  parentCategoryId,
  setIsLoading,
}: {
  form: UseFormReturn<z.infer<typeof subCategoryFormSchema>>;
  isEditMode?: boolean;
  info?: GetSubCategoryResponseType["data"];
  parentCategoryId?: string;
  setIsLoading: (isLoading: boolean) => void;
}) => {
  const router = useRouter();
  const { control } = form;

  const {
    fields: subCategoryItems,
    remove: removeSubCategoryItem,
    append: appendSubCategoryItem,
  } = useFieldArray({
    name: "subCategoryItems",
    control,
  });

  const onSubmit = async (values: z.infer<typeof subCategoryFormSchema>) => {
    setIsLoading(true);

    const payload = {
      ...values,
      parentCategoryId: info?.category?.id || parentCategoryId || "",
    };

    const response = await genericAPICallHandler(() =>
      isEditMode
        ? updateSubCategoryDetail(payload)
        : createSubCategory(payload),
    );

    setIsLoading(false);

    if (response.success) {
      router.push(`/admin/categories/${parentCategoryId}/list`);
      return;
    }

    toast({
      description: response.message,
    });
  };

  return {
    subCategoryItems,
    removeSubCategoryItem,
    appendSubCategoryItem,
    onSubmit,
  };
};
