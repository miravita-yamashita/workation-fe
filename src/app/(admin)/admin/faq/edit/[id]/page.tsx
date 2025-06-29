"use client";

import { getAdminFaqDetails } from "@/components/admin/faq";
import { FormFaq } from "@/components/admin/faq/form-faq";
import { HeaderActions } from "@/components/admin/faq/header-actions";
import { FAQDetailsPageType } from "@/components/admin/faq/lib/types";
import {
  BREADCRUMB_ADMIN,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import { Loading } from "@/components/feature/common";
import { Header, HeaderTitle, Section } from "@/components/feature/dashboard";
import { ModalMessage } from "@/components/feature/modal/modal-message";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

export default function EditFaqPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [faqDetails, setFaqDetails] = useState<FAQDetailsPageType | null>(null);

  const formRef = useRef<HTMLFormElement | null>(null);

  const breadcrumbData = [
    BREADCRUMB_ADMIN.faq.base,
    BREADCRUMB_ADMIN.faq.list,
    {
      ...BREADCRUMB_ADMIN.faq.preEdit,
      link: BREADCRUMB_ADMIN.faq.preEdit.link.replace(":id", id as string),
    },
    BREADCRUMB_ADMIN.faq.edit,
  ];

  useEffect(() => {
    if (!id || Array.isArray(id)) return;
    async function fetchData() {
      setLoading(true);

      try {
        const faqDetailsResponse = await getAdminFaqDetails(id as string);
        const { data: faqDetails } = faqDetailsResponse ?? {};

        if (!faqDetails) {
          router.replace("/not-found");
          return;
        }

        setFaqDetails(faqDetails);
      } catch (error) {
        console.error("Error fetching FAQ details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id, router]);

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };
  if (loading || !faqDetails) return <>{}</>;
  return (
    <Suspense fallback={<Loading />}>
      <Header className="flex items-center justify-between gap-3">
        <HeaderTitle>よくある質問編集</HeaderTitle>
        <HeaderActions onSubmit={handleSubmit} toDeleteId={id} />
      </Header>

      <Section>
        <BreadcrumbComposite
          isAdmin={true}
          data={breadcrumbData}
          className="lg:pb-0"
        />
      </Section>

      <Section>
        <FormFaq ref={formRef} detail={faqDetails} />
      </Section>

      <ModalMessage />
    </Suspense>
  );
}
