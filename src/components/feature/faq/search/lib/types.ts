export enum FAQSearchParamKey {
  Search = "filter[question]",
  Category = "filter[category]",

  Group = "groupName",
}
type FAQItemType = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export type FAQSearchResponseType = {
  success: boolean;
  message: string;
  data: {
    current_page: number;
    data: FAQItemType[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
  };
};

export type PopularSearchKeywordsDataType = {
  id: number;
  name: string;
};

export type PopularSearchKeywordsResponseType = {
  success: boolean;
  message: string;
  data: {
    question: PopularSearchKeywordsDataType[];
  };
};