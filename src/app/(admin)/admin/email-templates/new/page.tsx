"use client";

import { HeaderActions } from "@/components/admin/email-templates/header-actions";
import {
  BREADCRUMB_ADMIN,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import { Loading } from "@/components/feature/common";
import { Header, HeaderTitle, Section } from "@/components/feature/dashboard";
import { Suspense, useRef } from "react";
import { FormEmail } from "@/components/admin/email-templates";
import { ModalMessage } from "@/components/feature/modal/modal-message";

const breadcrumbData = [
  BREADCRUMB_ADMIN.emailTemplates.base,
  BREADCRUMB_ADMIN.emailTemplates.list,
  BREADCRUMB_ADMIN.emailTemplates.new,
];

export default function NewEmailPage() {
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
        <FormEmail ref={formRef} />
      </Section>

      <ModalMessage />
    </Suspense>
  );
}
