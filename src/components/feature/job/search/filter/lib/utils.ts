import { z } from "zod";
import {
  GenericCheckboxShapeSchema,
  PrefectureByRegionShapeSchema,
  searchFilterFormSchema,
} from "./form-schema";
import {
  JobFiltersResponseType,
  JobFilterType,
  JobSearchParamKey,
  PrefectureDataType,
} from "./types";

export const buildJobSearchQueryString = (
  data: z.infer<typeof searchFilterFormSchema>,
) => {
  const {
    searchTerm,
    newInformation,
    specificSearchCriteria,
    monthlySalaryMin,
    monthlySalaryMax,
    prefectures,
    occupation,
    contract,
    assignment,
    workForm,
    medicalSpecialty,
    facilityForm,
  } = data;

  // Map each key to its corresponding value
  const mappedData = {
    [JobSearchParamKey.Name]: searchTerm,
    [JobSearchParamKey.NewInformation]:
      getIdsOfCheckedFiltersIntoString(newInformation).length > 0 ? "true" : "", // This one is static data amd we muse pass to BE true or nothing
    [JobSearchParamKey.SpecificSearchCriteria]:
      getIdsOfCheckedFiltersIntoString(specificSearchCriteria),
    [JobSearchParamKey.MonthlySalary]:
      monthlySalaryMin.trim() === "" && monthlySalaryMax.trim() === ""
        ? ""
        : `${monthlySalaryMin},${monthlySalaryMax}`,
    [JobSearchParamKey.Prefecture]:
      getIdsOfCheckedPrefecturesIntoString(prefectures),
    [JobSearchParamKey.Occupation]:
      getIdsOfCheckedFiltersIntoString(occupation),
    [JobSearchParamKey.Contract]: getIdsOfCheckedFiltersIntoString(contract),
    [JobSearchParamKey.Assignment]:
      getIdsOfCheckedFiltersIntoString(assignment),
    [JobSearchParamKey.WorkForm]: getIdsOfCheckedFiltersIntoString(workForm),
    [JobSearchParamKey.MedicalSpecialty]:
      getIdsOfCheckedFiltersIntoString(medicalSpecialty),
    [JobSearchParamKey.FacilityForm]:
      getIdsOfCheckedFiltersIntoString(facilityForm),
  };

  // Remove filter keys with empty values and convert to values to string
  const filteredMappedData = Object.entries(mappedData)
    .filter(([, value]) => value !== "")
    .map(([key, value]) => [key, String(value)]);

  const queryString = new URLSearchParams(filteredMappedData).toString();

  return queryString;
};

export const getIdsOfCheckedFiltersIntoString = (
  data: z.infer<typeof GenericCheckboxShapeSchema>[],
): string => {
  return data
    .filter((item) => item.value)
    .map((item) => item.id)
    .join(",");
};

export const getIdsOfCheckedPrefecturesIntoString = (
  data: z.infer<typeof PrefectureByRegionShapeSchema>[],
): string => {
  return data
    .flatMap((item) =>
      item.values
        .filter((prefecture) => prefecture.value)
        .map((prefecture) => prefecture.id),
    )
    .join(",");
};

export const updateCheckboxValues = (
  data: JobFilterType[],
  ids: string,
): z.infer<typeof GenericCheckboxShapeSchema>[] => {
  const parsedIds = ids.split(",");
  return data.map((item) =>
    parsedIds.includes(item.id)
      ? { ...item, value: true }
      : { ...item, value: false },
  );
};

export const updateCheckboxPrefectureByRegionValues = (
  data: z.infer<typeof PrefectureByRegionShapeSchema>[],
  ids: string,
): z.infer<typeof PrefectureByRegionShapeSchema>[] => {
  const parsedIds = ids.split(",");
  return data.map((region) => ({
    ...region,
    values: region.values.map((prefecture) =>
      parsedIds.includes(String(prefecture.id))
        ? { ...prefecture, value: true }
        : { ...prefecture, value: false },
    ),
  }));
};

export const getPrefectureByRegion = (
  data: PrefectureDataType[],
): z.infer<typeof PrefectureByRegionShapeSchema>[] => {
  const prefectureByRegion: z.infer<typeof PrefectureByRegionShapeSchema>[] =
    [];

  if (!Array.isArray(data)) return [];

  data.forEach((item) => {
    const region = prefectureByRegion.find(
      (region) => region.region === item.region,
    );
    if (region) {
      region.values.push({ ...item, value: false });
    } else {
      prefectureByRegion.push({
        region: item.region,
        values: [{ ...item, value: false }],
      });
    }
  });

  return prefectureByRegion;
};

export const addDefaultValueFalse = (
  data: JobFilterType[],
): z.infer<typeof GenericCheckboxShapeSchema>[] => {
  return data.map((item) => ({ ...item, value: false }));
};

export const getFlattenedFilterCategories = (
  data: JobFiltersResponseType["data"],
): JobFilterType[] => {
  let flattenedData: JobFilterType[] = [];

  Object.values(data).forEach((category) => {
    flattenedData = [...flattenedData, ...category];
  });

  return flattenedData;
};

export const getFlattedDataById = (
  data: JobFilterType[],
  id: string,
): JobFilterType | undefined => {
  return data.find((item) => item.id === id);
};

export const resetPrefectureByRegion = (
  data: z.infer<typeof PrefectureByRegionShapeSchema>[],
): z.infer<typeof PrefectureByRegionShapeSchema>[] => {
  return data.map((data) => {
    return {
      ...data,
      values: data.values.map((info) => {
        return {
          ...info,
          value: false,
        };
      }),
    };
  });
};
