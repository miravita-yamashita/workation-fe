// #region Get Media Response
export type MediaDimensionsType = {
  width: number | null;
  height: number | null;
};

export type MediaFileAttributeType = {
  size: string;
  size_readable: string;
  mime: string;
  ext: string;
  dimensions: MediaDimensionsType | null;
};

export type MediaGalleryAttributeType = {
  title: string | null;
  caption: string | null;
  alt: string | null;
};

export type MediaImageType = {
  id: number;
  url: string;
  filename: string;
  file_attr: MediaFileAttributeType;
  custom_attr: MediaGalleryAttributeType;
  created_at_formatted: string;
  created_at: string;
};

export type GetMediaGalleryResponseType = {
  success: boolean;
  message: string;
  data: MediaImageType[];
};

// #region Delete Media Response
export type DeleteMediaResponseType = {
  success: boolean;
  message: string;
  data: null;
};
