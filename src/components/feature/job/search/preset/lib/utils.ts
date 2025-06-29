import {
  JobFilterType,
  JobSearchParamKey,
  PrefectureDataType,
  PrefectureResponseType,
} from "@components/feature/job/search/filter";
import { JobSearchFilterPayloadShapeType } from "./types";

export const getIdCorrespondingLabel = (data: JobFilterType[], ids: string) => {
  return data.filter((item) => ids.includes(item.id)).map((item) => item.name);
};

export const getPrefectureIdCorrespondingLabel = (
  data: PrefectureResponseType["data"],
  ids: string,
) => {
  if (!Array.isArray(data) || data.length === 0) return [];

  return data
    .filter((item) => ids.split(",").includes(String(item.id)))
    .map((item) => item.prefecture);
};

export const convertQueryStringIntoObject = (queryString: string) => {
  return Object.fromEntries(new URLSearchParams(queryString).entries());
};

export const prepareFilterFormValesToPayload = (
  queryString: string,
  flattenedFilterCategories: JobFilterType[],
  jobSearchPrefectures: PrefectureDataType[],
): JobSearchFilterPayloadShapeType => {
  const transformedData = convertQueryStringIntoObject(queryString);

  // There are the keys that are text inputs or static, and we should not update their values
  const excludedKeys = [
    JobSearchParamKey.Name,
    JobSearchParamKey.NewInformation,
    JobSearchParamKey.MonthlySalary,
  ];

  const payloadShape: JobSearchFilterPayloadShapeType = {};

  Object.keys(transformedData).forEach((key) => {
    // Prefecture is a special case or it has different data source
    if (key === JobSearchParamKey.Prefecture) {
      const ids = transformedData[key].split(",");
      payloadShape[key as JobSearchParamKey] =
        getPrefectureForSaveFilterPayload(ids, jobSearchPrefectures);
      return;
    }

    // Handle filter categories and for others directly assign the value instead
    if (!excludedKeys.includes(key as JobSearchParamKey)) {
      const ids = transformedData[key].split(",");
      payloadShape[key as JobSearchParamKey] =
        getFilterCategoriesForSaveFilterPayload(ids, flattenedFilterCategories);
    } else {
      payloadShape[key as JobSearchParamKey] = transformedData[key];
    }
  });

  return payloadShape;
};

export const getPrefectureForSaveFilterPayload = (
  ids: string[],
  jobSearchPrefectures: PrefectureDataType[],
): JobFilterType[] => {
  const newValues: JobFilterType[] = [];

  ids.forEach((id) => {
    const data = jobSearchPrefectures.filter((item) => String(item.id) === id);
    data.forEach((item) => {
      newValues.push({
        id: String(item.id),
        name: item.prefecture,
      });
    });
  });
  return newValues;
};

export const getFilterCategoriesForSaveFilterPayload = (
  ids: string[],
  flattenedFilterCategories: JobFilterType[],
): JobFilterType[] => {
  const newValues: JobFilterType[] = [];
  ids.forEach((id) => {
    const data = flattenedFilterCategories.filter((item) => item.id === id);
    newValues.push(...data);
  });
  return newValues;
};

export const convertSavedFilterPresetToQueryString = (
  data: JobSearchFilterPayloadShapeType,
): string => {
  const info: Record<string, string> = {};

  Object.keys(data).forEach((key) => {
    const currentData = data[key as JobSearchParamKey];
    if (Array.isArray(currentData)) {
      info[key as JobSearchParamKey] = currentData
        .flatMap((item) => item.id)
        .join(",");
    } else {
      info[key as JobSearchParamKey] = currentData as string;
    }
  });

  return new URLSearchParams(info).toString();
};
