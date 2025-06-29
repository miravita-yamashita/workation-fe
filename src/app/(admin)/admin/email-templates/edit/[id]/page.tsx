"use client";

import {
  BREADCRUMB_ADMIN,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import { Loading } from "@/components/feature/common";
import { Header, HeaderTitle, Section } from "@/components/feature/dashboard";
import { Suspense, useEffect, useRef, useState } from "react";

import {
  FormEmail,
  getAdminEmailDetails,
} from "@/components/admin/email-templates";
import { HeaderActions } from "@/components/admin/email-templates/header-actions";
import { EmailTemplateDetailsType } from "@/components/admin/email-templates/lib/types";
import { ModalMessage } from "@/components/feature/modal/modal-message";
import { useParams, useRouter } from "next/navigation";

const breadcrumbData = [
  BREADCRUMB_ADMIN.emailTemplates.base,
  BREADCRUMB_ADMIN.emailTemplates.list,
];

export default function EditEmailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [emailTempalteDetails, setemailTempalteDetails] =
    useState<EmailTemplateDetailsType | null>(null);

  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (!id) return;
    async function fetchData() {
      setLoading(true);

      try {
        const emailTemplateResponse = await getAdminEmailDetails(id as string);
        const { data: emailTempalteDetails } = emailTemplateResponse ?? {};

        if (!emailTempalteDetails) {
          router.replace("/not-found");
          return;
        }

        setemailTempalteDetails(emailTempalteDetails);
      } catch (error) {
        console.error("Error fetching Email Templates:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id, router]);

  const updatedBreadcrumbData = [...breadcrumbData];

  if (emailTempalteDetails && emailTempalteDetails?.name && id) {
    updatedBreadcrumbData.push(
      {
        label: emailTempalteDetails?.name,
        link: `/admin/email-templates/${id}`,
      },
      BREADCRUMB_ADMIN.emailTemplates.edit,
    );
  }

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };
  if (loading || !emailTempalteDetails) return <>{}</>;
  return (
    <Suspense fallback={<Loading />}>
      <Header className="flex items-center justify-between gap-3">
        <HeaderTitle>送信用メールテンプレート編集</HeaderTitle>
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
        <FormEmail ref={formRef} detail={emailTempalteDetails} />
      </Section>

      <ModalMessage />
    </Suspense>
  );
}
