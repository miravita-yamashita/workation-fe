import { genericRequest } from "@/lib/generic-action";
import {
  SingleTestimonialResponseType,
  TopTestimonialsResponseType,
} from "./types";

type TestimonialProps = {
  searchParams?: string;
};

export const getTopTestimonials = async ({
  searchParams = "",
}: TestimonialProps) => {
  const path = `/top/testimonial?${searchParams}`;
  const response = await genericRequest({
    path: path,
    method: "GET",
  });

  const data: TopTestimonialsResponseType = await response.json();
  return data;
};

export const getTestimonialDetails = async (id: string) => {
  const path = `/top/testimonial/${id}`;
  const response = await genericRequest({
    path: path,
    method: "GET",
  });

  const data: SingleTestimonialResponseType = await response.json();
  return data;
};
