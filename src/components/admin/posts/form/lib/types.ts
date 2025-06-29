export type CommonListType = {
  id: string;
  name: string;
};

// #region Recommended Jobs
export type GetRecommendedJobsResponseType = {
  success: boolean;
  message: string;
  data: CommonListType[];
};

// #region Post Categories
export type GetCategoriesResponseType = {
  success: boolean;
  message: string;
  data: {
    post: CommonListType[];
  };
};

// #region Post Tags
export type GetTagsResponseType = {
  success: boolean;
  message: string;
  data: CommonListType[];
};

// #region Articles for Dropdown
// This is just a partial response, you can check full response at admin/article/dropdown
export type ArticleDropdownType = {
  id: string;
  name: string;
};
export type GetArticleDropdownResponseType = {
  success: boolean;
  message: string;
  data: ArticleDropdownType[];
};

// #region FAQ for dropdown
// This is just a partial response, you can check full response at admin/question/dropdown
export type FAQDropdownType = {
  id: string;
  name: string;
};

export type GetFAQDropdownResponseType = {
  success: boolean;
  message: string;
  data: FAQDropdownType[];
};

// #region Form related
export type ArticleDropdownDataType = {
  first: ArticleDropdownType[];
  second: ArticleDropdownType[];
  third: ArticleDropdownType[];
};
