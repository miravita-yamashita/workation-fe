"use server";

import { genericRequest } from "@/lib/generic-action";
import { InquiryFromValuesType } from "@components/contact";
import { z } from "zod";
import { nurseFormSchema, NURSES_INQUIRY_TYPES } from "@/components/feature/form";
import { SubmitFormNurseResponseType } from "./types";

export const submitFormNurse = async (
  inquiryFormType: InquiryFromValuesType,
  formValues: z.infer<typeof nurseFormSchema>,
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
    if (inquiryType === NURSES_INQUIRY_TYPES[0].label) {
      return NURSES_INQUIRY_TYPES[0].value;
    }
    if (inquiryType === NURSES_INQUIRY_TYPES[1].label) {
      return NURSES_INQUIRY_TYPES[1].value;
    }
    if (inquiryType === NURSES_INQUIRY_TYPES[2].label) {
      return NURSES_INQUIRY_TYPES[2].value;
    }
     if (inquiryType === NURSES_INQUIRY_TYPES[3].label) {
       return NURSES_INQUIRY_TYPES[3].value;
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

  const data: SubmitFormNurseResponseType = await response.json();

  return data;
};
