export type ContentResponseType = {
  success: boolean;
  message: string;
  data: ContentDataType[];
};

export type ContentDataType = {
  title: string;
  description: string;
  color: string;
  url: string;
  movie_category: {
    id: string;
    name: string;
  };
  content_images: string;
};
