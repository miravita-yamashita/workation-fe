export enum FAQPopularGroup {
  General = "For the general public",
  Nurse = "For nurses",
  Hospital = "For medical institutions",
}

export type FAQPopularItemType = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export type FAQPopularCategoryType = {
  [id: string]: FAQPopularItemType;
};

export type FAQPopularByGroupResponseType = {
  success: boolean;
  message: string;
  data: {
    [category: string]: FAQPopularCategoryType;
  };
};

export type FAQPopularClickResponseType = {
  question_id: string;
  user_id: string;
  id: string;
};

