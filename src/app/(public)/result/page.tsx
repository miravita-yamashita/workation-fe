import {
  BREADCRUMB,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import {
  BackgroundContainer,
  ColumnContainer,
  ColumnItem,
  Loading,
  MainBlock,
  PageHeader,
} from "@/components/feature/common";
import {
  FAQPopularByGroupComposite,
  getFAQPopularFAQByGroup,
} from "@/components/feature/faq";
import { Panel, PresetComposite } from "@/components/feature/job/search";
import {
  getJobSearch,
  Result,
  ResultActionComposite,
  ResultCount,
  ResultItem,
  ResultList,
  ResultPageSize,
  ResultTextEmphasized,
} from "@/components/feature/job/search/result";
import { LineInfoTightComposite } from "@/components/feature/line-info";

import { Metadata } from "next";
import { RecommendedJobs } from "@/components/top";
import {
  FilterComposite,
  getJobSearchPrefectures,
  JobSearchParamKey,
  getJobSearchFilters,
} from "@/components/feature/job/search/filter";
import { JobCardComposite } from "@/components/feature/job/search/job-card/job-card-composite";
import { DataPagination } from "@/components/feature/common/data-pagination";
import { Suspense } from "react";
import { getStaticPageBySlug } from "@/components/static-page";

const breadcrumbData = [BREADCRUMB.top, BREADCRUMB.result.base];

type PageProps = {
  searchParams: Promise<Record<string, string>>;
};

export const metadata: Metadata = {
  title: "Search Job",
  description:
    "希望の都道府県でワーケーションナース求人を検索！宮古島をはじめ、全国各地の短期求人や寮完備の魅力的なお仕事が見つかります。働きたい地域で理想の仕事を探しましょう！",
};

export default async function Page({ searchParams }: PageProps) {
  const STATIC_SLUG = "Top";
  const searchParamsData = await searchParams;
  const searchParamsString = new URLSearchParams(searchParamsData).toString();
  const [
    faqPopularByGroupResponse,
    jobSearchResponse,
    jobSearchFiltersResponse,
    jobSearchPrefecturesResponse,
    getStaticPageBySlugResponse,
  ] = await Promise.all([
    getFAQPopularFAQByGroup(),
    getJobSearch(searchParamsString),
    getJobSearchFilters(),
    getJobSearchPrefectures(),
    getStaticPageBySlug(STATIC_SLUG),
  ]);

  const { data: searchResults = [] } = jobSearchResponse?.data || {};
  const jobSearchFilters = jobSearchFiltersResponse?.data || {};
  const prefectures = jobSearchPrefecturesResponse?.data || {};
  const { data: topPageSavedData = null } = getStaticPageBySlugResponse ?? {};

  return (
    <Suspense fallback={<Loading />}>
      <BackgroundContainer className="bg-white">
        <MainBlock size="sm" className="lg:p-0">
          <BreadcrumbComposite data={breadcrumbData} />
          <PageHeader>求人を探す</PageHeader>
        </MainBlock>
      </BackgroundContainer>
      <BackgroundContainer className="bg-ivory-100 pb-[3.125rem] pt-5 lg:py-20 lg:pb-[6.25rem] lg:pt-10">
        <MainBlock
          size="sm"
          className="flex flex-col lg:flex-row lg:gap-10 lg:p-0"
        >
          <section>
            <PresetComposite
              jobSearchFilter={jobSearchFilters}
              jobSearchPrefectures={prefectures}
            />
            <Panel className="mb-[1.875rem] p-3.5 lg:p-[1.875rem]">
              <Result>
                <ColumnContainer className="mb-2.5 w-full justify-between">
                  <ColumnItem className="w-full">
                    <ResultCount>
                      <span className="leading-[1.5rem]">現在の検索結果</span>
                    </ResultCount>
                    <span>
                      <ResultTextEmphasized>
                        {jobSearchResponse?.count || 0}
                      </ResultTextEmphasized>
                      <span className="text-base text-pink-200">件</span>
                    </span>
                  </ColumnItem>
                  <ColumnItem className="flex w-full items-end justify-end">
                    <div className="flex gap-2.5">
                      <span className="shrink-0 self-center text-shade-800">
                        表示件数
                      </span>
                      <ResultPageSize
                        pageSize={searchParamsData[JobSearchParamKey.PageSize]}
                        searchParams={searchParamsString}
                      />
                    </div>
                  </ColumnItem>
                </ColumnContainer>
                <ResultActionComposite />
              </Result>
            </Panel>
            <Panel className="mb-5 bg-transparent p-0 lg:mb-[1.875rem] lg:p-0">
              <ResultList>
                {searchResults.map((jobInfo) => (
                  <ResultItem key={jobInfo.id}>
                    <JobCardComposite data={jobInfo} />
                  </ResultItem>
                ))}
              </ResultList>
            </Panel>
            {searchResults?.length > 0 && (
              <Panel className="bg-transparent px-0 lg:p-0">
                <DataPagination
                  className="pb-10 pt-0 lg:pb-[3.125rem]"
                  paginationData={jobSearchResponse.data}
                />
              </Panel>
            )}
            <section className="space-y-[3.75rem]">
              {topPageSavedData?.positions &&
                topPageSavedData?.positions.length > 0 && (
                  <RecommendedJobs jobs={topPageSavedData?.positions} />
                )}
              <LineInfoTightComposite />
              <div>
                <FAQPopularByGroupComposite
                  data={faqPopularByGroupResponse}
                  className="mb-10 lg:mb-0"
                />
              </div>
            </section>
          </section>
          <section className="shrink-0 lg:max-w-[16.25rem]">
            <FilterComposite
              jobSearchFilter={jobSearchFilters}
              jobSearchPrefectures={prefectures}
            />
          </section>
        </MainBlock>
      </BackgroundContainer>
    </Suspense>
  );
}
