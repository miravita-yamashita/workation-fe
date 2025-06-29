import { z } from "zod";
import { JP_ERROR_MESSAGE } from "@components/feature/form/lib/error-messages-map";

const singleByteNumberRegex = /^[0-9]+$/;

export const JobFormSchema = z
  .object({
    jobTitle: z
      .string()
      .min(1, { message: JP_ERROR_MESSAGE.JOB_TITLE_REQUIRED }),
    facilityName: z
      .string()
      .min(1, { message: JP_ERROR_MESSAGE.JOB_SELECTBOX_REQUIRED }),
    description: z
      .string()
      .min(1, { message: JP_ERROR_MESSAGE.JOB_DESCRIPTION_REQUIRED })
      .max(250, { message: JP_ERROR_MESSAGE.JOB_DESCRIPTION_MAX }),
    recommendedPointsOne: z
      .string()
      .max(30, { message: JP_ERROR_MESSAGE.JOB_RECOMMENDED_POINTS_MAX })
      .optional(),
    recommendedPointsTwo: z
      .string()
      .max(30, { message: JP_ERROR_MESSAGE.JOB_RECOMMENDED_POINTS_MAX })
      .optional(),
    jobNumber: z
      .string()
      .min(1, { message: JP_ERROR_MESSAGE.JOB_NUMBER_REQUIRED }),
    employmentType: z
      .array(z.string(), {
        message: JP_ERROR_MESSAGE.FACILITY_MEDICAL_REQUIRED,
      })
      .min(1, { message: JP_ERROR_MESSAGE.FACILITY_MEDICAL_REQUIRED }),
    medicalSpecialty: z
      .array(z.string())
      .min(1, { message: JP_ERROR_MESSAGE.FACILITY_MEDICAL_REQUIRED_2ND }),
    assignment: z
      .string()
      .min(1, { message: JP_ERROR_MESSAGE.JOB_SELECTBOX_REQUIRED }),
    facilityType: z
      .string()
      .min(1, { message: JP_ERROR_MESSAGE.JOB_SELECTBOX_REQUIRED }),
    cityAddress: z
      .string()
      .min(1, { message: JP_ERROR_MESSAGE.FACILITY_CITY_REQUIRED }),
    streetAddress: z.string().optional(),
    minimumSalary: z
      .string()
      .optional()
      .refine((value) => !value || singleByteNumberRegex.test(value), {
        message: JP_ERROR_MESSAGE.JOB_SALARY_BYTE,
      }),
    maximumSalary: z
      .string()
      .optional()
      .refine((value) => !value || singleByteNumberRegex.test(value), {
        message: JP_ERROR_MESSAGE.JOB_SALARY_BYTE,
      }),
    bonus: z.string().min(1, { message: JP_ERROR_MESSAGE.JOB_BONUS_REQUIRED }),
    startWorkingHours: z
      .string()
      .min(1, { message: JP_ERROR_MESSAGE.JOB_SELECTION_REQUIRED }),
    endWorkingHours: z
      .string()
      .min(1, { message: JP_ERROR_MESSAGE.JOB_SELECTION_REQUIRED }),
    workingHoursNotes: z.string().optional(),
    daysOff: z
      .string()
      .min(1, { message: JP_ERROR_MESSAGE.JOB_DAYSOFF_REQUIRED }),
    prefecture: z
      .string()
      .min(1, { message: JP_ERROR_MESSAGE.FACILITY_PREFECTURE_REQUIRED }),
    recommendedJobOne: z.string().optional(),
    recommendedJobTwo: z.string().optional(),
    recommendedJobThree: z.string().optional(),
    faqForNursesIdOne: z.string().optional(),
    faqForNursesIdTwo: z.string().optional(),
    faqForNursesIdThree: z.string().optional(),
    faqForNursesQuestionOne: z.string().optional(),
    faqForNursesQuestionTwo: z.string().optional(),
    faqForNursesQuestionThree: z.string().optional(),
    faqForNursesAnswerOne: z.string().optional(),
    faqForNursesAnswerTwo: z.string().optional(),
    faqForNursesAnswerThree: z.string().optional(),
    faqForMedicalIdOne: z.string().optional(),
    faqForMedicalIdTwo: z.string().optional(),
    faqForMedicalIdThree: z.string().optional(),
    faqForMedicalInstitutionsQuestionOne: z.string().optional(),
    faqForMedicalInstitutionsQuestionTwo: z.string().optional(),
    faqForMedicalInstitutionsQuestionThree: z.string().optional(),
    faqForMedicalInstitutionsAnswerOne: z.string().optional(),
    faqForMedicalInstitutionsAnswerTwo: z.string().optional(),
    faqForMedicalInstitutionsAnswerThree: z.string().optional(),
    faqForGeneralIdOne: z.string().optional(),
    faqForGeneralIdTwo: z.string().optional(),
    faqForGeneralIdThree: z.string().optional(),
    faqForGeneralAudienceQuestionOne: z.string().optional(),
    faqForGeneralAudienceQuestionTwo: z.string().optional(),
    faqForGeneralAudienceQuestionThree: z.string().optional(),
    faqForGeneralAudienceAnswerOne: z.string().optional(),
    faqForGeneralAudienceAnswerTwo: z.string().optional(),
    faqForGeneralAudienceAnswerThree: z.string().optional(),
    contractType: z
      .string()
      .min(1, { message: JP_ERROR_MESSAGE.JOB_SELECTBOX_REQUIRED }),
    recommendationOne: z.string().optional(),
    recommendationTwo: z.string().optional(),
    recommendationThree: z.string().optional(),
    recommendationFour: z.string().optional(),
    recommendationFive: z.string().optional(),
    imagesData: z
      .array(
        z.object({
          id: z.string(),
          url: z.string().url().optional(),
        }),
      )
      .optional(),
    imagesBannerData: z
      .array(
        z.object({
          id: z.string(),
          url: z.string().url(),
          custom_attr: z
            .string()
            .min(1, { message: JP_ERROR_MESSAGE.GENERIC_REQUIRED })
            .url({ message: JP_ERROR_MESSAGE.JOB_BANNER_LINK_INVALID }),
        }),
      )
      .optional(),
  })
  .refine(
    (data) => {
      if (!data.maximumSalary) return true; // Skip validation if maximumSalary is empty or undefined
      return Number(data.minimumSalary) <= Number(data.maximumSalary);
    },
    {
      message: JP_ERROR_MESSAGE.JOB_SALARY_MINIMUM_LARGER_MAX,
      path: ["maximumSalary"],
    },
  )
  .superRefine((data: Record<string, unknown>, ctx) => {
    const requiredFields = [
      { id: "faqForNursesIdOne", answer: "faqForNursesAnswerOne" },
      { id: "faqForNursesIdTwo", answer: "faqForNursesAnswerTwo" },
      { id: "faqForNursesIdThree", answer: "faqForNursesAnswerThree" },
      {
        id: "faqForMedicalIdOne",
        answer: "faqForMedicalInstitutionsAnswerOne",
      },
      {
        id: "faqForMedicalIdTwo",
        answer: "faqForMedicalInstitutionsAnswerTwo",
      },
      {
        id: "faqForMedicalIdThree",
        answer: "faqForMedicalInstitutionsAnswerThree",
      },
      { id: "faqForGeneralIdOne", answer: "faqForGeneralAudienceAnswerOne" },
      { id: "faqForGeneralIdTwo", answer: "faqForGeneralAudienceAnswerTwo" },
      {
        id: "faqForGeneralIdThree",
        answer: "faqForGeneralAudienceAnswerThree",
      },
    ];

    requiredFields.forEach(({ id, answer }) => {
      const idValue = data[id];
      const answerValue = data[answer];

      // Explicitly check types before using them
      if (typeof idValue === "string" && idValue === "1") {
        if (typeof answerValue !== "string" || answerValue.trim() === "") {
          ctx.addIssue({
            path: [answer],
            message: JP_ERROR_MESSAGE.JOB_FAQ_ANSWER_REQUIRED,
            code: "custom",
          });
        }
      }
    });
  });
