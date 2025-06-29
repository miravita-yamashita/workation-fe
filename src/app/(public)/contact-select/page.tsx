import {
  BREADCRUMB,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import {
  BackgroundContainer,
  MainBlock,
  PageHeader,
} from "@/components/feature/common";
import { ContactComposite } from "@/components/feature/contact";
import {
  SearchComposite,
  FAQPopularComposite,
  getPopularSearchKeywords,
  SearchTag,
  SearchTagHeader,
  SearchTagList,
  SearchTagItem,
  SearchPanel,
  FAQSearchParamKey,
  getFAQPopularFAQByGroup,
} from "@/components/feature/faq";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "お問い合わせフォーム",
};

const breadcrumbData = [BREADCRUMB.top, BREADCRUMB.contact.select];

export default async function Page() {
  const [popularSearchKeywordsResponse, faqPopularByGroupResponse] =
    await Promise.all([getPopularSearchKeywords(), getFAQPopularFAQByGroup()]);

  const popularSearchKeywords =
    popularSearchKeywordsResponse?.data?.question ?? [];

  return (
    <>
      <BackgroundContainer className="bg-white">
        <MainBlock size="sm" className="lg:p-0">
          <BreadcrumbComposite data={breadcrumbData} />
          <PageHeader>求人を探す</PageHeader>
        </MainBlock>
      </BackgroundContainer>
      <BackgroundContainer className="bg-coral-100 pb-[3.125rem] pt-[1.875rem] lg:py-20">
        <section className="mx-auto mb-10 max-w-[52.5rem] px-4 lg:px-0">
          <ContactComposite />
        </section>
        <section className="mx-auto grid max-w-[52.5rem] flex-col gap-5 px-4 lg:grid-cols-2 lg:px-0">
          <SearchPanel>
            <Suspense>
              <SearchComposite />
            </Suspense>
            {popularSearchKeywords.length > 0 && (
              <SearchTag>
                <SearchTagHeader>よく検索されているキーワード</SearchTagHeader>
                <SearchTagList>
                  {popularSearchKeywords.map(({ id, name }) => (
                    <SearchTagItem key={id}>
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

          <FAQPopularComposite data={faqPopularByGroupResponse} />
        </section>
      </BackgroundContainer>
    </>
  );
}
