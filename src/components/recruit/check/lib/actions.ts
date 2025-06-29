"use server";

import { SubmitFormGeneralResponseType } from "@/components/contact/check/lib";
import {
  JOB_DETAILS_INQUIRY_TYPES,
  JOB_DETAILS_QUALIFICATIONS_TYPES,
  jobApplicationFormSchema,
} from "@/components/feature/form/form-job";
import { genericRequest } from "@/lib/generic-action";
import { z } from "zod";

export const submitFormJobApplication = async (
  formValues: z.infer<typeof jobApplicationFormSchema>,
) => {
  const path = `/jobs/apply`;
  const {
    id,
    jobNumber,
    lastName,
    firstName,
    sei,
    may,
    inquiryDetailsTypes,
    jobQualificationsTypes,
    dobDay,
    dobMonth,
    dobYear,
    postCode,
    address,
    telephoneNumber,
    email,
    inquiryContent,
  } = formValues;

  const inquiryDetailsTypesToNumber = inquiryDetailsTypes.map(
    (inquiryDetailsType) => {
      if (inquiryDetailsType === JOB_DETAILS_INQUIRY_TYPES[0].label) {
        return JOB_DETAILS_INQUIRY_TYPES[0].value;
      }
      if (inquiryDetailsType === JOB_DETAILS_INQUIRY_TYPES[1].label) {
        return JOB_DETAILS_INQUIRY_TYPES[1].value;
      }
      if (inquiryDetailsType === JOB_DETAILS_INQUIRY_TYPES[2].label) {
        return JOB_DETAILS_INQUIRY_TYPES[2].value;
      }
      if (inquiryDetailsType === JOB_DETAILS_INQUIRY_TYPES[3].label) {
        return JOB_DETAILS_INQUIRY_TYPES[3].value;
      }
    },
  );

  const jobQualificationsTypesToNumber = jobQualificationsTypes.map(
    (jobQualificationsType) => {
      if (jobQualificationsType === JOB_DETAILS_QUALIFICATIONS_TYPES[0].label) {
        return JOB_DETAILS_INQUIRY_TYPES[0].value;
      }
      if (jobQualificationsType === JOB_DETAILS_QUALIFICATIONS_TYPES[1].label) {
        return JOB_DETAILS_INQUIRY_TYPES[1].value;
      }
      if (jobQualificationsType === JOB_DETAILS_QUALIFICATIONS_TYPES[2].label) {
        return JOB_DETAILS_INQUIRY_TYPES[2].value;
      }
      if (jobQualificationsType === JOB_DETAILS_QUALIFICATIONS_TYPES[3].label) {
        return JOB_DETAILS_INQUIRY_TYPES[3].value;
      }
    },
  );

  const payload = {
    position_ids: id,
    job_number: jobNumber,
    lastname: lastName,
    firstname: firstName,
    sei,
    may,
    inquiry_details: inquiryDetailsTypesToNumber.join(","),
    job_qualifications: jobQualificationsTypesToNumber.join(","),
    dob: `${dobYear}-${dobMonth}-${dobDay}`,
    zip_code: postCode,
    address,
    tel_number: telephoneNumber,
    email,
    other_req: inquiryContent,
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
