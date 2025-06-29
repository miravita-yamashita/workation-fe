// #region Upload Media
export type UploadMediaResponseType = {
  success: boolean;
  message: string;
  data: null;
};

// #region Update Media
export type UpdateMediaDimensionsType = {
  width: number | null;
  height: number | null;
};

export type UpdateMediaFileAttrType = {
  size: string;
  size_readable: string;
  mime: string;
  ext: string;
  dimensions: UpdateMediaDimensionsType | null;
};

export type UpdateMediaCustomAttrType = {
  title: string | null;
  caption: string | null;
  alt: string | null;
};

export type UpdateMediaImageType = {
  id: number;
  url: string;
  filename: string;
  file_attr: UpdateMediaFileAttrType;
  custom_attr: UpdateMediaCustomAttrType;
};

export type UpdateMediaResponseType = {
  success: boolean;
  message: string;
  data: UpdateMediaImageType;
};
