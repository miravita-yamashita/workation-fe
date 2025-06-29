import { Loading } from "@/components/feature/common";
import { Suspense } from "react";
import {
  DashboardActionContextProvider,
  SectionContent,
  SectionHeader,
  SectionHeaderTitle,
} from "@/components/feature/datatable";
import { Metadata } from "next";
import {
  BREADCRUMB_ADMIN,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import { Section } from "@/components/feature/dashboard";
import {
  getAdminStaticPageList,
  MainTableData,
} from "@/components/admin/static-page";

export const metadata: Metadata = {
  title: "ワーケーションナース",
};

const breadcrumbData = [
  BREADCRUMB_ADMIN.dashboard,
  BREADCRUMB_ADMIN.static.list,
];

type PageProps = {
  searchParams: Promise<Record<string, string>>;
};

export default async function Page({ searchParams }: PageProps) {
  const [adminStaticPageListResponse] = await Promise.all([
    getAdminStaticPageList({
      searchParams: new URLSearchParams(await searchParams).toString(),
    }),
  ]);
  const { data: adminStaticPageList = [] } = adminStaticPageListResponse ?? {};

  return (
    <DashboardActionContextProvider>
      <SectionHeader className="mx-5 justify-between py-5">
        <SectionHeaderTitle>固定ページ</SectionHeaderTitle>
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
          <MainTableData data={adminStaticPageList} />
        </Suspense>
      </SectionContent>
    </DashboardActionContextProvider>
  );
}
