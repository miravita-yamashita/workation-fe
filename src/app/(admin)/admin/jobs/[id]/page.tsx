import { HeaderActions } from "@/components/admin/jobs";
import { SectionHeading } from "@/components/feature/common/section-heading";
import noPhoto from "@public/placeholder/jap-no-photo.png";
import Image from "next/image";

import {
  getJobShow,
  JobDetailsPageType,
  TableDetail,
} from "@/components/admin/jobs/job/lib";

import { MainTableData } from "@/components/admin/jobs/job/datatable";
import ImagesSelectable from "@/components/admin/jobs/job/images-selectable";
import { JobTypecolumn } from "@/components/admin/jobs/job/lib";
import { TableFaq } from "@/components/admin/jobs/job/lib/table-faq";
import { TableSpecs } from "@/components/admin/jobs/job/lib/table-specs";
import {
  BREADCRUMB_ADMIN,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import { Loading } from "@/components/feature/common";
import { Header, HeaderTitle, Section } from "@/components/feature/dashboard";
import { ModalMessage } from "@/components/feature/modal/modal-message";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const breadcrumbData = [BREADCRUMB_ADMIN.jobs.base, BREADCRUMB_ADMIN.jobs.list];

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function JobDetailPage({ params }: PageProps) {
  const { id } = (await params) || {};

  const [JobDetailsResponse]: [{ data: JobDetailsPageType } | null] =
    await Promise.all([getJobShow(id)]);

  const jobDetails: JobDetailsPageType | null =
    JobDetailsResponse?.data ?? null;

  if (!jobDetails) notFound();
  const updatedBreadcrumbData = [...breadcrumbData];

  if (jobDetails && jobDetails?.name && id) {
    updatedBreadcrumbData.push({
      label: jobDetails?.name,
      link: `/admin/jobs/${id}`,
    });
  }

  const summary: JobTypecolumn[] = [
    {
      id: "1",
      label: "求人番号",
      value: jobDetails?.job_number ?? "",
    },
    {
      id: "2",
      label: "求人タイトル",
      value: jobDetails?.name ?? "",
    },
    {
      id: "3",
      label: "施設名",
      value: jobDetails?.facility?.name ?? "",
    },
    {
      id: "4",
      label: "説明文",
      value: jobDetails?.description ?? "",
    },
  ];

  const recommendation: JobTypecolumn[] = [
    {
      id: "1",
      label: "POINT 01",
      value: jobDetails?.recommendation_point_1 ?? "",
    },
    {
      id: "2",
      label: "POINT 02",
      value: jobDetails?.recommendation_point_2 ?? "",
    },
  ];

  const openings: JobTypecolumn[] = [
    {
      id: "1",
      label: "求人番号",
      value: jobDetails?.job_number ?? "",
    },
    {
      id: "2",
      label: "募集形態",
      value:
        jobDetails?.recruitment_categories?.map((med) => med.name).join(", ") ??
        "",
    },
    {
      id: "3",
      label: "診療科目",
      value:
        jobDetails?.medical_subject_categories
          ?.map((med) => med.name)
          .join(", ") ?? "",
    },
    {
      id: "4",
      label: "配属",
      value:
        jobDetails?.assignment_categories?.map((med) => med.name)?.join(", ") ??
        "",
    },

    {
      id: "5",
      label: "住所",
      value:
        [
          jobDetails?.area?.label,
          jobDetails?.address_city,
          jobDetails?.address_street,
        ]
          .filter((value) => value?.trim())
          .join(", ") ?? "",
    },

    {
      id: "6",
      label: "給与",
      value:
        jobDetails?.salary_min && jobDetails?.salary_max
          ? `${jobDetails.salary_min}円～${jobDetails.salary_max}円`
          : jobDetails?.salary_min
            ? `${jobDetails.salary_min}円`
            : jobDetails?.salary_max
              ? `${jobDetails.salary_max}円`
              : "",
    },
    {
      id: "7",
      label: "賞与",
      value: jobDetails?.bonus ?? "",
    },
    {
      id: "8",
      label: "勤務時間",
      value:
        `${jobDetails?.work_start_time ?? ""}～${jobDetails?.work_end_time ?? ""}`.trim() ||
        "",
    },
    {
      id: "9",
      label: "休日",
      value: jobDetails?.holiday ?? "",
    },
  ];

  const specs =
    jobDetails?.specific_condition_categories?.length > 0
      ? jobDetails?.specific_condition_categories?.map((spec, index) => ({
          id: spec.id,
          label: `0${index + 1}`,
          value: spec.name,
        }))
      : [];

  return (
    <Suspense fallback={<Loading />}>
      <Header className="flex items-center justify-between gap-3">
        <HeaderTitle>求人詳細</HeaderTitle>
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
        <div className="relative min-h-[95vh] w-full rounded border p-5">
          <div className="flex gap-5">
            <div className="min-h-[95vh] w-full flex-1 rounded border p-5">
              <div className="flex items-center justify-between pb-8">
                <p className="text-sm font-medium text-shade-910">
                  更新日：{jobDetails?.updated_at_formatted}
                </p>
                <p className="text-sm font-medium text-shade-910">
                  作成日：{jobDetails?.created_at_formatted}
                </p>
              </div>
              <SectionHeading title="求人概要" />
              <TableDetail column={summary} />
              <SectionHeading title="おすすめポイント" />
              <TableDetail column={recommendation} />
              <SectionHeading title="募集中の求人" />
              <TableDetail column={openings} />
              <SectionHeading title="求人情報に表示するおすすめ求人" />

              {jobDetails?.recommended_jobs &&
                jobDetails?.recommended_jobs.length > 0 && (
                  <MainTableData data={jobDetails?.recommended_jobs} />
                )}
              <h2 className="pb-3 text-base font-bold">
                求人情報に表示するよくある質問
              </h2>
              <SectionHeading title="看護師向け" />
              {jobDetails?.faq_nurses && jobDetails?.faq_nurses.length > 0 && (
                <TableFaq faq={jobDetails?.faq_nurses} />
              )}
              <SectionHeading title="医療機関向け" />
              {jobDetails?.faq_medical_institutions &&
                jobDetails?.faq_medical_institutions.length > 0 && (
                  <TableFaq faq={jobDetails?.faq_medical_institutions} />
                )}
              <SectionHeading title="一般向け" />
              {jobDetails?.faq_general &&
                jobDetails?.faq_general.length > 0 && (
                  <TableFaq faq={jobDetails?.faq_general} />
                )}
            </div>
            <div className="w-[19.375rem] self-start rounded border p-5">
              <SectionHeading title="契約形態" />
              <p className="pb-3 font-inter text-base">
                {jobDetails?.contract_categories.name}
              </p>
              <SectionHeading title="画像（5枚まで）" />
              {jobDetails?.media?.featured &&
              jobDetails?.media?.featured.length > 0 ? (
                <ImagesSelectable
                  jobDetailImages={jobDetails?.media?.featured}
                />
              ) : (
                <div className="relative mb-2 mt-2 h-[11.25rem] w-full bg-gray-200">
                  <Image
                    className="object-cover"
                    src={noPhoto}
                    fill
                    sizes="100%"
                    alt="Main Image"
                  />
                </div>
              )}

              <SectionHeading title="バナー" />
              {jobDetails?.media?.banner?.length > 0 ? (
                jobDetails?.media?.banner.map((banner, index) =>
                  banner?.custom_attr?.link ? (
                    <Link key={index} href={banner?.custom_attr?.link}>
                      <div className="relative mb-3 h-[6.25rem] w-full bg-gray-200">
                        <Image
                          className="object-cover"
                          src={banner.url}
                          fill
                          sizes="100%"
                          alt="image"
                        />
                      </div>
                    </Link>
                  ) : (
                    <div
                      key={index}
                      className="relative mb-3 h-[6.25rem] w-full bg-gray-200"
                    >
                      <Image
                        className="object-cover"
                        src={banner.url}
                        fill
                        sizes="100%"
                        alt="image"
                      />
                    </div>
                  ),
                )
              ) : (
                <div className="relative mb-3 h-[6.25rem] w-full bg-gray-200">
                  <Image
                    className="object-cover"
                    src={noPhoto}
                    fill
                    sizes="100%"
                    alt={`Image no photo`}
                  />
                </div>
              )}
              <SectionHeading title="おすすめ" />
              <TableSpecs data={specs} />
            </div>
          </div>
        </div>
      </Section>
      <ModalMessage />
    </Suspense>
  );
}
