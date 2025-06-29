import { PostDetailDataType } from "@/components/admin/posts";
import { Positions } from "../../edit";

export type AdminStaticPageDetailResponseType = {
  success: boolean;
  message: string;
  data: AdminStaticPageDetailDataType;
};

export type AdminStaticPageDetailDataType = {
  id: string;
  title: string;
  slug: string;
  visits: number;
  created_at: string;
  updated_at: string;
  author: Author;
  content: string;
  posts: PostDetailDataType[];
  steps: Steps[];
  media: Media;
  positions: Positions[];
  rec_positions: string[];
};

type Author = {
  id: string;
  name: string;
  email: string;
  role: string;
  note: string;
};

type Media = {
  banner: Banner[];
};

type Steps = {
  id: string;
  title: string;
  header_title: string;
  content: string;
};

type Banner = {
  id: number;
  url: string;
  pivot_id: number;
  custom_attr: {
    link: string;
  };
};
