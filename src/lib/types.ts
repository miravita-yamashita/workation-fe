import { PropsWithChildren } from "react";

export type CommonProps = PropsWithChildren & {
  className?: string;
};

export type PaginationLink = {
  url: string | null;
  label: string;
  active: boolean;
};

export type Area = {
  prefectures: number;
  label: string;
};

export type GenericUpdateApiResponseType = {
  success: boolean;
  message: string;
  data: null;
};
