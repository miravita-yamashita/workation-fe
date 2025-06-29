"use client";

import { HeaderActions, MedicalSpecialty } from "@/components/admin/facilities";
import {
  BREADCRUMB_ADMIN,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import { Loading } from "@/components/feature/common";
import { Header, HeaderTitle, Section } from "@/components/feature/dashboard";
import { Suspense, useEffect, useRef, useState } from "react";

import {
  FormFacility,
  getMedicalCategories,
} from "@/components/admin/facilities";

const breadcrumbData = [
  BREADCRUMB_ADMIN.facilities.base,
  BREADCRUMB_ADMIN.facilities.list,
  BREADCRUMB_ADMIN.facilities.new,
];

export default function NewFacilityPage() {
  const [mapMedCategories, setMapMedCategories] = useState<MedicalSpecialty[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    async function fetchMedicalCategories() {
      try {
        const medicalCategoriesResponse = await getMedicalCategories();
        const { data: categories } = medicalCategoriesResponse ?? {};

        setMapMedCategories(categories?.medical_specialty);
      } catch (error) {
        console.error("Error fetching medical categories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMedicalCategories();
  }, []);

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit(); // Triggers the form submission
    }
  };
  if (loading) return <>{}</>;
  return (
    <Suspense fallback={<Loading />}>
      <Header className="flex items-center justify-between gap-3">
        <HeaderTitle>施設詳細編集</HeaderTitle>
        <HeaderActions onSubmit={handleSubmit} />
      </Header>

      <Section>
        <BreadcrumbComposite
          isAdmin={true}
          data={breadcrumbData}
          className="lg:pb-0"
        />
      </Section>

      <Section>
        <div className="relative min-h-[95vh] w-full">
          <FormFacility ref={formRef} medCat={mapMedCategories} />
        </div>
      </Section>
    </Suspense>
  );
}
