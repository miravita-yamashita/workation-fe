"use server";

import { genericRequest } from "@/lib/generic-action";
import { z } from "zod";
import { applicationFormSchema } from "./form-schema";
import { ApplicationFormResponse } from "./types";
import { SelectedJobType } from "@/components/feature/modal/modal-application";

export const submitFormApplication = async (
  formValues: z.infer<typeof applicationFormSchema>,
  jobs: SelectedJobType[],
) => {
  const path = `/jobs/apply`;
  const {
    lastName,
    firstName,
    sei,
    may,
    telephoneNumber,
    email,
    inquiryTypes,
    qualifications,
    address,
    postCode,
    year,
    month,
    day,
    inquiryContent,
  } = formValues;

  const payload = {
    position_ids: jobs.length > 0 ? jobs.map((job) => job?.id) : [],
    lastname: lastName,
    firstname: firstName,
    sei: sei,
    may: may,
    inquiry_details: inquiryTypes.join(", "),
    req_qualification: qualifications.join(", "),
    dob: `${year}-${month}-${day}`,
    zip_code: postCode,
    address: address,
    tel_number: telephoneNumber,
    email: email,
    other_req: inquiryContent,
  };

  const response = await genericRequest({
    path: path,
    method: "POST",
    options: {
      body: JSON.stringify(payload),
    },
  });

  const data: ApplicationFormResponse = await response.json();

  return data;
};
