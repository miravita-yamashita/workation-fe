// #region Filter Keys
export enum ArticleSearchParamKey {
  Keyword = "filter[keyword]",
  Tag = "filter[tag]",
}

// #region Get Article Search Result
export type TagType = {
  id: string;
  name: string;
};

export type MediaType = {
  banner: BannerType[];
  featured: CustomType[];
};

export type BannerType = {
  id: number;
  url: string;
  custom_attr: string | null;
};

export type CustomType = {
  id: number;
  url: string;
  custom_attr: string | null;
};

export type RecommendedArticleType = {
  id: string;
  title: string;
  slug: string;
  content: string;
  meta_title: string;
  meta_description: string;
  tags: TagType[];
  media: MediaType;
};
export type ArticleSearchResultType = {
  id: string;
  title: string;
  slug: string;
  content: string;
  meta_title: string;
  meta_description: string;
  number_of_visit: number;
  tags: TagType[];
  media: MediaType;
  recommended_articles: RecommendedArticleType[];
};

export type GetArticleSearchResponseType = {
  success: boolean;
  message: string;
  data: ArticleSearchResultType[];
};
