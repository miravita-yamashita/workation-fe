export type DeleteGenericItemApiResponseType = {
  success: boolean;
  message: string;
  data: null;
  errors?: string;
};

export type GenericItemDataType = {
  id: string | number;
  name: string;
};

export type GenericItemsListDataType = GenericItemDataType[];

export type AdminAreaNameListResponseType = {
  success: boolean;
  message: string;
  data: AdminAreaNameListDataType[];
};

export type AdminAreaNameListDataType = {
  id: string;
  name: string;
};
