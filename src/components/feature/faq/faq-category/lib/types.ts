export type FAQCategoryType = {
  id: string;
  name: string;
};

export type GetFAQCategoryResponseType = {
  success: boolean;
  message: string;
  data: FAQCategoryType[];
};
