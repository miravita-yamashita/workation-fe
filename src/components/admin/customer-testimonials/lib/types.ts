import { PaginationLink } from "@/lib/types";

export type AdminCustomerTestimonialListResponseType = {
  success: boolean;
  message: string;
  data: AdminCustomerTestimonialListResponse;
};

export type AdminCustomerTestimonialListResponse = {
  data: AdminCustomerTestimonialListDataType[];
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  path: string;
  next_page_url: string | null;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number | string;
  links: PaginationLink[];
};

export type AdminCustomerTestimonialListDataType = {
  id: string;
  post: string;
  name: string;
  place: string;
  age: number;
  title: string;
  body: string;
  rating: number;
  created_at: string;
  created_at_list: string;
  updated_at_list: string;
  status: {
    id: number;
    status: string;
  };
};

export type CustomerTestimonialDetailsResponseType = {
  success: boolean;
  message: string;
  data: CustomerTestimonialDetailType;
};

export type CustomerTestimonialDetailType = {
  id: string;
  post: string;
  name: string;
  place: string;
  age: number;
  title: string;
  body: string;
  rating: number;
  date_submitted: Date;
  status: Status;
  date_submitted_formatted: string;
  date_submitted_diffForHumans: string;
  created_at: string;
  updated_at: string;
  media: Media[];
};

export type Media = {
  id: number;
  url: string;
};

export type Status = {
  id: number;
  status: string;
};
