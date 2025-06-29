"use client";

import { FormCustomerTestimonial } from "@/components/admin/customer-testimonials/form-customer-testimonial";
import { HeaderActions } from "@/components/admin/faq/header-actions";
import {
  BREADCRUMB_ADMIN,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import { Loading } from "@/components/feature/common";
import { Header, HeaderTitle, Section } from "@/components/feature/dashboard";
import { ModalMessage } from "@/components/feature/modal/modal-message";
import { Suspense, useRef } from "react";

const breadcrumbData = [
  BREADCRUMB_ADMIN.customerTestimonials.base,
  BREADCRUMB_ADMIN.customerTestimonials.list,
  BREADCRUMB_ADMIN.customerTestimonials.new,
];
export default function NewCustomerTestimonialsPage() {
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      <Header className="flex items-center justify-between gap-3">
        <HeaderTitle>お客様の声編集</HeaderTitle>
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
        <FormCustomerTestimonial ref={formRef} />
      </Section>

      <ModalMessage />
    </Suspense>
  );
}
