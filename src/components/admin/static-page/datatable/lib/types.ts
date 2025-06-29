export type AdminStaticPageListResponseType = {
  success: boolean;
  message: string;
  data: AdminStaticPageListDataType[];
};

export type AdminStaticPageListDataType = {
  id: string;
  title: string;
  slug: string;
  visits: number;
  created_at: string;
  updated_at: string;
  author: {
    login_id: string;
    email: string;
    family_name: string;
    name: string;
    nickname: string;
  };
  created_at_list: string;
  updated_at_list: string;
};
