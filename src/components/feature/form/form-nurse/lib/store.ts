import { z } from "zod";
import { create } from "zustand";
import { nurseFormSchema } from "./form-schema";

type FormNurseStore = {
  hasStoredValues: boolean;
  formValues: z.infer<typeof nurseFormSchema>;
};

export const formNurseInitialState: FormNurseStore = {
  hasStoredValues: false,
  formValues: {
    lastName: "",
    firstName: "",
    sei: "",
    may: "",
    telephoneNumber: "",
    email: "",
    inquiryTypes: [],
    inquiryTypeJobApplication: false,
    inquiryTypeConsultation: false,
    inquiryTypeRegisterJob: false,
    inquiryTypeOther: false,
    inquiryContent: "",
    consent: false,
  },
};

export const useFormNurseStore = create<FormNurseStore>()(() => ({
  ...formNurseInitialState,
}));

export const setFormNurseValues = (
  formValues: z.infer<typeof nurseFormSchema>,
) => {
  useFormNurseStore.setState({
    hasStoredValues: true,
    formValues: formValues,
  });
};
