export enum TopSearchQueryKeys {
  Categories = "filter[occupation]",
  Commitment = "filter[specific]",
  Name = "filter[name]",
}

type QueryParams = {
  [TopSearchQueryKeys.Categories]?: string | null;
  [TopSearchQueryKeys.Commitment]?: string | null;
  [TopSearchQueryKeys.Name]?: string | null;
};

type GetPropertyQueryStringProps = {
  queryParams?: QueryParams;
};

export const getTopSearchQueryString = ({
  queryParams,
}: GetPropertyQueryStringProps) => {
  const params: Record<string, string> = {};

  const keysToProcess: (keyof QueryParams)[] = [
    TopSearchQueryKeys.Categories,
    TopSearchQueryKeys.Name,
    TopSearchQueryKeys.Commitment,
  ];

  keysToProcess.forEach((key) => {
    if (queryParams && queryParams[key]) {
      params[key] = queryParams[key] as string;
    }
  });

  return params;
};
