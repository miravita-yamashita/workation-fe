type MediaType = {
  id: number;
  media: string;
};

type BaseItemType = {
  id: string;
  title: string;
};

type GreetingType = BaseItemType & {
  plain_content: string;
  philosophy: string;
  media: MediaType[];
};

type GuideType = BaseItemType & {
  plain_content: string;
};

type ProfileType = BaseItemType & {
  plain_content: string;
};

export type CompanyDataType = {
  id: string;
  title: string;
  slug: string;
  created_at: string;
  updated_at: string;
  greetings: GreetingType[];
  guide: GuideType[];
  profile: ProfileType[];
};

// This is just a partial response for /pages/:id
export type GetCompanyProfileResponseType = {
  success: boolean;
  message: string;
  data: CompanyDataType;
};
