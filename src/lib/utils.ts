import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ReadonlyURLSearchParams } from "next/navigation";
import {
  For,
  JobCatType,
  JobSelectOptionsType,
} from "@/components/admin/jobs/job/lib";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatResponseError = (
  responseErrors: string | Record<string, string>,
): string => {
  if (typeof responseErrors === "string") {
    return responseErrors;
  }
  return Object.entries(responseErrors)
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");
};

/**
 * A helper function that eliminates the need for try-catch blocks on every API call.
 * It consolidates and processes the API response, returning it in a structured format.
 */
type APIResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

export const genericAPICallHandler = async <T>(
  apiCall: () => Promise<APIResponse<T>>,
): Promise<APIResponse<T>> => {
  try {
    const response = await apiCall();

    if (!response.success) {
      return {
        success: false,
        message:
          response.message ||
          "API call went through but Backend returned a warning.",
      };
    }
    // If the API call was successful, return the data
    return {
      success: true,
      message: response.message,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: String(error) || "Error Encountered.",
    };
  }
};

/**
 * Generates a unique ID based on the timestamp and random number.
 *
 * @param {string} id - The ID to be appended to the unique ID.
 * @returns {string} - The unique ID.
 */
export const getUniqueId = (id?: string): string => {
  // Generate the unique ID based on the timestamp and random number
  const uniqueId = String(
    Date.now().toString(32) + Math.random().toString(16),
  ).replace(/\./g, "");

  return id ? uniqueId + id : uniqueId;
};

export const extractYoutubeId = (url: string): string => {
  const youtubeId = url.split("v=")[1];
  return youtubeId;
};

export const formatYoutubeUrl = (youtubeId: string): string => {
  return `https://www.youtube.com/watch?v=${extractYoutubeId(youtubeId)}`;
};

export const checkIfFormHasNoValues = (formValues: Record<string, unknown>) => {
  for (const key in formValues) {
    if (formValues.hasOwnProperty(key)) {
      const value = formValues[key];

      // If it's an array (like checkboxes), check if it has any selected items
      if (Array.isArray(value)) {
        if (value.length > 0) {
          return false;
        }
      }
      // If it's a string (like text input), check if it's not empty
      else if (typeof value === "string" && value.trim() !== "") {
        return false;
      }
    }
  }

  return true;
};

export function getFinalParamValue(
  searchParamValue: string | null,
  queryParamFieldValue: string | null | undefined,
) {
  if (queryParamFieldValue === null) {
    //null is set from the form which empty an empty field
    return null;
  }

  if (
    queryParamFieldValue !== undefined &&
    queryParamFieldValue.trim().length !== 0
  ) {
    return queryParamFieldValue;
  }
  //if queryParamFieldValue is undefined use current query string
  return searchParamValue;
}

/**
 * Sets the query parameter value.
 *
 * @param value - The value to set for the query parameter.
 * @returns The value if it is not empty; otherwise, returns null.
 */ export const setQueryParamValue = (value: string) => {
  if (!value) return null;

  return value;
};

/**
 * Retrieves the value of a specified query parameter from the given URL search parameters.
 *
 * @param searchParams - The URL search parameters to search within.
 * @param targetQueryKey - The key of the query parameter to retrieve the value for.
 * @returns The value of the specified query parameter, or an empty string if the parameter is not found.
 */
export const getTargetQueryKeyValue = (
  searchParams: ReadonlyURLSearchParams,
  targetQueryKey: string,
) => {
  return searchParams.get(targetQueryKey) || "";
};

/**
 * Converts a date string in the format 'DD/MM/YYYY' to the Japanese format 'YYYY年M月D日'.
 *
 * @param dateString - The date string in the format 'DD/MM/YYYY' to be converted.
 * @returns The formatted date string in the Japanese format 'YYYY年M月D日'.
 * @example
 * // Example usage:
 * const formattedDate = convertDateToJapaneseFormat("01/11/2025");
 * // Output: "2025年11月1日"
 */
export const convertDateToJapaneseFormat = (dateString: string) => {
  const [day, month, year] = dateString?.split("/").map(Number);
  const date = new Date(year, month - 1, day);

  const japaneseYear = date.getFullYear();
  const japaneseMonth = date.getMonth() + 1; // Months are 0-indexed
  const japaneseDay = date.getDate();

  return `${japaneseYear}年${japaneseMonth}月${japaneseDay}日`;
};

let unixLastTimestamp = 0;
let unixCounter = 0;
export const generateUnixTimestamp = () => {
  const now = Date.now();
  const timestampInSeconds = Math.floor(now / 1000); // Unix timestamp in seconds

  if (timestampInSeconds === unixLastTimestamp) {
    unixCounter++;
  } else {
    unixCounter = 0;
    unixLastTimestamp = timestampInSeconds;
  }
  return `${timestampInSeconds}${String(unixCounter).padStart(3, "0")}`;
};

/**
 * Formats a given rating as a string of full, half, and empty stars.
 *
 * @param {number} rating - The rating to be formatted, from 0 to 5.
 * @returns {string} A string of full, half, and empty stars representing the rating.
 * @example
 * // Example usage:
 * const formattedRating = formatStarRating(3.5);
 * // Output: "★★★☆☆"
 */
export const formatStarRating = (rating: number) => {
  rating = Math.max(0, Math.min(rating, 5));

  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - Math.ceil(rating);

  return "★".repeat(fullStars) + (halfStar ? "☆" : "") + "☆".repeat(emptyStars);
};

/**
 * Maps an array of category objects with `id` and `name` to a new array with `id`, `value`, and `label`.
 *
 * @param categories - An array of objects where each object contains `id` (string or number) and `name` (string).
 * @returns An array of objects where each object contains `id`, `value`, and `label` properties.
 *          Returns an empty array if the validation fails.
 */
export function mapToCategoryFormat(
  categories: Array<JobCatType | For>,
): JobSelectOptionsType[] {
  if (!Array.isArray(categories) || categories.length === 0) {
    return [];
  }

  return categories.map((cat) => ({
    id: cat.id,
    value: cat.id,
    label: "name" in cat ? cat.name : "question" in cat ? cat.question : "",
  }));
}

/**
 * Converts an ISO 8601 date-time string to the format "YYYY.MM.DD | H:mm".
 *
 * @param {string} input - The ISO 8601 date-time string (e.g., "2025-02-05T09:55:05.000000Z").
 * @returns {string} - The formatted date-time string (e.g., "2025.02.05 | 9:55").
 */
/**
 * Converts an ISO 8601 date-time string to the format "YYYY.MM.DD | H:mm".
 *
 * @param {string} input - The ISO 8601 date-time string (e.g., "2025-02-05T09:55:05.000000Z").
 * @returns {string} - The formatted date-time string (e.g., "2025.02.05 | 9:55").
 */
export function formatDateTime(input: string): string {
  // Parse the ISO date string as a UTC date
  const date = new Date(input);

  // Extract UTC year, month, day, hour, and minutes
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getUTCDate()).padStart(2, "0");

  const hours = date.getUTCHours(); // Get the hour in UTC
  const minutes = String(date.getUTCMinutes()).padStart(2, "0"); // Ensure two-digit minutes

  return `${year}.${month}.${day} | ${hours}:${minutes}`;
}
