import { z } from "zod";
import { create } from "zustand";
import { generalFormSchema } from "./form-schema";

type FormGeneralStore = {
  hasStoredValues: boolean;
  formValues: z.infer<typeof generalFormSchema>;
};

export const formGeneralInitialState: FormGeneralStore = {
  hasStoredValues: false,
  formValues: {
    lastName: "",
    firstName: "",
    sei: "",
    may: "",
    telephoneNumber: "",
    email: "",
    inquiryTypes: [],
    inquiryTypeMedia: false,
    inquiryTypeInfringement: false,
    inquiryTypeOther: false,
    inquiryContent: "",
    consent: false,
  },
};

export const useFormGeneralStore = create<FormGeneralStore>()(() => ({
  ...formGeneralInitialState,
}));

export const setFormGeneralValues = (
  formValues: z.infer<typeof generalFormSchema>,
) => {
  useFormGeneralStore.setState({
    hasStoredValues: true,
    formValues: formValues,
  });
};