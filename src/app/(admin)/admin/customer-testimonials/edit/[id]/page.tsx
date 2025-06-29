"use client";

import {
  CustomerTestimonialDetailType,
  getAdminCustomerDetails,
  HeaderActions,
} from "@/components/admin/customer-testimonials";
import { FormCustomerTestimonial } from "@/components/admin/customer-testimonials/form-customer-testimonial";
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
  BREADCRUMB_ADMIN.customerTestimonials.base,
  BREADCRUMB_ADMIN.customerTestimonials.list,
];
export default function EditCustomerTestimonialsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [testimonialDetails, setTestimonialDetail] =
    useState<CustomerTestimonialDetailType | null>(null);

  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (!id || Array.isArray(id)) return;
    async function fetchData() {
      setLoading(true);

      try {
        const testimonialDetailsResponse = await getAdminCustomerDetails(
          id as string,
        );
        const { data: testimonialDetails } = testimonialDetailsResponse ?? {};
        if (!testimonialDetails) {
          router.replace("/not-found");
          return;
        }
        setTestimonialDetail(testimonialDetails);
      } catch (error) {
        console.error("Error fetching testimonial details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id, router]);

  const updatedBreadcrumbData = [...breadcrumbData];

  if (id) {
    updatedBreadcrumbData.push(
      {
        label: "お客様の声詳細",
        link: `/admin/customer-testimonials/${id}`,
      },
      BREADCRUMB_ADMIN.customerTestimonials.edit,
    );
  }

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };
  if (loading || !testimonialDetails) return <>{}</>;
  return (
    <Suspense fallback={<Loading />}>
      <Header className="flex items-center justify-between gap-3">
        <HeaderTitle>お客様の声編集</HeaderTitle>
        <HeaderActions onSubmit={handleSubmit} toDeleteId={id} />
      </Header>

      <Section>
        <BreadcrumbComposite
          isAdmin={true}
          data={updatedBreadcrumbData}
          className="lg:pb-0"
        />
      </Section>

      <Section>
        <FormCustomerTestimonial ref={formRef} detail={testimonialDetails} />
      </Section>

      <ModalMessage />
    </Suspense>
  );
}
