"use server";

import { DeleteGenericItemApiResponseType } from "@/components/feature/datatable";
import { genericRequest } from "@/lib/generic-action";
import { z } from "zod";
import { JobFormSchema } from "./form-schema";
import {
  AdminAreaNameListResponseType,
  JobCategoriesResponseType,
  JobDetailsResponseType,
  JobFacilitiesResponseType,
  JobFAQResponseType,
  JobRecommendedResponseType,
} from "./types";

export const getJobCategories = async () => {
  const path = `/category/item?filter[name]=specific,work_form,medical_specialty,assignment,facility_form,contract`;
  const response = await genericRequest({
    path: path,
    method: "GET",
  });

  const data: JobCategoriesResponseType = await response.json();
  return data;
};

export const getFacilityList = async () => {
  const path = `/facility/list`;
  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: JobFacilitiesResponseType = await response.json();
  return data;
};

export const getJobFAQ = async () => {
  const path = `/question?filter[category]=看護師向け,医療機関向け,般向け`;
  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: JobFAQResponseType = await response.json();
  return data;
};

export const getJobRecommended = async () => {
  const path = `/job/recommended/list`;
  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: JobRecommendedResponseType = await response.json();
  return data;
};

export const getJobShow = async (jobId: string) => {
  const path = `/job/${jobId}`;
  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: JobDetailsResponseType = await response.json();
  return data;
};

export const createUpdateJob = async (
  values: z.infer<typeof JobFormSchema>,
  id?: string,
) => {
  let path;
  if (id) {
    path = `/job/${id}`;
  } else {
    path = `/job`;
  }

  interface BannerType {
    id: string;
    url: string;
  }

  let bannerData: BannerType[] = [];
  if (values?.imagesBannerData && values?.imagesBannerData?.length > 0) {
    bannerData = values?.imagesBannerData?.map((image) => ({
      id: image.id,
      url: image.custom_attr,
    }));
  }

  type CustomFaqType = {
    question: string | undefined;
    answer: string | undefined;
    category: string | undefined;
  };

  const customNurse: CustomFaqType[] = [];
  const customMedical: CustomFaqType[] = [];
  const customGeneral: CustomFaqType[] = [];

  if (values?.faqForNursesIdOne === "1") {
    customNurse.push({
      question: values?.faqForNursesQuestionOne,
      answer: values?.faqForNursesAnswerOne,
      category: "看護師向け",
    });
  }

  if (values?.faqForNursesIdTwo === "1") {
    customNurse.push({
      question: values?.faqForNursesQuestionTwo,
      answer: values?.faqForNursesAnswerTwo,
      category: "看護師向け",
    });
  }

  if (values?.faqForNursesIdThree === "1") {
    customNurse.push({
      question: values?.faqForNursesQuestionThree,
      answer: values?.faqForNursesAnswerThree,
      category: "看護師向け",
    });
  }

  if (values?.faqForMedicalIdOne === "1") {
    customMedical.push({
      question: values?.faqForMedicalInstitutionsQuestionOne,
      answer: values?.faqForMedicalInstitutionsAnswerOne,
      category: "医療機関向け",
    });
  }

  if (values?.faqForMedicalIdTwo === "1") {
    customMedical.push({
      question: values?.faqForMedicalInstitutionsQuestionTwo,
      answer: values?.faqForMedicalInstitutionsAnswerTwo,
      category: "医療機関向け",
    });
  }

  if (values?.faqForMedicalIdThree === "1") {
    customMedical.push({
      question: values?.faqForMedicalInstitutionsQuestionThree,
      answer: values?.faqForMedicalInstitutionsAnswerThree,
      category: "医療機関向け",
    });
  }

  if (values?.faqForGeneralIdOne === "1") {
    customGeneral.push({
      question: values?.faqForGeneralAudienceQuestionOne,
      answer: values?.faqForGeneralAudienceAnswerOne,
      category: "一般向け",
    });
  }

  if (values?.faqForGeneralIdTwo === "1") {
    customGeneral.push({
      question: values?.faqForGeneralAudienceQuestionTwo,
      answer: values?.faqForGeneralAudienceAnswerTwo,
      category: "一般向け",
    });
  }

  if (values?.faqForGeneralIdThree === "1") {
    customGeneral.push({
      question: values?.faqForGeneralAudienceQuestionThree,
      answer: values?.faqForGeneralAudienceAnswerThree,
      category: "一般向け",
    });
  }

  const formDataMapping = {
    job_title: values?.jobTitle,
    facility_id: values?.facilityName,
    description: values?.description,
    recommendation_point_1: values?.recommendedPointsOne,
    recommendation_point_2: values?.recommendedPointsTwo,
    job_number: values?.jobNumber,
    facility_type: [values?.facilityType], // Can be an array
    recruitement_category: values?.employmentType, // Can be an array
    medical_category: values?.medicalSpecialty, // Can be an array
    assignment_category: [values?.assignment], // Can be an array
    address_city: values?.cityAddress,
    address_street: values?.streetAddress,
    salary_min: values?.minimumSalary,
    salary_max: values?.maximumSalary,
    contract_form: values?.contractType,
    bonus: values?.bonus,
    work_start_time: values?.startWorkingHours,
    work_end_time: values?.endWorkingHours,
    work_time_notes: values?.workingHoursNotes,
    holidays: values?.daysOff,
    prefectures: values.prefecture,
    recommended_jobs: [
      values?.recommendedJobOne,
      values?.recommendedJobTwo,
      values?.recommendedJobThree,
    ].filter(Boolean),
    recommendations: [
      values?.recommendationOne,
      values?.recommendationTwo,
      values?.recommendationThree,
      values?.recommendationFour,
      values?.recommendationFive,
    ].filter(Boolean),
    faq_nurses:
      [
        values?.faqForNursesIdOne !== "1"
          ? values?.faqForNursesQuestionOne
          : null,
        values?.faqForNursesIdTwo !== "1"
          ? values?.faqForNursesQuestionTwo
          : null,
        values?.faqForNursesIdThree !== "1"
          ? values?.faqForNursesQuestionThree
          : null,
      ].filter(Boolean) || [],
    faq_medical_institutions:
      [
        values?.faqForMedicalIdOne !== "1"
          ? values?.faqForMedicalInstitutionsQuestionOne
          : null,
        values?.faqForMedicalIdTwo !== "1"
          ? values?.faqForMedicalInstitutionsQuestionTwo
          : null,
        values?.faqForMedicalIdThree !== "1"
          ? values?.faqForMedicalInstitutionsQuestionThree
          : null,
      ].filter(Boolean) || [],
    faq_general:
      [
        values?.faqForGeneralIdOne !== "1"
          ? values?.faqForGeneralAudienceQuestionOne
          : null,
        values?.faqForGeneralIdTwo !== "1"
          ? values?.faqForGeneralAudienceQuestionTwo
          : null,
        values?.faqForGeneralIdThree !== "1"
          ? values?.faqForGeneralAudienceQuestionThree
          : null,
      ].filter(Boolean) || [],
    media_featured: values?.imagesData?.map((img) => Number(img.id)) || [],
    media_banner: bannerData,
    faq_custom: [...customNurse, ...customMedical, ...customGeneral],
  };

  const response = await genericRequest({
    path: path,
    method: "POST",
    options: {
      body: JSON.stringify(formDataMapping),
    },
    isAdminPath: true,
  });

  const data: JobDetailsResponseType = await response.json();

  return data;
};

export const deleteJob = async (id: string | string[] | undefined) => {
  if (!id) return null;
  const path = `/job/delete`;
  const payload = { position_ids: [id] };

  const response = await genericRequest({
    path: path,
    method: "POST",
    options: {
      body: JSON.stringify(payload),
    },
    isAdminPath: true,
  });

  const data: DeleteGenericItemApiResponseType = await response.json();

  return data;
};

export const getAdminAreaNameList = async () => {
  const path = `/prefecture`;
  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: AdminAreaNameListResponseType = await response.json();
  return data;
};
