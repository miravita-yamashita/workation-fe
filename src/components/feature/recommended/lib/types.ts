export type SaveToResponseType = {
  success: boolean;
  message: string;
  data: Data;
  errors?: object;
};

export type Data = {
  message: string;
};
