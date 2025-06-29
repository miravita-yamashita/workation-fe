import {
  BREADCRUMB,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import {
  BackgroundContainer,
  MainBlock,
} from "@/components/feature/common";
import { LineInfoComposite } from "@/components/feature/line-info";
import { RecentlyResult, RecentlyViewed } from "@/components/feature/recently";
import { getRecentlyViewedJobs } from "@/components/feature/recently/lib";
import { RecentlyNoResult } from "@/components/feature/recently/recently-no-result";
import { getStaticPageBySlug } from "@/components/static-page";
import { RecommendedJobs } from "@/components/top";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "最近見た求人一覧",
  description:
    "最近チェックした看護師求人を簡単に再確認！気になる宮古島での短期求人や寮完備の働きやすいお仕事をもう一度チェックして、理想のワーケーションナースライフを見つけましょう。",
};

const breadcrumbData = [BREADCRUMB.top, BREADCRUMB.recentViewedJobs.base];

export default async function Page() {
  const STATIC_SLUG = "Top";
  const [recentlyViewedResponse, getStaticPageBySlugResponse] =
    await Promise.all([
      getRecentlyViewedJobs(),
      getStaticPageBySlug(STATIC_SLUG),
    ]);
  const { data: recentlyViewedJobs, count } = recentlyViewedResponse ?? {};
  const totalResults = Array.isArray(recentlyViewedJobs)
    ? recentlyViewedJobs.length
    : 0;

  const { data: topPageSavedData = null } = getStaticPageBySlugResponse ?? {};
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
          最近見た求人一覧
        </MainBlock>
      </BackgroundContainer>

      <Suspense>
        {totalResults === 0 ? (
          <MainBlock size="sm" className="lg:p-0">
            <div className="pt-5 md:pt-10">
              <RecentlyNoResult />
            </div>
          </MainBlock>
        ) : (
          <>
            <MainBlock size="sm" className="px-4 lg:p-0">
              <div className="mt-5 bg-white md:mt-10">
                <RecentlyResult count={count} />
              </div>
            </MainBlock>
            <div className="bg-white md:bg-transparent">
              <MainBlock size="sm" className="px-4 lg:p-0">
                <div className="bg-white px-0 py-[2.5rem] md:mx-0 md:bg-transparent lg:p-0">
                  <RecentlyViewed jobs={recentlyViewedJobs} />
                </div>
              </MainBlock>
            </div>
          </>
        )}
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
