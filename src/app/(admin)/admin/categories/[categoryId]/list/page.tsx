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
import { Metadata } from "next";
import {
  CategorySearchParamKey,
  getAdminSubCategoryList,
  MainTableData,
} from "@/components/admin/categories";
import Link from "next/link";
import { Section } from "@/components/feature/dashboard";
import {
  BREADCRUMB_ADMIN,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import { auth } from "@/app/auth";

export const metadata: Metadata = {
  title: "Categories",
};

type PageProps = {
  searchParams: Promise<Record<string, string>>;
  params: Promise<{ categoryId: string }>;
};

export default async function Page({ searchParams, params }: PageProps) {
  const searchParamsResolved = await searchParams;
  const { [CategorySearchParamKey.Name]: categoryName } = searchParamsResolved;
  const { categoryId: parentCategoryId } = await params;
  const [adminSubCategoryListResponse] = await Promise.all([
    getAdminSubCategoryList({
      id: parentCategoryId,
      searchParams: new URLSearchParams(searchParamsResolved).toString(),
    }),
  ]);

  const { data } = adminSubCategoryListResponse ?? {};
  const { data: adminSubCategoryList = [], ...paginationData } = data ?? {};

  const breadcrumbData = [
    BREADCRUMB_ADMIN.dashboard,
    BREADCRUMB_ADMIN.categories.base,
    BREADCRUMB_ADMIN.categories.list,
  ];

  const session = await auth();

  return (
    <DashboardActionContextProvider>
      <SectionHeader className="mx-5 justify-between py-5">
        <SectionHeaderTitle>{`${categoryName}一覧`}</SectionHeaderTitle>
        <SectionHeaderContentRight className="flex gap-5">
          {session?.user?.isAdmin && (
            <>
              <TableButtonCreate className="rounded px-[2rem] py-[.5938rem] max-h-10">
                <Link
                  href={`/admin/categories/${parentCategoryId}/create`}
                  className="text-sm font-bold text-white"
                >
                  新規作成
                </Link>
              </TableButtonCreate>
            </>
          )}
        </SectionHeaderContentRight>
      </SectionHeader>
      <Section>
        <BreadcrumbComposite
          data={breadcrumbData}
          className="lg:pb-0"
          isAdmin={true}
        />
      </Section>
      <Suspense fallback={<Loading />}>
        <Section>
          <SectionContent className="rounded-[.5rem] border border-shade-250 p-5">
            <MainTableData
              data={adminSubCategoryList}
              parentCategoryId={parentCategoryId}
            />
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
          </SectionContent>
        </Section>
      </Suspense>
    </DashboardActionContextProvider>
  );
}
