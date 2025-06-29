"use client";

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { richTextFormSchema } from "./form-schema";
import { genericAPICallHandler } from "@/lib/utils";
import { updateStaticRichText } from "./actions";
import { toast } from "@/hooks/use-toast";
import { GetStaticPageDetailResponseType } from "@components/admin/static-page/rich-text";
import { useRouter } from "next/navigation";

export const useFormRichText = ({
  info,
  setIsLoading,
}: {
  info?: GetStaticPageDetailResponseType["data"];
  form?: UseFormReturn<z.infer<typeof richTextFormSchema>>;
  setIsLoading: (isLoading: boolean) => void;
}) => {
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof richTextFormSchema>) => {
    setIsLoading(true);

    const response = await genericAPICallHandler(() =>
      updateStaticRichText(info?.slug as string, values),
    );
    setIsLoading(false);

    if (response?.success) {
      toast({
        description: response.message,
      });
      router.push(`/admin/static-page`);
    }

    toast({
      description: response.message,
    });
  };

  return {
    onSubmit,
  };
};
