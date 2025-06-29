import { UseFormReturn } from "react-hook-form";
import { generalFormSchema } from "./form-schema";
import { z } from "zod";
import { useEffect } from "react";
import { INQUIRY_TYPES } from "./static-values";
import { isArrayValuesSame } from "@components/feature/form/lib";


export const useFormGeneral = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof generalFormSchema>>;
}) => {
  // Watch updates on inquiry types checkboxes, and update inquiryTypes value
  useEffect(() => {
    const subscription = form.watch((value) => {
      const generatedInquiryTypes: string[] = [];

      if (value.inquiryTypeMedia) {
        generatedInquiryTypes.push(INQUIRY_TYPES[0].label);
      }

      if (value.inquiryTypeInfringement) {
        generatedInquiryTypes.push(INQUIRY_TYPES[1].label);
      }

      if (value.inquiryTypeOther) {
        generatedInquiryTypes.push(INQUIRY_TYPES[2].label);
      }

      // Filter out undefined values from generatedInquiryTypes
      const filteredInquiryTypes = value?.inquiryTypes?.filter(
        (inquiryType): inquiryType is string => inquiryType !== undefined,
      );

      // Check array first if it has the same values to prevent infinite loop
      const isArraySame = isArrayValuesSame(
        generatedInquiryTypes,
        filteredInquiryTypes || [],
      );

      // Prevent infinite loop
      if (!isArraySame) {
        // Finally set the value
        form.setValue("inquiryTypes", generatedInquiryTypes);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);
};
