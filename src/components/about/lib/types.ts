export type ArticleDetailsDataType = {
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
  related_articles: RecommendedArticleType[];
  questions: QuestionType[];
};

export type TagType = {
  id: string;
  name: string;
};

export type MediaType = {
  banner: BannerType[];
  featured: BannerType[];
};

export type BannerType = {
  id: number;
  url: string;
  pivot_id: number;
  custom_attr: {
    link: string;
  } | null;
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

export type QuestionType = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export type GetArticleDetailResponseType = {
  success: boolean;
  message: string;
  data: {
    article: ArticleDetailsDataType;
    related_articles: RecommendedArticleType[];
  };
};

// #region Article Search Keywords
export type ArticleSearchDataType = {
  id: string;
  name: string;
};
export type GetArticleSearchKeywordsResponseType = {
  success: boolean;
  message: string;
  data: {
    post: ArticleSearchDataType[];
  };
};

export type ArticleAboutResponse = {
  success: boolean;
  message: string;
  data: ArticleAboutDataType;
};

export type ArticleAboutDataType = {
  article: Article;
  related_articles: Article[];
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  content: string;
  meta_title: string;
  meta_description: string;
  number_of_visit: number;
  tags?: Tag[];
  media: Media;
  recommended_articles?: Article[];
  questions?: unknown[];
  article_categories?: unknown[];
  created_at: string;
};

export type Media = {
  banner: Banner[];
  featured: Banner[];
};

export type Banner = {
  id: number;
  url: string;
  custom_attr: null;
};

export type Tag = {
  id: string;
  name: string;
};
