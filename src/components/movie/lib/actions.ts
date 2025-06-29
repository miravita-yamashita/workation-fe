"use server";

import { genericRequest } from "@/lib/generic-action";
import {
  MovieCategoryNameListResponseType,
  MovieDetailResponseType,
  MovieExplanatoryMovieResponseType,
  MovieListResponseType,
  UnpaginatedMovieResponseType,
} from "./types";

type MovieListProps = {
  searchParams: string;
};

export const getUnpaginatedMovieList = async () => {
  const path = `/top/movie`;
  const response = await genericRequest({
    path: path,
    method: "GET",
  });

  const data: UnpaginatedMovieResponseType = await response.json();
  return data;
};

export const getMovieList = async ({ searchParams }: MovieListProps) => {
  const path = `/top/movie?${searchParams}`;
  const response = await genericRequest({
    path: path,
    method: "GET",
  });

  const data: MovieListResponseType = await response.json();
  return data;
};

export const getMovieCategoryNameList = async () => {
  const path = `/movie/category`;
  const response = await genericRequest({
    path: path,
    method: "GET",
  });

  const data: MovieCategoryNameListResponseType = await response.json();
  return data;
};

export const getMovieDetail = async (id: string) => {
  const path = `/movie/${id}`;
  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: MovieDetailResponseType = await response.json();
  return data;
};

export const getExplanatoryMovie = async () => {
  const path = `/top/movie/category`;
  const response = await genericRequest({
    path: path,
    method: "GET",
  });

  const data: MovieExplanatoryMovieResponseType = await response.json();
  return data;
};
