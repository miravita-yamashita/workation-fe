"use server";

import { genericRequest } from "@/lib/generic-action";
import { SubmitFormGeneralResponseType } from "./types";
import { InquiryFromValuesType } from "@components/contact";
import { z } from "zod";
import { generalFormSchema, INQUIRY_TYPES } from "@/components/feature/form";

export const submitFormGeneral = async (
  inquiryFormType: InquiryFromValuesType,
  formValues: z.infer<typeof generalFormSchema>,
) => {
  const path = `/inquiry`;
  const {
    lastName,
    firstName,
    sei,
    may,
    telephoneNumber,
    email,
    inquiryTypes,
    inquiryContent,
  } = formValues;

  const inquiryTypesToNumber = inquiryTypes.map((inquiryType) => {
    if (inquiryType === INQUIRY_TYPES[0].label) {
      return INQUIRY_TYPES[0].value;
    }
    if (inquiryType === INQUIRY_TYPES[1].label) {
      return INQUIRY_TYPES[1].value;
    }
    if (inquiryType === INQUIRY_TYPES[2].label) {
      return INQUIRY_TYPES[2].value;
    }
  });

  const payload = {
    company_name: "",
    lastname: lastName,
    given_name: firstName,
    sei,
    may,
    in_charge: "",
    facility: "",
    postal_code: "",
    address: "",
    tel_number: telephoneNumber,
    email,
    type_of_inquiry: inquiryTypesToNumber.join(","),
    details: inquiryContent,
    form_type: inquiryFormType,
  };

  const response = await genericRequest({
    path: path,
    method: "POST",
    options: {
      body: JSON.stringify(payload),
    },
  });

  const data: SubmitFormGeneralResponseType = await response.json();

  return data;
};
