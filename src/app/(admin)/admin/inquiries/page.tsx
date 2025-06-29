import {
  Block,
  ColumnContainer,
  ColumnItem,
  Loading,
  Title,
} from "@/components/feature/common";
import { Suspense } from "react";
import { AdminDataPagination } from "@/components/feature/common";
import { AdminPageResultFilter } from "@/components/feature/page-filter";
import { pageFilterDropdownValues as rawPageFilterDropdownValues } from "@/lib/static-datasource";
import {
  DashboardActionContextProvider,
  SectionContent,
  SectionHeader,
  SectionHeaderTitle,
  TableTotalInfo,
  TableTotalInfoItem,
} from "@/components/feature/datatable";
import { Metadata } from "next";
import {
  BREADCRUMB_ADMIN,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import { Section } from "@/components/feature/dashboard";
import MainDialogDeletePrompt from "@/components/feature/datatable/main-dialog-delete-prompt";
import {
  getAdminInquiryList,
  MainTableData,
  TableFilter,
  TableFilterItem,
} from "@/components/admin/inquiries";
import Link from "next/link";
import { InquirySearchParamKey } from "@/components/admin/inquiries/lib/types";

export const metadata: Metadata = {
  title: "ワーケーションナース",
};

const breadcrumbData = [
  BREADCRUMB_ADMIN.inquiries.base,
  BREADCRUMB_ADMIN.inquiries.list,
];

type PageProps = {
  searchParams: Promise<Record<string, string>>;
};

export default async function Page({ searchParams }: PageProps) {
  const [adminInquiryListResponse] = await Promise.all([
    getAdminInquiryList({
      searchParams: new URLSearchParams(await searchParams).toString(),
    }),
  ]);
  const { data, unreplied, currentMonth } = adminInquiryListResponse ?? {};
  const { data: adminInquiryList = [], ...paginationData } = data ?? {};

  return (
    <DashboardActionContextProvider>
      <SectionHeader className="mx-5 justify-between py-5">
        <SectionHeaderTitle>お問い合せ一覧</SectionHeaderTitle>
      </SectionHeader>
      <Section className="border-t border-shade-250">
        <BreadcrumbComposite
          data={breadcrumbData}
          className="lg:pb-0"
          isAdmin={true}
        />
      </Section>
      <SectionContent className="m-5 rounded border p-5">
        <TableFilter className="m-5 grid grid-cols-3 gap-5">
          <TableFilterItem className="flex items-center justify-between p-5">
            <Block>
              <Title className="w-full font-bold">未返信</Title>
              <p className="shrink-0 text-sm font-medium text-shade-910">
                {unreplied}件
              </p>
            </Block>
            <Link
              href={`/admin/inquiries?${InquirySearchParamKey.Unreplied}`}
              className="text-xs font-medium text-blue-10"
            >
              表示する
            </Link>
          </TableFilterItem>
          <TableFilterItem className="flex items-center justify-between p-5">
            <Block>
              <Title className="w-full font-bold">返信済</Title>
              <p className="shrink-0 text-sm font-medium text-shade-910">
                {currentMonth}件 （{new Date().getMonth() + 1}月）
              </p>
            </Block>
            <Link
              href={`/admin/inquiries?${InquirySearchParamKey.CurrentMonth}`}
              className="text-xs font-medium text-blue-10"
            >
              表示する
            </Link>
          </TableFilterItem>
          <TableFilterItem className="flex items-center justify-between p-5">
            <Block>
              <Title className="w-full font-bold">アーカイブ</Title>
            </Block>
            <Link
              href={`/admin/inquiries?${InquirySearchParamKey.Archive}`}
              className="text-xs font-medium text-blue-10"
            >
              表示する
            </Link>
          </TableFilterItem>
        </TableFilter>
        <Suspense fallback={<Loading />}>
          <MainTableData data={adminInquiryList} />
          <ColumnContainer className="justify-between">
            <ColumnItem className="flex w-full">
              <AdminPageResultFilter
                paramKey="per_page"
                labelName={" "}
                selectDropdownValues={rawPageFilterDropdownValues.map(
                  (value) => ({
                    id: value,
                    name: value,
                  }),
                )}
                className="justify-normal"
                labelStyles="font-bold"
              />
              <TableTotalInfo className="items-center gap-5">
                <TableTotalInfoItem className="text-sm font-medium">
                  {paginationData.total}件中
                </TableTotalInfoItem>
                <TableTotalInfoItem className="text-sm font-medium">
                  {paginationData?.from}-{paginationData?.to}件
                </TableTotalInfoItem>
              </TableTotalInfo>
            </ColumnItem>
            <ColumnItem className="w-full">
              <AdminDataPagination paginationData={paginationData} />
            </ColumnItem>
          </ColumnContainer>
        </Suspense>
      </SectionContent>
      <MainDialogDeletePrompt
        redirectPath="/admin/jobs"
        endpoint="job/delete"
      />
    </DashboardActionContextProvider>
  );
}
