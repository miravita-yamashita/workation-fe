"use client";

import { SectionHeading } from "@/components/admin/inquiries";

import { TableDetail } from "@/components/admin/inquiries/datatable/table-detail";

import {
  FormReply,
  getAdminInquiryDetail,
  HeaderActions,
} from "@/components/admin/inquiries/";
import {
  InquiryDetailsType,
  InquiryFormType,
} from "@/components/admin/inquiries/lib/types";
import {
  BREADCRUMB_ADMIN,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import { Loading } from "@/components/feature/common";
import { Header, HeaderTitle, Section } from "@/components/feature/dashboard";
import { ModalMessage } from "@/components/feature/modal/modal-message";
import { notFound, useParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

const breadcrumbData = [
  BREADCRUMB_ADMIN.inquiries.base,
  BREADCRUMB_ADMIN.inquiries.list,
];

export default function InquiryReplyPage() {
  const { id } = useParams();
  if (!id) notFound();
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [inquiryDetails, setInquiryetails] =
    useState<InquiryDetailsType | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const inquiryDetailsResponse = await getAdminInquiryDetail(
          id as string,
        );
        const { data: inquiryDetailsData } = inquiryDetailsResponse ?? {};

        if (inquiryDetailsData?.inquiry?.is_replied) {
          router.replace(`/admin/inquiries/${id}`);
          return;
        }
        if (!inquiryDetailsData) {
          router.replace("/not-found");

          return;
        }

        setInquiryetails(inquiryDetailsData);
      } catch (error) {
        console.error("Error fetching facility details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id, router]);

  const updatedBreadcrumbData = [...breadcrumbData];
  if (inquiryDetails && inquiryDetails?.inquiry.id && id) {
    updatedBreadcrumbData.push(
      {
        label: "お問い合わせ詳細",
        link: `/admin/inquiries/${id}`,
      },
      BREADCRUMB_ADMIN.inquiries.reply,
    );
  }

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
  ].filter((item) => !(item.name === "reply"));

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  if (loading || !inquiryDetails) return <>{}</>;
  return (
    <Suspense fallback={<Loading />}>
      <Header className="flex items-center justify-between gap-3">
        <HeaderTitle>お問い合せ詳細</HeaderTitle>
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
        <div className="relative w-full rounded border p-5">
          <SectionHeading title="お問い合わせ内容" />
          <TableDetail column={combineInquiryData} />
          <FormReply ref={formRef} detail={inquiryDetails} />
        </div>
      </Section>
      <ModalMessage />
    </Suspense>
  );
}
