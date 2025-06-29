import {
  getArticlesBySlug,
  getArticlesSearchKeywords,
} from "@/components/about";
import { ArticleAds, ArticleFaq, ArticlePost, ArticleSearch, ArticleSideWidget, ArticleTags } from "@/components/about/articles";
import { ArticleSideTOC } from "@/components/about/articles/article-side-toc";
import {
  BREADCRUMB,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import {
  BackgroundContainer,
  MainBlock,
  PageHeader,
  TwoColContainer,
} from "@/components/feature/common";
import { Sidebar, TwoColContainerItem } from "@/components/feature/layout";
import { GENERIC_NO_DATA } from "@/lib/message-map";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ワーケーションナースが選ばれる理由",
  description:
    "ワーケーションナースが選ばれる理由を徹底解説！「ワーケーションナースが選ばれる理由」とは？働きながら心も体もリフレッシュできる秘密を紹介します。",
};

const breadcrumbData = [
  BREADCRUMB.top,
  {
    label: "ワーケーションナースが選ばれる理由",
    link: "/first-time/reason",
  },
];

export default async function Page() {
  const STATIC_SLUG = "First-Time-Reason";
  const [articleDetailsResponse, getArticlesSearchKeywordsResponse] =
    await Promise.all([
      getArticlesBySlug(STATIC_SLUG),
      getArticlesSearchKeywords(),
    ]);

  const articleDetails = articleDetailsResponse?.data?.article ?? null;
  const relatedArticles = articleDetailsResponse?.data?.related_articles ?? [];
  const searchKeywords = getArticlesSearchKeywordsResponse?.data?.post ?? [];

  if (!articleDetails)
    return (
      <BackgroundContainer className="bg-white">
        <MainBlock size="sm" className="lg:p-0">
          <p>{GENERIC_NO_DATA}</p>
        </MainBlock>
      </BackgroundContainer>
    );

  return (
    <>
      <BackgroundContainer className="bg-white">
        <MainBlock size="sm" className="lg:p-0">
          <BreadcrumbComposite data={breadcrumbData} />
          <PageHeader>ワーケーションナースが選ばれる理由</PageHeader>
        </MainBlock>
      </BackgroundContainer>
      <MainBlock size="sm" className="mt-[3.75rem] px-0 sm:px-0 lg:p-0">
        <TwoColContainer className="items-start gap-[3.8461538%]">
          <TwoColContainerItem className="block px-4 lg:w-[67.3076923%] lg:p-0">
            <Suspense fallback="">
              <ArticlePost
                details={articleDetails}
                relatedArticles={relatedArticles}
              />
              <ArticleFaq questions={articleDetails?.questions} />
            </Suspense>
          </TwoColContainerItem>

          <TwoColContainerItem className="block lg:w-[28.8461538%] lg:px-0 lg:py-0">
            <Sidebar className="p-4 lg:p-0">
              <Suspense fallback="">
                <ArticleSearch slug={STATIC_SLUG} />
                <ArticleTags tags={searchKeywords} slug={STATIC_SLUG} />
                <ArticleSideTOC
                  richTextContent={articleDetails?.content}
                  relatedArticles={[]}
                />
                <ArticleSideWidget
                  heading={`おススメ記事`}
                  articles={articleDetails?.recommended_articles}
                />
                <ArticleSideWidget
                  heading={`合わせて読みたい記事`}
                  articles={relatedArticles}
                />

                <ArticleAds images={articleDetails?.media.banner} />
              </Suspense>
            </Sidebar>
          </TwoColContainerItem>
        </TwoColContainer>
      </MainBlock>
    </>
  );
}
