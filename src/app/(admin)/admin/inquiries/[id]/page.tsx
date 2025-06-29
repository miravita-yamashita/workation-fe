import {
  getAdminInquiryDetail,
  HeaderActions,
} from "@/components/admin/inquiries/";
import { TableDetail } from "@/components/admin/inquiries/datatable/table-detail";
import {
  InquiryDetailsType,
  InquiryFormType,
} from "@/components/admin/inquiries/lib/types";
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
  BREADCRUMB_ADMIN.inquiries.base,
  BREADCRUMB_ADMIN.inquiries.list,
  BREADCRUMB_ADMIN.inquiries.detail,
];

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function InquiryDetailPage({ params }: PageProps) {
  const { id } = (await params) || {};

  const [inquiryDetailsResponse]: [{ data: InquiryDetailsType } | null] =
    await Promise.all([getAdminInquiryDetail(id)]);

  const inquiryDetails: InquiryDetailsType | null =
    inquiryDetailsResponse?.data ?? null;

  if (!inquiryDetails) notFound();

  const inquiryData: InquiryFormType[] = [
    {
      name: "1",
      label: "ID",
      value: inquiryDetails?.inquiry?.id ?? "",
    },
    {
      name: "2",
      label: "お問い合せ状況",
      value: inquiryDetails?.inquiry?.is_replied ? "返信済み" : "未返信",
    },
  ];

  const combineInquiryData: InquiryFormType[] = [
    ...inquiryData,
    ...(inquiryDetails?.inquiry?.form ?? []),
  ];

  return (
    <Suspense fallback={<Loading />}>
      <Header className="flex items-center justify-between gap-3">
        <HeaderTitle>お問い合せ詳細</HeaderTitle>
        <HeaderActions
          toEdit={id}
          isReplied={inquiryDetails?.inquiry?.is_replied}
          toDeleteId={id}
        />
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
              受信日：{inquiryDetails?.inquiry?.date_submitted}
            </p>
            <p className="text-sm font-medium text-shade-910">
              {inquiryDetails?.inquiry?.is_replied &&
                `返信日：${inquiryDetails?.inquiry?.date_replied}`}
            </p>
          </div>
          <SectionHeading title="お問い合わせ内容" />
          <TableDetail column={combineInquiryData} />
        </div>
      </Section>
      <ModalMessage />
    </Suspense>
  );
}
