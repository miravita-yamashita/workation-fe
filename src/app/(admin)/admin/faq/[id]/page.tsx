import { getAdminFaqDetails } from "@/components/admin/faq";
import { HeaderActions } from "@/components/admin/faq/header-actions";
import { TableDetail } from "@/components/admin/faq/lib/table-detail";
import { FAQDetailsPageType } from "@/components/admin/faq/lib/types";
import { JobTypecolumn } from "@/components/admin/jobs/job/lib";
import {
  BREADCRUMB_ADMIN,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import { Loading } from "@/components/feature/common";
import { SectionHeading } from "@/components/feature/common/section-heading";
import { Header, HeaderTitle, Section } from "@/components/feature/dashboard";
import { ModalMessage } from "@/components/feature/modal/modal-message";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const breadcrumbData = [
  BREADCRUMB_ADMIN.faq.base,
  BREADCRUMB_ADMIN.faq.list,
  BREADCRUMB_ADMIN.faq.detail,
];

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function FAQDetailPage({ params }: PageProps) {
  const { id } = (await params) || {};

  const [FaqDetailsResponse]: [{ data: FAQDetailsPageType } | null] =
    await Promise.all([getAdminFaqDetails(id)]);

  const faqDetails: FAQDetailsPageType | null =
    FaqDetailsResponse?.data ?? null;

  if (!faqDetails) notFound();

  const faqData: JobTypecolumn[] = [
    {
      id: "1",
      label: "カテゴリー",
      value: faqDetails?.category ?? "",
    },
    {
      id: "2",
      label: "質問",
      value: faqDetails?.question ?? "",
    },
    {
      id: "3",
      label: "回答",
      value: faqDetails?.answer ?? "",
    },
  ];

  return (
    <Suspense fallback={<Loading />}>
      <Header className="flex items-center justify-between gap-3">
        <HeaderTitle>よくある質問詳細</HeaderTitle>
        <HeaderActions toDeleteId={id} toEdit={id} />
      </Header>

      <Section>
        <BreadcrumbComposite
          isAdmin={true}
          data={breadcrumbData}
          className="lg:pb-0"
        />
      </Section>

      <Section>
        <div className="relative w-full rounded border p-5">
          <div className="flex items-center justify-between pb-8">
            <p className="text-sm font-medium text-shade-910">
              更新日：{faqDetails?.updated_at}
            </p>
            <p className="text-sm font-medium text-shade-910">
              作成日：{faqDetails?.created_at}
            </p>
          </div>
          <SectionHeading title="求人概要" />
          <TableDetail column={faqData} />
        </div>
      </Section>
      <ModalMessage />
    </Suspense>
  );
}
