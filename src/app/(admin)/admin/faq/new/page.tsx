"use client";

import { HeaderActions } from "@/components/admin/faq/header-actions";
import {
  BREADCRUMB_ADMIN,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import { Loading } from "@/components/feature/common";
import { Header, HeaderTitle, Section } from "@/components/feature/dashboard";
import { Suspense, useRef } from "react";
import { FormFaq } from "@/components/admin/faq/form-faq";
import { ModalMessage } from "@/components/feature/modal/modal-message";

const breadcrumbData = [
  BREADCRUMB_ADMIN.faq.base,
  BREADCRUMB_ADMIN.faq.list,
  BREADCRUMB_ADMIN.faq.preEdit,
  BREADCRUMB_ADMIN.faq.edit,
];

export default function EditFaqPage() {
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
        <FormFaq ref={formRef} />
      </Section>

      <ModalMessage />
    </Suspense>
  );
}
