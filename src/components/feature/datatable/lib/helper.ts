import { getFinalParamValue } from "@/lib/utils";
import { ReadonlyURLSearchParams } from "next/navigation";

export enum AdminTableFiltersQueryKeys {
  FacilityName = "filter[facility]",
  RecommendationName = "filter[recommendation]",
  AreaName = "filter[area]",
  Search = "filter[q]",

  Page = "page",
  PerPage = "perPage",
}

type QueryParams = {
  [AdminTableFiltersQueryKeys.FacilityName]?: string | null;
  [AdminTableFiltersQueryKeys.RecommendationName]?: string | null;
  [AdminTableFiltersQueryKeys.AreaName]?: string | null;
  [AdminTableFiltersQueryKeys.Search]?: string | null;

  [AdminTableFiltersQueryKeys.Page]?: string | null;
  [AdminTableFiltersQueryKeys.PerPage]?: string | null;
};

type GetPropertyQueryStringProps = {
  searchParams: ReadonlyURLSearchParams;
  queryParams?: QueryParams;
};

export const getAdminTableFiltersQueryString = ({
  searchParams,
  queryParams,
}: GetPropertyQueryStringProps) => {
  const params: Record<string, string> = {};

  const keysToProcess: (keyof QueryParams)[] = [
    AdminTableFiltersQueryKeys.FacilityName,
    AdminTableFiltersQueryKeys.RecommendationName,
    AdminTableFiltersQueryKeys.AreaName,
    AdminTableFiltersQueryKeys.Search,

    AdminTableFiltersQueryKeys.Page,
    AdminTableFiltersQueryKeys.PerPage,
  ];

  keysToProcess.forEach((key) => {
    const value = getFinalParamValue(searchParams.get(key), queryParams?.[key]);
    if (value) {
      params[key] = value;
    }
  });

  return new URLSearchParams(params).toString();
};
