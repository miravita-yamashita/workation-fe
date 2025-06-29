// Consolidated the status types and values for the inquiry forms here.

// Types of Inquiry Form  - FE and BE decided to use static values for the types of inquiry form
// This is used to know what form is being saved in the backend
export enum InquiryFromType {
  General = 0,
  Nurse = 1,
  Hospital = 2,
}

export type InquiryFromValuesType = InquiryFromType;

// Inquiry Form for Nurses - FE and BE decided to use static values
// No endpoint to get the values from the backend - backend will pass ids in their responses
export const INQUIRY_TYPES_GENERAL = [
  {
    id: 1,
    value: 1,
    label: "メディアに関するお問い合わせ",
  },
  {
    id: 2,
    value: 2,
    label: "権利侵害に関するお問い合わせ",
  },
  {
    id: 3,
    value: 3,
    label: "その他",
  },
];

// Inquiry Form for Nurses -  FE and BE decided to use static values
// No endpoint to get the values from the backend - backend will pass ids in their responses
export const INQUIRY_TYPES_NURSES = [
  {
    id: 1,
    value: 1,
    label: "求人の応募",
  },
  {
    id: 2,
    value: 2,
    label: "入職後のご相談",
  },
  {
    id: 3,
    value: 3,
    label: "求人の登録について",
  },
  {
    id: 4,
    value: 4,
    label: "その他",
  },
];
