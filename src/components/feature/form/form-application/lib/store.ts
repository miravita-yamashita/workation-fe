import { z } from "zod";
import { create } from "zustand";
import { applicationFormSchema } from "./form-schema";

type FormApplicationStore = {
  hasStoredValues: boolean;
  formValues: z.infer<typeof applicationFormSchema>;
};

export const formApplicationInitialState: FormApplicationStore = {
  hasStoredValues: false,
  formValues: {
    lastName: "",
    firstName: "",
    sei: "",
    may: "",
    telephoneNumber: "",
    email: "",
    inquiryTypes: [],
    inquiryTypeApply: false,
    inquiryTypeInquire: false,
    inquiryTypeVisit: false,
    inquiryTypeOther: false,
    inquiryContent: "",
    consent: false,
    qualifications: [],
    qualificationsNurse: false,
    qualificationsAssistant: false,
    qualificationsHealth: false,
    qualificationsMidWife: false,
    postCode: "",
    address: "",
    year: "",
    month: "",
    day: "",
  },
};

export const useFormApplicationStore = create<FormApplicationStore>()(() => ({
  ...formApplicationInitialState,
}));

export const setFormApplicationValues = (
  formValues: z.infer<typeof applicationFormSchema>,
) => {
  useFormApplicationStore.setState({
    hasStoredValues: true,
    formValues: formValues,
  });
};
