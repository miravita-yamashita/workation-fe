"use server";

import { DeleteGenericItemApiResponseType } from "@/components/feature/datatable";
import { genericRequest } from "@/lib/generic-action";
import {
  AdminFacilityListResponseType,
  AdminFacilityNameListResponseType,
  CreateFaciliyResponseType,
  FacilityDetailsResponseType,
  MedicalCategoriesResponseType,
} from "./types";
import { FacilityFormSchema } from "./form-shema";
import { z } from "zod";

type SearchParams = {
  searchParams: string;
};

export const getAdminFacilityList = async ({ searchParams }: SearchParams) => {
  const path = `/facility?${searchParams}`;
  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: AdminFacilityListResponseType = await response.json();
  return data;
};

export const createAndUpdateFacility = async (
  values: z.infer<typeof FacilityFormSchema>,
  facilityId?: string,
) => {
  let path;
  if (facilityId) {
    path = `/facility/${facilityId}`;
  } else {
    path = `/facility`;
  }

  const formDataMapping = {
    name: values.name,
    email: values.email,
    phone_number: values.phoneNumber,
    prefecture: values.prefecture,
    address_city: values.addressCity,
    address_street: values.addressStreet,
    access: values.access,
    map: values.map,
    no_employees: values.noEmployees,
    record_method: values.recordMethod,
    no_beds: values.noBeds,
    nursing_standard: values.nursingStandard,
    parking_lot: values.parkingLot,
    medical_category: values.medicalSubjectCategories,
  };
  const formData = new FormData();

  Object.entries(formDataMapping).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (item !== undefined && item !== null) {
          formData.append(`${key}[${index}]`, item);
        }
      });
    } else if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  if (facilityId) {
    formData.append("_method", "PUT");
  }
  const response = await genericRequest({
    path: path,
    method: "POST",
    options: {
      body: formData,
    },
    isAdminPath: true,
    removeHeaderKey: "Content-Type",
  });

  const data: CreateFaciliyResponseType = await response.json();

  return data;
};

export const getMedicalCategories = async () => {
  const path = `/category/item?filter[name]=medical_specialty`;
  const response = await genericRequest({
    path: path,
    method: "GET",
  });

  const data: MedicalCategoriesResponseType = await response.json();
  return data;
};

export const getFacilityDetails = async (facilityId: string) => {
  const path = `/facility/${facilityId}`;
  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: FacilityDetailsResponseType = await response.json();
  return data;
};

export const getAdminFacilityNameList = async () => {
  const path = `/facility/list`;
  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
  });

  const data: AdminFacilityNameListResponseType = await response.json();
  return data;
};

export const deleteFacility = async (id: string | string[] | undefined) => {
  if (!id) return null;
  const path = `/facility/delete`;
  const payload = { facility_ids: [id] };

  const response = await genericRequest({
    path: path,
    method: "POST",
    options: {
      body: JSON.stringify(payload),
    },
    isAdminPath: true,
  });

  const data: DeleteGenericItemApiResponseType = await response.json();

  return data;
};
