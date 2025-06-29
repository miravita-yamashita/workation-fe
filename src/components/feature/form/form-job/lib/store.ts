import { z } from "zod";
import { create } from "zustand";
import { jobApplicationFormSchema } from "./form-schema";

type FormJobDetailsStore = {
  hasStoredValues: boolean;
  formValues: z.infer<typeof jobApplicationFormSchema>;
};

type JobDetails = {
  jobId: string;
  jobNumber: string;
  jobTitle: string;
  eligibility: string;
  jobDescription: string;
  workingHours: string;
  salaryIncrease: string | null;
};

type JobDetailsStore = {
  jobDetails: JobDetails;
  setJobDetails: (jobDetails: JobDetails) => void;
};

export const formJobDetailsInitialState: FormJobDetailsStore = {
  hasStoredValues: false,
  formValues: {
    id: "",
    jobNumber: "",
    lastName: "",
    firstName: "",
    sei: "",
    may: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    postCode: "",
    address: "",
    telephoneNumber: "",
    email: "",
    inquiryDetailsTypes: [],
    jobQualificationsTypes: [],
    inquiryDetailsJobApplication: false,
    inquiryDetailsTourFacility: false,
    inquiryDetailsJob: false,
    inquiryDetailsOthers: false,
    nurse: false,
    publicHealthNurse: false,
    associateNurse: false,
    midwife: false,
    inquiryContent: "",
    consent: false,
  },
};

export const useFormJobDetailsStore = create<FormJobDetailsStore>()(() => ({
  ...formJobDetailsInitialState,
}));

export const setFormJobDetailsValues = (
  formValues: z.infer<typeof jobApplicationFormSchema>,
) => {
  useFormJobDetailsStore.setState({
    hasStoredValues: true,
    formValues: formValues,
  });
};

export const useJobDetailsStore = create<JobDetailsStore>((set) => ({
  jobDetails: {
    jobId: "",
    jobNumber: "",
    jobTitle: "",
    eligibility: "",
    jobDescription: "",
    workingHours: "",
    salaryIncrease: "",
  },
  setJobDetails: (jobDetails) => set({ jobDetails }),
}));
