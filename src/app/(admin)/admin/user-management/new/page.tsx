"use client";

import { HeaderActions } from "@/components/admin/user-management";
import { FormUser } from "@/components/admin/user-management/form-user";
import {
  BREADCRUMB_ADMIN,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import { Loading } from "@/components/feature/common";
import { Header, HeaderTitle, Section } from "@/components/feature/dashboard";
import { ModalMessage } from "@/components/feature/modal/modal-message";
import { Suspense, useRef } from "react";

const breadcrumbData = [
  BREADCRUMB_ADMIN.userManagement.base,
  BREADCRUMB_ADMIN.userManagement.list,
  BREADCRUMB_ADMIN.userManagement.new,
];
export default function NewUserPage() {
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
        <FormUser ref={formRef} />
      </Section>

      <ModalMessage />
    </Suspense>
  );
}
