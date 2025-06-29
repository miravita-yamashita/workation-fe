"use client";

import { UseFormReturn } from "react-hook-form";
import { jobApplicationFormSchema } from "./form-schema";
import { z } from "zod";
import { useEffect } from "react";
import {
  JOB_DETAILS_INQUIRY_TYPES,
  JOB_DETAILS_QUALIFICATIONS_TYPES,
} from "./static-values";
import { isArrayValuesSame } from "@components/feature/form/lib";

export const useFormJobDetails = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof jobApplicationFormSchema>>;
}) => {
  // Watch updates on inquiry types checkboxes, and update inquiryTypes value
  useEffect(() => {
    const subscription = form.watch((value) => {
      const generatedInquiryDetailsTypes: string[] = [];
      const generatedJobQualificationsTypes: string[] = [];
      if (value.inquiryDetailsJobApplication) {
        generatedInquiryDetailsTypes.push(JOB_DETAILS_INQUIRY_TYPES[0].label);
      }

      if (value.inquiryDetailsTourFacility) {
        generatedInquiryDetailsTypes.push(JOB_DETAILS_INQUIRY_TYPES[1].label);
      }

      if (value.inquiryDetailsJob) {
        generatedInquiryDetailsTypes.push(JOB_DETAILS_INQUIRY_TYPES[2].label);
      }

      if (value.inquiryDetailsOthers) {
        generatedInquiryDetailsTypes.push(JOB_DETAILS_INQUIRY_TYPES[3].label);
      }

      if (value.nurse) {
        generatedJobQualificationsTypes.push(
          JOB_DETAILS_QUALIFICATIONS_TYPES[0].label,
        );
      }

      if (value.publicHealthNurse) {
        generatedJobQualificationsTypes.push(
          JOB_DETAILS_QUALIFICATIONS_TYPES[1].label,
        );
      }

      if (value.associateNurse) {
        generatedJobQualificationsTypes.push(
          JOB_DETAILS_QUALIFICATIONS_TYPES[2].label,
        );
      }

      if (value.midwife) {
        generatedJobQualificationsTypes.push(
          JOB_DETAILS_QUALIFICATIONS_TYPES[3].label,
        );
      }

      // Filter out undefined values from generatedInquiryDetailsTypes
      const filteredInquiryDetailsTypes = value?.inquiryDetailsTypes?.filter(
        (inquiryDetailType): inquiryDetailType is string =>
          inquiryDetailType !== undefined,
      );

      const filteredJobQualificationsTypes =
        value?.jobQualificationsTypes?.filter(
          (jobQualificationsType): jobQualificationsType is string =>
            jobQualificationsType !== undefined,
        );

      // Check array first if it has the same values to prevent infinite loop
      const isArraySameInquirDetails = isArrayValuesSame(
        generatedInquiryDetailsTypes,
        filteredInquiryDetailsTypes || [],
      );

      const isArraySameQualifications = isArrayValuesSame(
        generatedJobQualificationsTypes,
        filteredJobQualificationsTypes || [],
      );

      // Prevent infinite loop
      if (!isArraySameInquirDetails) {
        // Finally set the value
        form.setValue("inquiryDetailsTypes", generatedInquiryDetailsTypes, {
          shouldValidate: true,
        });
      }

      if (!isArraySameQualifications) {
        // Finally set the value
        form.setValue(
          "jobQualificationsTypes",
          generatedJobQualificationsTypes,
          {
            shouldValidate: true,
          },
        );
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);
};
