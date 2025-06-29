export type GetRecommendedArticlesResponseType = {
  success: boolean;
  message: string;
  data: RecommendedArticleType[];
};

export type RecommendedArticleType = {
  id: string;
  title: string;
  slug: string;
  content: string;
  meta_title: string;
  meta_description: string;
  short_title: string;
  long_title: string;
  number_of_visit: number;
  is_recommended: boolean;
  tags: string[];
  media: Media;
  recommended_articles: RecommendedArticleType[];
  created_at: string;
};

type Media = {
  banner: MediaItem[];
  featured: MediaItem[];
};

type MediaItem = {
  id: number;
  url: string;
  pivot_id: number;
};
