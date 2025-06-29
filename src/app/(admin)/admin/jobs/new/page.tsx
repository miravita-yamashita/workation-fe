"use client";

import { HeaderActions } from "@/components/admin/jobs/job";
import {
  BREADCRUMB_ADMIN,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import { Loading } from "@/components/feature/common";
import { Header, HeaderTitle, Section } from "@/components/feature/dashboard";
import { Suspense, useRef } from "react";

import { FormJob } from "@/components/admin/jobs/job";
const breadcrumbData = [
  BREADCRUMB_ADMIN.jobs.base,
  BREADCRUMB_ADMIN.jobs.list,
  BREADCRUMB_ADMIN.jobs.new,
];

export default function NewJobPage() {
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      <Header className="flex items-center justify-between gap-3">
        <HeaderTitle>新規作成</HeaderTitle>
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
        <FormJob ref={formRef} />
      </Section>
    </Suspense>
  );
}
