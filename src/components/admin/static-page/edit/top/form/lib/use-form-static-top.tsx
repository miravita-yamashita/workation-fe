"use client";

import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { genericAPICallHandler } from "@/lib/utils";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { formAdminStaticTopSchema } from "./form-schema";
import { updateAdminStaticTopPage } from "./actions";

export const useFormStaticTop = ({
  form,
  id,
  setIsLoading,
}: {
  form: UseFormReturn<z.infer<typeof formAdminStaticTopSchema>>;
  id?: string;
  setIsLoading: (isLoading: boolean) => void;
}) => {
  const router = useRouter();

  // UseFieldArray for bannerUrl and bannerMediaId
  const {
    fields: bannerItems,
    append: bannerItemsAppend,
    remove: bannerItemsRemove,
  } = useFieldArray({
    name: "banners",
    control: form.control,
  });

  const onSubmit = async (values: z.infer<typeof formAdminStaticTopSchema>) => {
    setIsLoading(true);

    const payload = {
      ...values,
      id: id || "",
    };
    setIsLoading(false);

    const response = await genericAPICallHandler(() =>
      updateAdminStaticTopPage(payload),
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
    bannerItems,
    bannerItemsAppend,
    bannerItemsRemove,
    onSubmit,
  };
};
