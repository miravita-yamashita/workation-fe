import {
  ColumnContainer,
  ColumnItem,
  Loading,
} from "@/components/feature/common";
import { Suspense } from "react";
import { AdminDataPagination } from "@/components/feature/common";
import { AdminPageResultFilter } from "@/components/feature/page-filter";
import { pageFilterDropdownValues as rawPageFilterDropdownValues } from "@/lib/static-datasource";
import {
  DashboardActionContextProvider,
  SectionContent,
  SectionHeader,
  SectionHeaderContentRight,
  SectionHeaderTitle,
  TableButtonCreate,
  TableTotalInfo,
  TableTotalInfoItem,
} from "@/components/feature/datatable";
import { MainTableData } from "@/components/admin/jobs/datatable";
import { Metadata } from "next";
import { getAdminJobList } from "@/components/admin/jobs";
import Link from "next/link";
import {
  BREADCRUMB_ADMIN,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import { Section } from "@/components/feature/dashboard";
import MainDialogDeletePrompt from "@/components/feature/datatable/main-dialog-delete-prompt";
import { auth } from "@/app/auth";

export const metadata: Metadata = {
  title: "ワーケーションナース",
};

const breadcrumbData = [BREADCRUMB_ADMIN.jobs.base, BREADCRUMB_ADMIN.jobs.list];

type PageProps = {
  searchParams: Promise<Record<string, string>>;
};

export default async function Page({ searchParams }: PageProps) {
  const [adminJobListResponse] = await Promise.all([
    getAdminJobList({
      searchParams: new URLSearchParams(await searchParams).toString(),
    }),
  ]);
  const { data } = adminJobListResponse ?? {};
  const { data: adminJobList = [], ...paginationData } = data ?? {};
  const session = await auth();

  return (
    <DashboardActionContextProvider>
      <SectionHeader className="mx-5 justify-between py-5">
        <SectionHeaderTitle>求人一覧</SectionHeaderTitle>
        <SectionHeaderContentRight>
          {session?.user?.isAdmin && (
            <TableButtonCreate className="px-[2rem] py-[.5938rem]">
              <Link
                href="/admin/jobs/new"
                className="text-sm font-bold text-white"
              >
                新規作成
              </Link>
            </TableButtonCreate>
          )}
        </SectionHeaderContentRight>
      </SectionHeader>
      <Section className="border-t border-shade-250">
        <BreadcrumbComposite
          data={breadcrumbData}
          className="lg:pb-0"
          isAdmin={true}
        />
      </Section>
      <SectionContent className="m-5 rounded border p-5">
        <Suspense fallback={<Loading />}>
          <MainTableData data={adminJobList} />
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
