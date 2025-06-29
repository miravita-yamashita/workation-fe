import {
  getAdminEmailDetails,
  SectionHeading,
} from "@/components/admin/email-templates";

import { TableDetail } from "@/components/admin/email-templates";
import { HeaderActions } from "@/components/admin/email-templates/header-actions";
import { EmailTemplateDetailsType } from "@/components/admin/email-templates/lib/types";
import { JobTypecolumn } from "@/components/admin/jobs/job/lib";
import {
  BREADCRUMB_ADMIN,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import { Loading } from "@/components/feature/common";
import { Header, HeaderTitle, Section } from "@/components/feature/dashboard";
import { ModalMessage } from "@/components/feature/modal/modal-message";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const breadcrumbData = [
  BREADCRUMB_ADMIN.emailTemplates.base,
  BREADCRUMB_ADMIN.emailTemplates.list,
];

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EmailDetailPage({ params }: PageProps) {
  const { id } = (await params) || {};

  const [emailDetailsResponse]: [{ data: EmailTemplateDetailsType } | null] =
    await Promise.all([getAdminEmailDetails(id)]);

  const emailDetails: EmailTemplateDetailsType | null =
    emailDetailsResponse?.data ?? null;

  if (!emailDetails) notFound();

  const updatedBreadcrumbData = [...breadcrumbData];

  if (emailDetails && emailDetails?.name && id) {
    updatedBreadcrumbData.push({
      label: emailDetails?.name,
      link: `/admin/email-templates/${id}`,
    });
  }

  const emailData: JobTypecolumn[] = [
    {
      id: "1",
      label: "テンプレート名",
      value: emailDetails?.name ?? "",
    },
    {
      id: "2",
      label: "本文",
      value: emailDetails?.content ?? "",
    },
  ];

  return (
    <Suspense fallback={<Loading />}>
      <Header className="flex items-center justify-between gap-3">
        <HeaderTitle>返信用メールテンプレート詳細</HeaderTitle>
        <HeaderActions toDeleteId={id} toEdit={id} />
      </Header>

      <Section>
        <BreadcrumbComposite
          isAdmin={true}
          data={updatedBreadcrumbData}
          className="lg:pb-0"
        />
      </Section>

      <Section>
        <div className="relative w-full rounded border p-5">
          <SectionHeading title="送信用メールテンプレート詳細" />
          <TableDetail column={emailData} />
        </div>
      </Section>
      <ModalMessage />
    </Suspense>
  );
}
