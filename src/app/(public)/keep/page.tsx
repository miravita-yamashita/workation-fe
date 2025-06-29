import {
  BREADCRUMB,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import { BackgroundContainer, MainBlock } from "@/components/feature/common";
import { DataPagination } from "@/components/feature/common/data-pagination";
import { LineInfoComposite } from "@/components/feature/line-info";

import { SavedJobItems } from "@/components/keep";
import { getKeepJobs } from "@/components/keep/lib";
import { getStaticPageBySlug } from "@/components/static-page";
import { RecommendedJobs } from "@/components/top";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "最近見た求人一覧",
  description:
    "最近チェックした看護師求人を簡単に再確認！気になる宮古島での短期求人や寮完備の働きやすいお仕事をもう一度チェックして、理想のワーケーションナースライフを見つけましょう。",
};

type PageProps = {
  searchParams: Promise<Record<string, string>>;
};

const breadcrumbData = [BREADCRUMB.top, BREADCRUMB.keep.base];

export default async function Page({ searchParams }: PageProps) {
  const STATIC_SLUG = "Top";

  const [keepJobsResponse, getStaticPageBySlugResponse] = await Promise.all([
    getKeepJobs({
      searchParams: new URLSearchParams(await searchParams).toString(),
    }),
    getStaticPageBySlug(STATIC_SLUG),
  ]);

  const { data: topPageSavedData = null } = getStaticPageBySlugResponse ?? {};

  const { data } = keepJobsResponse ?? {};
  const { data: keepJobs = [], ...paginationData } = data ?? {};

  return (
    <>
      <BackgroundContainer className="bg-white">
        <MainBlock size="sm" className="lg:p-0">
          <BreadcrumbComposite data={breadcrumbData} />
        </MainBlock>
        <MainBlock
          size="sm"
          className="font-bold text-coral-300 lg:p-0 lg:py-[.625rem] lg:text-[1.625rem]"
        >
          キープ一覧
        </MainBlock>
      </BackgroundContainer>

      <Suspense>
        <>
          <div>
            <SavedJobItems
              jobs={keepJobs}
              count={{ from: paginationData.from, total: paginationData.total }}
            />
            <MainBlock size="sm" className="px-4 lg:p-0">
              <DataPagination
                paginationData={paginationData}
                className="mb-[6.25rem]"
              />
            </MainBlock>
          </div>
        </>

        <MainBlock
          size="sm"
          className="font-bold text-coral-300 lg:p-0 lg:py-[.625rem] lg:text-[1.625rem]"
        >
          {topPageSavedData?.positions &&
            topPageSavedData?.positions.length > 0 && (
              <RecommendedJobs jobs={topPageSavedData?.positions} />
            )}
          <LineInfoComposite className="mb-[6.25rem]" />
        </MainBlock>
      </Suspense>
    </>
  );
}
