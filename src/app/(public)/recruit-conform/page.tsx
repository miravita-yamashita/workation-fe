import {
  BREADCRUMB,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import {
  BackgroundContainer,
  FieldHorizontalRuleBlock,
  MainBlock,
  PageHeader,
} from "@/components/feature/common";
import { DataPagination } from "@/components/feature/common/data-pagination";
import {
  FAQAccordion,
  FAQAccordionCommonContent,
  FAQAccordionContent,
  FAQAccordionEmphasized,
  FAQAccordionItem,
  FAQAccordionTrigger,
  FQACategoryPanel,
  getFAQCategory,
  SearchFormBody,
  SearchFormHeader,
  SearchPanel,
  SearchTag,
  SearchTagItem,
  SearchTagList,
} from "@/components/feature/faq";
import {
  FAQSearchParamKey,
  getPopularSearchKeywords,
  SearchCount,
  SearchCountEmphasized,
  searchFAQ,
} from "@/components/feature/faq/search";

import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "看護師のよくある質問一覧",
  description:
    "ワーケーションナースに関する疑問を解決！宮古島での短期求人や寮完備のサポート体制、応募から勤務開始までの流れなど、よくある質問にお答えします。",
};

const breadcrumbData = [BREADCRUMB.top, BREADCRUMB.question.base];

type PageProps = {
  searchParams: Promise<{ [key: string]: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const {
    [FAQSearchParamKey.Search]: search,
    [FAQSearchParamKey.Category]: categoryId,
    [FAQSearchParamKey.Group]: groupLabel,
  } = await searchParams;
  const searchParamsString = new URLSearchParams(await searchParams).toString();
  const [
    faqSearchResponse,
    popularSearchKeywordsResponse,
    getFAQCategoryResponse,
  ] = await Promise.all([
    searchFAQ(searchParamsString),
    getPopularSearchKeywords(),
    getFAQCategory(),
  ]);
  const searchResultInfo = faqSearchResponse?.data || {};
  const searchResults = searchResultInfo?.data || [];
  const popularSearchKeywords =
    popularSearchKeywordsResponse?.data?.question ?? [];
  const faqCategories = getFAQCategoryResponse?.data ?? [];

  const updatedBreadcrumbData = [...breadcrumbData];
  const categoryLabel = categoryId
    ? faqCategories.find((item) => String(item.id) === categoryId)?.name
    : "";
  const searchTerm = groupLabel || search || categoryLabel || "";
  const searchTermLabel = searchTerm ? `「${searchTerm}」検索結果一覧` : "";

  if (searchTerm) {
    updatedBreadcrumbData.push({
      label: searchTermLabel,
      link: "",
    });
  }

  return (
    <>
      <BackgroundContainer className="bg-white">
        <MainBlock size="sm" className="lg:p-0">
          <BreadcrumbComposite data={updatedBreadcrumbData} />
          <PageHeader>{searchTermLabel}</PageHeader>
        </MainBlock>
      </BackgroundContainer>
      <BackgroundContainer className="bg-ivory-100 pb-[3.125rem] pt-[1.875rem] lg:py-10">
        <MainBlock size="sm" className="lg:p-0">
          {searchResults.length === 0 && (
            <FQACategoryPanel className="mb-10">
              <span className="font-medium">検索結果はありません</span>
            </FQACategoryPanel>
          )}
          <SearchPanel className="mb-10 gap-5">
            <div>
              <SearchFormHeader>
                <span className="shrink-0">フリーワードで探す</span>
                <FieldHorizontalRuleBlock />
              </SearchFormHeader>
              <SearchFormBody />
            </div>
            {popularSearchKeywords.length > 0 && (
              <SearchTag>
                <SearchTagList>
                  {popularSearchKeywords.map(({ id, name }, index) => (
                    <SearchTagItem key={`${id}-${index}`}>
                      <Link
                        href={`/recruit-conform?${FAQSearchParamKey.Search}=${name.replace("#", "")}`}
                      >
                        {name}
                      </Link>
                    </SearchTagItem>
                  ))}
                </SearchTagList>
              </SearchTag>
            )}
          </SearchPanel>
          {searchResults.length > 0 && (
            <FQACategoryPanel className="mb-10">
              <SearchCount className="mb-5 px-10 lg:px-0">
                <SearchCountEmphasized>{`${searchResultInfo.from}-${searchResultInfo.to}件`}</SearchCountEmphasized>
                ／{searchResultInfo.total}件中
              </SearchCount>

              <FAQAccordion>
                {searchResults.map(({ id, question, answer }) => {
                  return (
                    <FAQAccordionItem value={id} key={id}>
                      <FAQAccordionTrigger>
                        <FAQAccordionCommonContent>
                          <FAQAccordionEmphasized>
                            <span>Q</span>
                          </FAQAccordionEmphasized>
                          {question}
                        </FAQAccordionCommonContent>
                      </FAQAccordionTrigger>
                      <FAQAccordionContent>
                        <FAQAccordionCommonContent>
                          <FAQAccordionEmphasized className="text-blue-300">
                            <span>A</span>
                          </FAQAccordionEmphasized>
                          {answer}
                        </FAQAccordionCommonContent>
                      </FAQAccordionContent>
                    </FAQAccordionItem>
                  );
                })}
              </FAQAccordion>

              <DataPagination
                paginationData={searchResultInfo}
                className="mb-[6.25rem]"
              />
            </FQACategoryPanel>
          )}
        </MainBlock>
      </BackgroundContainer>
    </>
  );
}
