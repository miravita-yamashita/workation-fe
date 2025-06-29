import {
  BREADCRUMB,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import {
  BackgroundContainer,
  ImageBlock,
  ImageItem,
  MainBlock,
  PageHeader,
} from "@/components/feature/common";
import { getExplanatoryMovie, MovieFilterParamKey } from "@/components/movie";
import {
  Sitemap,
  SitemapGroupContent,
  SitemapItem,
  SitemapItemLinks,
  SitemapItemTitle,
  SitemapItemTitleContent,
} from "@/components/sitemap";
import IconChevronRight from "@public/icon-caret.svg";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "サイトマップ",
};

const breadcrumbData = [BREADCRUMB.top, BREADCRUMB.sitemap.base];

export default async function Page() {
  const [explanatoryMovieResponse] = await Promise.all([getExplanatoryMovie()]);
  const { data: explanatoryMovie } = explanatoryMovieResponse ?? {};

  return (
    <>
      <BackgroundContainer className="bg-white">
        <MainBlock size="sm" className="lg:p-0">
          <BreadcrumbComposite data={breadcrumbData} />
          <PageHeader>サイトマップ</PageHeader>
        </MainBlock>
      </BackgroundContainer>
      <MainBlock
        size="sm"
        className="px-[1rem] py-[1.875rem] font-bold lg:mb-[6.25rem] lg:mt-[1.875rem] lg:p-0 lg:py-[10px] lg:text-[26px]"
      >
        <Sitemap className="flex-col gap-[1.875rem] bg-white px-[.875rem] py-[1.875rem] lg:flex-row lg:gap-10 lg:px-10 lg:py-[3.75rem]">
          <SitemapGroupContent className="gap-[1.875rem] lg:gap-10">
            <SitemapItem>
              <SitemapItemTitleContent className="border-b border-dashed">
                <ImageBlock className="relative h-[16px] w-[16px]">
                  <ImageItem
                    src={IconChevronRight}
                    altText="icon chevron right"
                  />
                </ImageBlock>
                <SitemapItemTitle className="text-black">
                  <Link href="/">ホーム</Link>
                </SitemapItemTitle>
              </SitemapItemTitleContent>
            </SitemapItem>

            <SitemapItem>
              <SitemapItemTitleContent className="border-b border-dashed">
                <ImageBlock className="relative h-[16px] w-[16px]">
                  <ImageItem
                    src={IconChevronRight}
                    altText="icon chevron right"
                  />
                </ImageBlock>
                <SitemapItemTitle className="text-black">
                  <Link href="/first-time">初めての方へ一覧</Link>
                </SitemapItemTitle>
              </SitemapItemTitleContent>
              <SitemapItemLinks>
                <Link href="/first-time/recruit">採用になりやすい理由</Link>
                <Link href="/movie">動画一覧</Link>
                <Link href="/recommended">おすすめ求人 </Link>
              </SitemapItemLinks>
            </SitemapItem>

            <SitemapItem>
              <SitemapItemTitleContent className="border-b border-dashed">
                <ImageBlock className="relative h-[16px] w-[16px]">
                  <ImageItem
                    src={IconChevronRight}
                    altText="icon chevron right"
                  />
                </ImageBlock>
                <SitemapItemTitle className="text-black">
                  <Link href="/keep">キープ一覧画面</Link>
                </SitemapItemTitle>
              </SitemapItemTitleContent>
              <SitemapItemLinks>
                <Link href="/recently">最近見た求人一覧画面</Link>
                <Link href="/conditions">保存した検索条件一覧</Link>
              </SitemapItemLinks>
            </SitemapItem>

            <SitemapItem>
              <SitemapItemTitleContent className="border-b border-dashed">
                <SitemapItemTitle className="text-black">
                  施設情報
                </SitemapItemTitle>
              </SitemapItemTitleContent>
              <SitemapItemLinks>
                <Link href="/result">検索結果一覧</Link>
              </SitemapItemLinks>
            </SitemapItem>
          </SitemapGroupContent>
          <SitemapGroupContent className="gap-[1.875rem] lg:gap-10">
            <SitemapItem>
              <SitemapItemTitleContent className="border-b border-dashed">
                <ImageBlock className="relative h-[16px] w-[16px]">
                  <ImageItem
                    src={IconChevronRight}
                    altText="icon chevron right"
                  />
                </ImageBlock>
                <SitemapItemTitle className="text-black">
                  <Link href="/about">バケーションナース一覧</Link>
                </SitemapItemTitle>
              </SitemapItemTitleContent>
              <SitemapItemLinks>
                <Link href="/first-time/reason">
                  バケーションナースが選ばれる理由
                </Link>
                <Link href="/testimonial">バケーションナースの参加者の声</Link>
                <Link href="/article/miyakoisland-charm">
                  バケーションナースに人気の宮古島の魅力
                </Link>
                <Link href="/article/hokkaido-charm">
                  ウインタースポーツ好きなら北海道でバケーションナース
                </Link>
                <Link
                  href={`/movie?${encodeURIComponent(MovieFilterParamKey.Categories)}=${encodeURIComponent(explanatoryMovie?.id ?? "")}`}
                >
                  バケーションナースの説明動画
                </Link>
                <Link href="/article/freelance-nurse">
                  フリーランスナースに転職する方法
                </Link>
              </SitemapItemLinks>
            </SitemapItem>

            <SitemapItem>
              <SitemapItemTitleContent className="border-b border-dashed">
                <ImageBlock className="relative h-[16px] w-[16px]">
                  <ImageItem
                    src={IconChevronRight}
                    altText="icon chevron right"
                  />
                </ImageBlock>
                <SitemapItemTitle className="text-black">
                  <Link href="/company">会社情報</Link>
                </SitemapItemTitle>
              </SitemapItemTitleContent>
              <SitemapItemLinks>
                <Link href="/company">会社概要</Link>
                <Link href="/plan">一般事業主行動計画</Link>
                <Link href="#">サイトマップ</Link>
                <Link href="/contents-policy">コンテンツ作成ポリシー</Link>
                <Link href="/privacy-policy">プライバシーポリシー</Link>
                <Link href="/question">よくある質問一覧</Link>
              </SitemapItemLinks>
            </SitemapItem>
          </SitemapGroupContent>
        </Sitemap>
      </MainBlock>
    </>
  );
}
