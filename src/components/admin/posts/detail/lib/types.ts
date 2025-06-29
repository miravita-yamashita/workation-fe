type TagType = {
  id: string;
  name: string;
};

type CommonMediaType = {
  id: number;
  url: string;
  pivot_id: number;
  custom_attr: {
    link: string;
  } | null;
};

type MediaType = {
  banner: CommonMediaType[];
  featured: CommonMediaType[];
};

type PostCategoryType = {
  id: string;
  name: string;
};

type ArticleType = {
  id: string;
  title: string;
  slug: string;
  content: string;
  meta_title: string;
  meta_description: string;
  number_of_visit: number;
  media: MediaType;
  created_at: string;
};

type QuestionType = {
  id: string;
  question: string;
  answer: string;
  category: string;
  created_at: string;
  create_at_details: string;
  updated_at: string;
};

export type PostDetailDataType = {
  id: string;
  title: string;
  slug: string;
  content: string;
  meta_title: string;
  meta_description: string;
  short_title: string;
  long_title: string;
  number_of_visit: number;
  tags: TagType[];
  media: MediaType;
  article_categories: PostCategoryType[];
  recommended_articles: ArticleType[];
  questions: QuestionType[];
  created_at: string;
  author: {
    name: string;
    email: string;
  };
  is_recommended: boolean;
};

export type GetPostDetailResponseType = {
  success: boolean;
  message: string;
  data: {
    article: PostDetailDataType;
    related_articles: ArticleType[];
  };
};
