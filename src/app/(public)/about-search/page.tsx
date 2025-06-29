import { ContentElements, ContentAction } from "@/components/about";
import {
  ArticleSearchParamKey,
  getArticleSearchResult,
} from "@/components/about-search";
import {
  BREADCRUMB,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import {
  BackgroundContainer,
  Block,
  ColumnContainer,
  ColumnItem,
  ImageBlock,
  ImageItem,
  MainBlock,
  PageHeader,
} from "@/components/feature/common";
import Link from "next/link";
import Image from "next/image";
import IconChevronRight from "@public/icon-chevron-right.svg";
import { RecommendedJobs } from "@/components/top";
import { LineInfoComposite } from "@/components/feature/line-info";
import { getStaticPageBySlug } from "@/components/static-page";

type PageProps = {
  searchParams: Promise<{
    [ArticleSearchParamKey.Keyword]: string;
    [ArticleSearchParamKey.Tag]: string;
    slug: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const STATIC_SLUG = "Top";
  const searchParamsAwaited = await searchParams;
  const {
    [ArticleSearchParamKey.Keyword]: searchKeyword = "",
    [ArticleSearchParamKey.Tag]: searchKeywordTag = "",
    slug = "",
  } = searchParamsAwaited;
  const [getSearchResultResponse, getStaticPageBySlugResponse] =
    await Promise.all([
      getArticleSearchResult(
        new URLSearchParams(searchParamsAwaited).toString(),
      ),
      getStaticPageBySlug(STATIC_SLUG),
    ]);
  const searchTermHeader = searchKeyword || searchKeywordTag;
  const { data: topPageSavedData = null } = getStaticPageBySlugResponse ?? {};

  const breadcrumbData = [
    BREADCRUMB.top,
    BREADCRUMB.about.base,
    {
      label: decodeURIComponent(
        BREADCRUMB.about.previousSlug.label.replace(":slug", slug),
      ),
      link: BREADCRUMB.about.previousSlug.link.replace(":slug", slug),
    },
    BREADCRUMB.about.search,
  ];
  let breadcrumbDataFiltered = breadcrumbData.filter(
    (item) => item.label !== "",
  );

  const { data = null } = getSearchResultResponse;

  if (!data) return null;

  if (data.length === 0) {
    breadcrumbDataFiltered = breadcrumbData.filter(
      (_, index) => index !== 1 && index !== 2,
    );
  }

  return (
    <>
      <BackgroundContainer className="bg-white">
        <MainBlock size="sm" className="lg:p-0">
          <BreadcrumbComposite data={breadcrumbDataFiltered} />
          <PageHeader> 検索結果「{searchTermHeader}」</PageHeader>
        </MainBlock>
      </BackgroundContainer>
      <MainBlock size="sm" className="lg:p-0">
        <BackgroundContainer className="bg-ivory-100">
          {data.length === 0 ? (
            <p className="my-10 bg-white p-5 text-xs font-medium leading-normal lg:mb-10 lg:mt-20 lg:p-10 lg:text-base">
              検索結果はありません
            </p>
          ) : (
            <ColumnContainer className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mb-10 lg:mt-10 lg:grid-cols-3">
              {data?.map((content) => {
                const { id, title, media, slug } = content;
                const { featured = [] } = media;
                return (
                  <ColumnItem
                    key={id}
                    className="overflow-hidden rounded-[.625rem]"
                  >
                    <ImageBlock className="relative h-[11.25rem] w-full">
                      <ImageItem
                        src={featured?.[0].url}
                        altText=""
                        className="w-full object-cover"
                      />
                      <ContentElements className="align-center absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform flex-col justify-center text-center lg:px-2">
                        <Block className="self-center text-center font-bold">
                          <span className="text-shadow-white px-2.5 text-[1.75rem] leading-normal text-red-100">
                            {title}
                          </span>
                        </Block>
                      </ContentElements>
                    </ImageBlock>
                    <ContentAction className="bg-red-100">
                      <Link
                        href={`/article/${slug}`}
                        className={`inline-flex w-full items-center justify-center gap-[.625rem] rounded-b px-[3.75rem] py-[.625rem] text-center text-xs font-bold text-white`}
                      >
                        <span className="text-sm leading-normal">
                          詳しく見る
                        </span>
                        <Block className="relative h-[1rem] w-[.3125rem]">
                          <Image
                            src={IconChevronRight}
                            alt="chevron right icon"
                            priority={true}
                            fill
                            sizes="100%"
                          />
                        </Block>
                      </Link>
                    </ContentAction>
                  </ColumnItem>
                );
              })}
            </ColumnContainer>
          )}
          {topPageSavedData?.positions &&
            topPageSavedData?.positions.length > 0 && (
              <RecommendedJobs jobs={topPageSavedData?.positions} />
            )}
          <LineInfoComposite className="mb-[6.25rem]" />
        </BackgroundContainer>
      </MainBlock>
    </>
  );
}
