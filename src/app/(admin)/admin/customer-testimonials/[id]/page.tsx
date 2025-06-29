import {
  CustomerTestimonialDetailType,
  getAdminCustomerDetails,
  HeaderActions,
  TableDetail,
} from "@/components/admin/customer-testimonials";
import { JobTypecolumn } from "@/components/admin/jobs/job/lib";
import {
  BREADCRUMB_ADMIN,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import { Loading } from "@/components/feature/common";
import { SectionHeading } from "@/components/feature/common/section-heading";
import { Header, HeaderTitle, Section } from "@/components/feature/dashboard";
import { ModalMessage } from "@/components/feature/modal/modal-message";
import ImageNoPhoto from "@public/image-no-photo.jpg";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const breadcrumbData = [
  BREADCRUMB_ADMIN.customerTestimonials.base,
  BREADCRUMB_ADMIN.customerTestimonials.list,
  BREADCRUMB_ADMIN.faq.detail,
];

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function CustomerTestimonialPage({ params }: PageProps) {
  const { id } = (await params) || {};

  const [testimonialDetailsResponse]: [
    { data: CustomerTestimonialDetailType } | null,
  ] = await Promise.all([getAdminCustomerDetails(id)]);

  const testimonialDetails: CustomerTestimonialDetailType | null =
    testimonialDetailsResponse?.data ?? null;
  const rating = "★".repeat(testimonialDetails?.rating ?? 0);
  if (!testimonialDetails) notFound();

  const testimonialData: JobTypecolumn[] = [
    {
      id: "1",
      label: "お名前",
      value: testimonialDetails?.name ?? "",
    },
    {
      id: "2",
      label: "評判",
      value: rating,
    },
    {
      id: "3",
      label: "タイトル",
      value: testimonialDetails?.title ?? "",
    },
    {
      id: "4",
      label: "本文",
      value: testimonialDetails?.body ?? "",
    },
    {
      id: "5",
      label: "ステータス",
      value: testimonialDetails?.rating === 0 ? "公開" : "非公開",
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
              更新日：{testimonialDetails?.updated_at}
            </p>
            <p className="text-sm font-medium text-shade-910">
              作成日：{testimonialDetails?.created_at}
            </p>
          </div>
          <div className="mb-8 flex items-center gap-5 rounded-[.5rem] border border-[#E4E4E4] p-5">
            <div className="relative h-[5rem] w-[5rem] overflow-hidden rounded-full bg-gray-200">
              <Image
                className="object-cover"
                src={testimonialDetails?.media[0]?.url || ImageNoPhoto}
                fill
                sizes="100%"
                alt={`Image of ${testimonialDetails?.name}`}
              />
            </div>
            <div>
              <h2 className="text-xl font-bold">{testimonialDetails?.name}</h2>
              <div>{rating}</div>
            </div>
          </div>
          <SectionHeading title="お客様の声の内容" />
          <TableDetail column={testimonialData} />
        </div>
      </Section>
      <ModalMessage />
    </Suspense>
  );
}
