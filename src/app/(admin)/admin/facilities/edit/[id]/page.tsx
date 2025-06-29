"use client";

import {
  FacilityDetailsType,
  FormFacility,
  getFacilityDetails,
  getMedicalCategories,
  HeaderActions,
  MedicalSpecialty,
} from "@/components/admin/facilities";
import {
  BREADCRUMB_ADMIN,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import { Loading } from "@/components/feature/common";
import { Header, HeaderTitle, Section } from "@/components/feature/dashboard";
import { ModalMessage } from "@/components/feature/modal/modal-message";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

const breadcrumbData = [
  BREADCRUMB_ADMIN.facilities.base,
  BREADCRUMB_ADMIN.facilities.list,
];

export default function UpdateFacilityPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [facilityDetail, setFacilityDetail] =
    useState<FacilityDetailsType | null>(null);
  const [mapMedCategories, setMapMedCategories] = useState<MedicalSpecialty[]>(
    [],
  );
  const formRef = useRef<HTMLFormElement | null>(null);
  const updatedBreadcrumbData = [...breadcrumbData];

  if (facilityDetail?.name && id) {
    updatedBreadcrumbData.push(
      {
        label: facilityDetail?.name,
        link: `/admin/facilities/${id}`,
      },
      BREADCRUMB_ADMIN.facilities.edit,
    );
  }

  useEffect(() => {
    if (!id || Array.isArray(id)) return;
    async function fetchData() {
      setLoading(true);

      try {
        const medicalCategoriesResponse = await getMedicalCategories();
        const { data: categories } = medicalCategoriesResponse ?? {};

        setMapMedCategories(categories?.medical_specialty);
      } catch (error) {
        console.error("Error fetching medical categories:", error);
      }

      // Fetch facility details
      try {
        const facilityDetailsResponse = await getFacilityDetails(id as string);
        const { data: facilityData } = facilityDetailsResponse ?? {};

        if (!facilityData) {
          router.replace("/not-found");
          return;
        }

        setFacilityDetail(facilityData);
      } catch (error) {
        console.error("Error fetching facility details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id, router]);

  const handleSubmit = () => {
    formRef.current?.requestSubmit();
  };

  if (loading || !facilityDetail) return <>{}</>;

  return (
    <>
      <Header className="flex items-center justify-between gap-3">
        <HeaderTitle>施設詳細編集</HeaderTitle>
        <HeaderActions onSubmit={handleSubmit} toDeleteId={id} />
      </Header>

      <Section>
        <BreadcrumbComposite
          isAdmin={true}
          data={updatedBreadcrumbData}
          className="lg:pb-0"
        />
      </Section>
      <Suspense fallback={<Loading />}>
        <Section>
          <FormFacility
            ref={formRef}
            medCat={mapMedCategories}
            detail={facilityDetail}
          />
        </Section>
        <ModalMessage />
      </Suspense>
    </>
  );
}
