// #region Get Static Page Detail
export type AuthorType = {
  id: string;
  login_id: string;
  email: string;
  family_name: string;
  nickname: string;
};

export type StaticPageType = {
  id: string;
  title: string;
  slug: string;
  visits: number;
  created_at: string;
  updated_at: string | null;
  content: string;
};

export type GetStaticPageDetailResponseType = {
  success: boolean;
  message: string;
  data: StaticPageType & {
    author: AuthorType;
  };
};
