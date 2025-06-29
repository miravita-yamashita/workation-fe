import { PaginationLink } from "@/lib/types";

export type TopTestimonialsResponseType = {
  success: boolean;
  message: string;
  data: TopTestimonialsResponse;
};

export type TopTestimonialsResponse = {
  data: TopTestimonialsDataType[];
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

export type TopTestimonialsDataType = {
  age: number;
  body: string;
  date_submitted_formatted: string;
  created_at_list: string;
  id: string;
  name: string;
  place: string;
  post: string;
  rating: number;
  testimonial_images: string | string[];
  title: string;
  media: {
    id: string;
    url: string;
  }[];
};

export type SingleTestimonialResponseType = {
  success: boolean;
  message: string;
  data: TopTestimonialsDataType;
};
