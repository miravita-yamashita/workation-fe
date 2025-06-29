export type SubCategoryItemType = {
  id: string;
  name: string;
};

export type SubCategoryDataType = {
  id: string;
  name: string;
  number: string;
  status: string;
  updated_at: string;
  created_at: string;
  category: {
    id: string;
    name: string;
  };
  items: SubCategoryItemType[];
};

export type GetSubCategoryResponseType = {
  success: boolean;
  message: string;
  data: SubCategoryDataType;
};
