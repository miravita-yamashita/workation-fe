import { z } from "zod";
import { create } from "zustand";
import { hospitalFormSchema } from "./form-schema";

type FormHospitalStore = {
  hasStoredValues: boolean;
  formValues: z.infer<typeof hospitalFormSchema>;
};

export const formHospitalInitialState: FormHospitalStore = {
  hasStoredValues: false,
  formValues: {
    companyName: "",
    sei: "",
    may: "",
    facilityName: "",
    personInChargeLastName: "",
    personInChargeFirstName: "",
    postCode: "",
    address: "",
    telephoneNumber: "",
    email: "",
    inquiryContent: "",
    consent: false,
  },
};

export const useFormHospitalStore = create<FormHospitalStore>()(() => ({
  ...formHospitalInitialState,
}));

export const setFormHospitalValues = (
  formValues: z.infer<typeof hospitalFormSchema>,
) => {
  useFormHospitalStore.setState({
    hasStoredValues: true,
    formValues: formValues,
  });
};
