import {
  FacilityDetailsType,
  getFacilityDetails,
  HeaderActions,
} from "@/components/admin/facilities";
import {
  MainTableData,
  TableDetail,
} from "@/components/admin/facilities/detail/datatable";

import {
  BREADCRUMB_ADMIN,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import {
  ColumnContainer,
  ColumnItem,
  Loading,
} from "@/components/feature/common";
import { Header, HeaderTitle, Section } from "@/components/feature/dashboard";
import { ModalMessage } from "@/components/feature/modal/modal-message";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const breadcrumbData = [
  BREADCRUMB_ADMIN.facilities.base,
  BREADCRUMB_ADMIN.facilities.list,
];

export type FacilityTypecolumn = {
  id: string;
  label: string;
  value: string;
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function FacilityDetail({ params }: PageProps) {
  const { id } = (await params) || {};

  const [facilityDetailsResponse]: [{ data: FacilityDetailsType } | null] =
    await Promise.all([getFacilityDetails(id)]);

  const facilityDetails: FacilityDetailsType | null =
    facilityDetailsResponse?.data ?? null;

  if (!facilityDetails) notFound();

  const updatedBreadcrumbData = [...breadcrumbData];

  if (facilityDetails && facilityDetails?.name && id) {
    updatedBreadcrumbData.push({
      label: facilityDetails?.name,
      link: `/admin/jobs/${id}`,
    });
  }

  const facilityDatacolumn: FacilityTypecolumn[] = [
    { id: "0", label: "名称", value: facilityDetails?.name ?? "" },
    { id: "1", label: "メールアドレス", value: facilityDetails?.email ?? "" },
    { id: "2", label: "電話番号", value: facilityDetails?.phone_number ?? "" },
    {
      id: "3",
      label: "所在地",
      value:
        [
          facilityDetails?.prefecture?.label,
          facilityDetails?.address_city,
          facilityDetails?.address_street,
        ]
          .filter((value) => value?.trim())
          .join(" ") ?? "",
    },
    { id: "4", label: "アクセス", value: facilityDetails?.access ?? "" },
    {
      id: "5",
      label: "診療科目",
      value: facilityDetails?.medical_subject_categories[0].name ?? "",
    },
    {
      id: "6",
      label: "職員数",
      value: facilityDetails?.no_employees.toString() ?? "",
    },
    {
      id: "7",
      label: "記録方式",
      value: facilityDetails?.record_method ?? "",
    },
    {
      id: "8",
      label: "病床数",
      value: facilityDetails?.no_beds.toString() ?? "",
    },
    {
      id: "9",
      label: "看護基準",
      value: facilityDetails?.nursing_standard ?? "",
    },
    { id: "10", label: "駐車場", value: facilityDetails?.parking_lot ?? "" },
  ];

  return (
    <Suspense fallback={<Loading />}>
      <Header className="flex items-center justify-between gap-3">
        <HeaderTitle>施設詳細</HeaderTitle>
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
          <ColumnContainer className="justify-between">
            <ColumnItem className="w-full">
              <TableDetail column={facilityDatacolumn} />

              {facilityDetails?.map && (
                <div className="relative h-0 w-full pb-[27.25%]">
                  <iframe
                    className="absolute left-0 top-0 h-full w-full border-0"
                    src={facilityDetails?.map}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              )}
              {facilityDetails?.positions &&
                facilityDetails?.positions.length > 0 && (
                  <MainTableData data={facilityDetails?.positions} />
                )}
            </ColumnItem>
          </ColumnContainer>
        </div>
      </Section>
      <ModalMessage />
    </Suspense>
  );
}
