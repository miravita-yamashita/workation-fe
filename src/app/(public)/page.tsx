import { AboutWhatIsWorkationComposite } from "@/components/feature/about-workation";
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
  getRecommendedArticles,
  RecommendedArticleComposite,
} from "@/components/feature/recommended-article";
import { SocialsBlock } from "@/components/feature/socials";
import {
  TopCustomerSupport,
  TopBannersList,
  TopHowToBecomeAFreelance,
  TopSearchBlock,
  TopSearchTitle,
  TopMovieList,
  AttractionSites,
} from "@/components/feature/top";
import { SideBarSocials } from "@/components/feature/top/top-sidebar-socials";
import { TopTestimonialList } from "@/components/feature/top/top-testimonial";
import { getUnpaginatedMovieList } from "@/components/movie";
import { getStaticPageBySlug } from "@/components/static-page";
import { getTopTestimonials } from "@/components/testimonial";
import { Hero, RecommendedJobs, LatestJobOpenings } from "@/components/top";
import { getAreaJobs } from "@/components/top/lib";
import { socials } from "@/lib/static-datasource";
import { Suspense } from "react";

export default async function Page() {
  const [topMovieListResponse, topTestimonialListResponse, areaJobs] =
    await Promise.all([
      getUnpaginatedMovieList(),
      getTopTestimonials({ searchParams: "" }),
      getAreaJobs(),
    ]);

  const STATIC_SLUG = "Top"; // This value is dependent form the seeded
  const [getStaticPageBySlugResponse] = await Promise.all([
    getStaticPageBySlug(STATIC_SLUG),
  ]);
  const { data: topPageSavedData = null } = getStaticPageBySlugResponse ?? {};
  const { media, steps } = topPageSavedData || {};

  return (
    <MainContent className="bg-ivory-100">
      <Hero />
      <BackgroundContainer className="bg-white">
        <MainBlock className="px-4 lg:max-w-[77.5rem] lg:p-0 lg:pb-[3.75rem] lg:pt-10">
          <TopSearchTitle className="pt-[1.875rem]" />
          <TopSearchBlock />
        </MainBlock>
      </BackgroundContainer>

      <MainBlock size="sm" className="px-0 sm:px-0 lg:p-0">
        <TwoColContainer className="items-start gap-[3.8461538%]">
          <TwoColContainerItem className="block px-4 lg:w-[67.3076923%] lg:p-0">
            <Suspense fallback="">
              {topPageSavedData?.positions &&
                topPageSavedData?.positions.length > 0 && (
                  <RecommendedJobs jobs={topPageSavedData?.positions} />
                )}
              <LatestJobOpenings jobs={areaJobs} />
              <BackgroundContainer className="bg-coral-100">
                <AboutWhatIsWorkationComposite
                  redirectUrl="/about"
                  className="mx-4 px-5 pb-[1.875rem] pt-5 lg:mx-0 lg:px-[3.4375rem] lg:pb-[2.5rem] lg:pt-[3.4375rem]"
                />
              </BackgroundContainer>
              {topPageSavedData?.posts &&
                topPageSavedData?.posts.length > 0 && (
                  <AttractionSites articles={topPageSavedData?.posts} />
                )}
              <TopHowToBecomeAFreelance steps={steps} />
              <TopTestimonialList response={topTestimonialListResponse} />
              <Suspense fallback="">
                <RecommendedArticles />
              </Suspense>

              <SocialsBlock
                className="mx-4 my-[1.875rem] grid grid-cols-2 lg:mx-0 lg:my-10 lg:flex lg:grid-cols-none"
                socials={socials}
              />
            </Suspense>
          </TwoColContainerItem>

          <TwoColContainerItem className="block lg:w-[28.8461538%] lg:px-0 lg:py-0">
            <Sidebar>
              <Suspense fallback="">
                <TopMovieList
                  response={topMovieListResponse}
                  className="lg:mt-[5.625rem]"
                />
                <TopBannersList media={media} className="mt-5" />
                <SideBarSocials className="mt-5" />
                <TopCustomerSupport className="mt-5" />
              </Suspense>
            </Sidebar>
          </TwoColContainerItem>
        </TwoColContainer>
      </MainBlock>
    </MainContent>
  );
}

const RecommendedArticles = async () => {
  const [getRecommendedArticlesResponse] = await Promise.all([
    getRecommendedArticles(),
  ]);

  const data = getRecommendedArticlesResponse?.data ?? [];

  if (data.length === 0) return null;

  return (
    <RecommendedArticleComposite
      className="mb-[1.875rem] mt-[1.875rem] lg:mb-10 lg:mt-[2.25rem]"
      articles={data}
    />
  );
};
