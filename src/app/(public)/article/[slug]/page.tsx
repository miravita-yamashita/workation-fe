import {
  ArticleAds,
  ArticleFaq,
  ArticleHead,
  ArticleSearch,
  ArticleSideWidget,
  ArticleTags,
} from "@/components/about/articles";
import { ArticlePost } from "@/components/about/articles/article-post";
import { ArticleSideTOC } from "@/components/about/articles/article-side-toc";
import {
  BackgroundContainer,
  MainBlock,
  MainContent,
} from "@/components/feature/common";
import {
  Sidebar,
  TwoColContainer,
  TwoColContainerItem,
} from "@/components/feature/layout";

import {
  getArticlesBySlug,
  getArticlesSearchKeywords,
} from "@/components/about";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
  BREADCRUMB,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  const [articleDetailsResponse] = await Promise.all([getArticlesBySlug(slug)]);

  const { article: articleDetails } = articleDetailsResponse?.data || {};

  return {
    title: articleDetails?.meta_title,
    description: articleDetails?.meta_description,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = (await params) || {};
  const [articleDetailsResponse, getArticlesSearchKeywordsResponse] =
    await Promise.all([getArticlesBySlug(slug), getArticlesSearchKeywords()]);

  const articleDetails = articleDetailsResponse?.data?.article ?? null;
  const relatedArticles = articleDetailsResponse?.data?.related_articles ?? [];
  const searchKeywords = getArticlesSearchKeywordsResponse?.data?.post ?? [];

  const breadcrumbData = [
    BREADCRUMB.top,
    BREADCRUMB.about.base,
    {
      label: decodeURIComponent(slug),
      link: BREADCRUMB.about.previousSlug.link.replace(":slug", slug),
    },
  ];

  if (!articleDetails) notFound();

  return (
    <MainContent className="bg-ivory-100">
      <BackgroundContainer className="bg-white">
        <MainBlock
          size="sm"
          className="font-bold text-coral-300 lg:p-0 lg:py-[.625rem] lg:text-[1.625rem]"
        >
          <BreadcrumbComposite data={breadcrumbData} />
          <ArticleHead
            title={articleDetails?.title}
            tags={articleDetails?.tags}
          />
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
                <ArticleSearch slug={slug} />
                <ArticleTags tags={searchKeywords} slug={slug} />
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
    </MainContent>
  );
}
