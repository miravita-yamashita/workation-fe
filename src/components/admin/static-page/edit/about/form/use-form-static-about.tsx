"use client";

import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { genericAPICallHandler } from "@/lib/utils";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { formAdminStaticAboutSchema, updateAdminStaticAboutPage } from "./lib";

export const useFormStaticAbout = ({
  form,
  id,
  setIsLoading,
}: {
  form: UseFormReturn<z.infer<typeof formAdminStaticAboutSchema>>;
  id?: string;
  setIsLoading: (isLoading: boolean) => void;
}) => {
  const router = useRouter();

  // UseFieldArray for bannerUrl and bannerMediaId
  const {
    fields: postDropdownItems,
    append: postDropdownItemsAppend,
    remove: postDropdownItemsRemove,
  } = useFieldArray({
    name: "postDropdown",
    control: form.control,
  });

  const onSubmit = async (
    values: z.infer<typeof formAdminStaticAboutSchema>,
  ) => {
    setIsLoading(true);

    const payload = {
      ...values,
      id: id || "",
    };
    setIsLoading(false);

    const response = await genericAPICallHandler(() =>
      updateAdminStaticAboutPage(payload),
    );

    if (response.success) {
      router.push(`/admin/static-page`);
      return;
    }

    toast({
      description: response.message,
    });
  };

  return {
    postDropdownItems,
    postDropdownItemsAppend,
    postDropdownItemsRemove,
    onSubmit,
  };
};
