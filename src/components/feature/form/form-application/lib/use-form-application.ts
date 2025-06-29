import { UseFormReturn } from "react-hook-form";
import { applicationFormSchema } from "./form-schema";
import { z } from "zod";
import { useEffect } from "react";
import { INQUIRY_TYPES, QUALIFICATIONS } from "./static-values";
import { isArrayValuesSame } from "@components/feature/form/lib";

export const useFormApplication = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof applicationFormSchema>>;
}) => {
  // Watch updates on inquiry types checkboxes, and update inquiryTypes value
  useEffect(() => {
    const subscription = form.watch((value) => {
      const generatedInquiryTypes: string[] = [];

      if (value.inquiryTypeApply) {
        generatedInquiryTypes.push(INQUIRY_TYPES[0].value.toString());
      }

      if (value.inquiryTypeInquire) {
        generatedInquiryTypes.push(INQUIRY_TYPES[1].value.toString());
      }

      if (value.inquiryTypeVisit) {
        generatedInquiryTypes.push(INQUIRY_TYPES[2].value.toString());
      }

      if (value.inquiryTypeOther) {
        generatedInquiryTypes.push(INQUIRY_TYPES[3].value.toString());
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

      // Handle qualifications
      const generatedQualifications: string[] = [];
      if (value.qualificationsNurse) {
        generatedQualifications.push(QUALIFICATIONS[0].value.toString());
      }
      if (value.qualificationsAssistant) {
        generatedQualifications.push(QUALIFICATIONS[1].value.toString());
      }
      if (value.qualificationsHealth) {
        generatedQualifications.push(QUALIFICATIONS[2].value.toString());
      }
      if (value.qualificationsMidWife) {
        generatedQualifications.push(QUALIFICATIONS[3].value.toString());
      }

      const filteredQualifications = value?.qualifications?.filter(
        (qualification): qualification is string => qualification !== undefined,
      );

      const isQualificationsArraySame = isArrayValuesSame(
        generatedQualifications,
        filteredQualifications || [],
      );

      if (!isQualificationsArraySame) {
        form.setValue("qualifications", generatedQualifications);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);
};
