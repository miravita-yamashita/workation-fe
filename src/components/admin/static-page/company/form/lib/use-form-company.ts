"use client";

import { useFieldArray, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { companyFormSchema } from "./form-schema";
import { genericAPICallHandler } from "@/lib/utils";
import { updateCompanyProfile } from "./actions";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { CompanyDataType } from "@components/admin/static-page/company/detail";

export const useFormCompany = ({
  form,
  setIsLoading,
  info,
}: {
  form: UseFormReturn<z.infer<typeof companyFormSchema>>;
  setIsLoading: (isLoading: boolean) => void;
  info: CompanyDataType | null;
}) => {
  const { control } = form;
  const router = useRouter();
  //Prepare Guidelines
  const {
    fields: guidelinesItems,
    remove: guidelinesRemove,
    append: guidelinesAppend,
  } = useFieldArray({
    name: "guidelines",
    control,
  });
  // Prepare Company Overview
  const {
    fields: companyOverviewItems,
    remove: companyOverviewRemove,
    append: companyOverviewAppend,
  } = useFieldArray({
    name: "companyOverview",
    control,
  });
  const onSubmit = async (values: z.infer<typeof companyFormSchema>) => {
    setIsLoading(true);
    const id = info?.id || "";

    const response = await genericAPICallHandler(() =>
      updateCompanyProfile(id, values),
    );

    setIsLoading(false);

    if (response?.success) {
      router.push(`/admin/static-page/${id}/company/detail`);
    } else {
      toast({
        description: response?.message,
      });
    }
  };

  return {
    onSubmit,
    guidelinesItems,
    guidelinesRemove,
    guidelinesAppend,
    companyOverviewItems,
    companyOverviewRemove,
    companyOverviewAppend,
  };
};
