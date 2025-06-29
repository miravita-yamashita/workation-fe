"use server";

import { hospitalFormSchema } from "@/components/feature/form";
import { genericRequest } from "@/lib/generic-action";
import { InquiryFromValuesType } from "@components/contact";
import { z } from "zod";
import { SubmitFormHospitalResponseType } from "./types";

export const submitFormHospital = async (
  inquiryFormType: InquiryFromValuesType,
  formValues: z.infer<typeof hospitalFormSchema>,
) => {
  const path = `/inquiry`;
  const {
    companyName,
    sei,
    may,
    facilityName,
    personInChargeLastName,
    personInChargeFirstName,
    postCode,
    address,
    telephoneNumber,
    email,
    inquiryContent,
  } = formValues;

  const payload = {
    company_name: companyName,
    lastname: "",
    given_name: "",
    sei,
    may,
    in_charge_fname: personInChargeFirstName,
    in_charge_lname: personInChargeLastName,
    facility: facilityName,
    postal_code: postCode,
    address: address,
    tel_number: telephoneNumber,
    email,
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

  const data: SubmitFormHospitalResponseType = await response.json();

  return data;
};
