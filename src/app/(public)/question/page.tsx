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
  FAQAccordionPanel,
  FAQAccordionPanelTitle,
  FAQAccordionTrigger,
  FAQCategoryBullet,
  FAQCategoryItem,
  FAQCategoryList,
  FAQCategoryPanelHeader,
  FQACategoryPanel,
  SearchFormBody,
  SearchFormHeader,
  SearchPanel,
  SearchTag,
  SearchTagItem,
  SearchTagList,
} from "@/components/feature/faq";
import { getFAQCategory } from "@/components/feature/faq";
import {
  FAQSearchParamKey,
  getPopularSearchKeywords,
  searchFAQ,
} from "@/components/feature/faq/search";
import { GENERIC_NO_DATA } from "@/lib/message-map";

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
  const updatedBreadcrumbData = [...breadcrumbData];
  const searchParamsString = new URLSearchParams(await searchParams).toString();

  const [
    faqCategoryResponse,
    faqSearchResponse,
    popularSearchKeywordsResponse,
  ] = await Promise.all([
    getFAQCategory(),
    searchFAQ(searchParamsString),
    getPopularSearchKeywords(),
  ]);
  const searchResultInfo = faqSearchResponse?.data || {};
  const popularSearchKeywords =
    popularSearchKeywordsResponse?.data?.question ?? [];
  const faqCategories = Array.isArray(faqCategoryResponse?.data)
    ? faqCategoryResponse?.data
    : [];

  return (
    <>
      <BackgroundContainer className="bg-white">
        <MainBlock size="sm" className="lg:p-0">
          <BreadcrumbComposite data={updatedBreadcrumbData} />
          <PageHeader>お問い合わせ（看護師の方）</PageHeader>
        </MainBlock>
      </BackgroundContainer>
      <BackgroundContainer className="bg-ivory-100 pb-[3.125rem] pt-[1.875rem] lg:py-10">
        <MainBlock size="sm" className="lg:p-0">
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

          <FQACategoryPanel className="mb-10">
            <FAQCategoryPanelHeader>
              <span className="shrink-0">カテゴリーから探す</span>
              <FieldHorizontalRuleBlock />
            </FAQCategoryPanelHeader>

            <FAQCategoryList>
              {faqCategories.map(({ id, name }) => {
                return (
                  <FAQCategoryItem key={`${id}`}>
                    <Link
                      className="w-full"
                      href={`/recruit-conform?${FAQSearchParamKey.Category}=${id}`}
                    >
                      <FAQCategoryBullet />
                      {name}
                    </Link>
                  </FAQCategoryItem>
                );
              })}
              {faqCategories.length === 0 && <p>{GENERIC_NO_DATA}</p>}
            </FAQCategoryList>
          </FQACategoryPanel>

          <FAQAccordionPanel>
            <FAQAccordionPanelTitle className="h-auto w-full border-b-[.1875rem] border-dashed border-pink-200 pb-1.5 text-[1.375rem] font-bold leading-normal text-pink-200 lg:w-full lg:text-[1.75rem]">
              FAQ一覧
            </FAQAccordionPanelTitle>

            <FAQAccordion>
              {searchResultInfo?.data?.map(({ id, question, answer }) => {
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
          </FAQAccordionPanel>
        </MainBlock>
      </BackgroundContainer>
    </>
  );
}
