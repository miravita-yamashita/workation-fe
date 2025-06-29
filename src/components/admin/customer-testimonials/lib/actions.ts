"use server";

import { DeleteGenericItemApiResponseType } from "@/components/feature/datatable";
import { genericRequest } from "@/lib/generic-action";
import { z } from "zod";
import { testimonialFormSchema } from "./form-schema";
import {
  AdminCustomerTestimonialListResponseType,
  CustomerTestimonialDetailsResponseType,
} from "./types";

type SearchParams = {
  searchParams: string;
};

export const getAdminCustomerTestimonialList = async ({
  searchParams,
}: SearchParams) => {
  const path = `/testimonial?${searchParams}`;
  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: AdminCustomerTestimonialListResponseType = await response.json();
  return data;
};

export const getAdminCustomerDetails = async (id: string) => {
  const path = `/testimonial/${id}`;
  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: CustomerTestimonialDetailsResponseType = await response.json();
  return data;
};

export const createUpdateTestimonials = async (
  values: z.infer<typeof testimonialFormSchema>,
  id?: string,
) => {
  // Define the possible methods
  type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

  let path: string;
  let requestMethod: RequestMethod;

  // Determine the API path and request method
  if (id) {
    path = `/testimonial/${id}`;
    requestMethod = "PUT"; // We are updating, so PUT method
  } else {
    path = `/testimonial`;
    requestMethod = "POST"; // We are creating a new testimonial, so POST method
  }

  // Safely extract the thumbnail IDs
  const ids =
    Array.isArray(values?.thumbnail) && values?.thumbnail.length > 0
      ? values.thumbnail.map((thumb) => parseInt(thumb.id))
      : []; // Ensure ids is an array of numbers or an empty array if no thumbnails

  // Map form data
  const formDataMapping = {
    name: values?.name,
    rating: Number(values?.rating), // Ensure rating is a number
    title: values?.title,
    body: values?.content,
    media_id: ids,
    status: Number(values.status),
  };

  // Make the API request
  const response = await genericRequest({
    path: path,
    method: requestMethod, // Type-safe request method
    options: {
      body: JSON.stringify(formDataMapping),
    },
    isAdminPath: true,
  });

  const data: CustomerTestimonialDetailsResponseType = await response.json();

  return data;
};

export const deleteTestimonial = async (id: string | string[] | undefined) => {
  if (!id) return null;
  const path = `/testimonial/${id}`;

  const response = await genericRequest({
    path: path,
    method: "DELETE",
    isAdminPath: true,
  });

  const data: DeleteGenericItemApiResponseType = await response.json();

  return data;
};
