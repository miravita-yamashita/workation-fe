import Link from "next/link";
import IconCaretDown from "@public/icon-caret-white.svg";
import {
  Actions,
  BackgroundContainer,
  BannerImage,
  Block,
  ImageBlock,
  ImageItem,
  Loading,
  MainBlock,
  NoDataFound,
  PageHeader,
  SubHeadingTitle,
} from "@/components/feature/common";
import {
  ActionCallForAdvice,
  ActionGoToForm,
  Info as JobInfo,
  InfoTable as JobInfoTable,
  InfoTableItem as JobInfoTableItem,
  getJobDetails,
  JobItem,
  JobItemDescription,
  JobItemDetails,
  JobItemDetailsContent,
  JobItemDetailsHeader,
  JobItemGallery,
  JobItemTag,
  JobItemTags,
  RecommendedPoints,
  RecommendedPointsItem,
  RecommendedPointsTitle,
  handleSalaryRangeDisplay,
} from "@/components/feature/job";
import {
  Sidebar,
  TwoColContainer,
  TwoColContainerItem,
} from "@/components/feature/layout";
import { Metadata } from "next";
import IconPinMarker from "@public/icon-marker.svg";
import ImageNoPhoto from "@public/image-no-photo.jpg";
import { ImageSlider } from "@/components/feature/slider/image-slider";
import IconLikeLightGreen from "@public/icon-like-lightgreen.svg";
import IconPhone from "@public/icon-phone.svg";
import { LineInfoTightComposite } from "@/components/feature/line-info";

import {
  FacilityDetails,
  FacilityDetailsHeader,
  FacilityDetailsTable,
  FacilityDetailsTableItem,
} from "@/components/feature/job/facility";
import {
  AccessMap,
  AccessMapContent,
  AccessMapEmbed,
  AccessMapHeader,
} from "@/components/feature/access-map/acces-map";
import { RecommendedJobs } from "@/components/top";

import { Suspense } from "react";
import { FormPanel, FormPanelTitle } from "@/components/feature/form";
import { FormJobDetails } from "@/components/feature/form/form-job";
import {
  FAQPopularByGroupComposite,
  getFAQPopularFAQByGroup,
} from "@/components/feature/faq";
import { JobSaveAction } from "@/components/feature/job/keep/job-save";
import {
  FilterComposite,
  getJobSearchPrefectures,
  getJobSearchFilters,
} from "@/components/feature/job/search/filter";
import { PresetComposite } from "@/components/feature/job/search/preset";
import { RecentlyViewedTrigger } from "@/components/feature/recently/recently-viewed-trigger";
import {
  BREADCRUMB,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import { JobSaveActionProvider } from "@/components/feature/job/keep";

export const metadata: Metadata = {
  title: "ワーケーションナース",
  description: "ページごとに変更する",
};

type PageProps = {
  params: Promise<{ postId: string }>;
};

const breadcrumbData = [BREADCRUMB.top, BREADCRUMB.jobs.base];

export default async function Page({ params }: PageProps) {
  const { postId } = (await params) || {};
  const [
    faqPopularByGroupResponse,
    jobDetailsResponse,
    jobSearchFiltersResponse,
    jobSearchPrefecturesResponse,
  ] = await Promise.all([
    getFAQPopularFAQByGroup(),
    getJobDetails(postId),
    getJobSearchFilters(),
    getJobSearchPrefectures(),
  ]);
  const jobSearchFilters = jobSearchFiltersResponse?.data || {};
  const prefectures = jobSearchPrefecturesResponse?.data || {};

  const { data: jobDetails } = jobDetailsResponse || {};
  const {
    id,
    job_number,
    keep_flag,
    name,
    facility,
    area,
    description,
    recommendation_point_1,
    recommendation_point_2,
    recommended_jobs,
    recruitment_categories,
    specific_condition_categories,
    medical_subject_categories,
    assignment_categories,
    address_city,
    address_street,
    salary_min,
    salary_max,
    bonus,
    working_hours,
    holiday,
    position_images,
    media,
  } = jobDetails || {};

  if (!jobDetails) {
    return <NoDataFound />;
  }

  const salaryRange = handleSalaryRangeDisplay({
    minSalary: salary_min,
    maxSalary: salary_max,
  });

  return (
    <JobSaveActionProvider>
      <BackgroundContainer className="bg-white">
        <MainBlock size="sm" className="lg:p-0">
          <BreadcrumbComposite data={breadcrumbData} />
          <PageHeader>求人を探す</PageHeader>
        </MainBlock>
      </BackgroundContainer>
      <MainBlock size="sm" className="px-0 sm:px-0 lg:p-0">
        <TwoColContainer className="my-[3.75rem] items-start gap-[3.8461538%]">
          <TwoColContainerItem className="block px-4 lg:w-[67.3076923%] lg:p-0">
            <PresetComposite
              jobSearchFilter={jobSearchFilters}
              jobSearchPrefectures={prefectures}
            />
            <JobItem>
              <JobItemDetails>
                <JobItemDetailsHeader className="rounded-t bg-pink-200 px-[.875rem] py-5 lg:px-[1.875rem]">
                  <h3 className="font-bold text-white">{name}</h3>
                  <Block className="flex items-center justify-between">
                    <p className="text-xs text-white">{facility?.name}</p>
                    <Block className="flex items-center gap-[.3125rem]">
                      <ImageBlock className="h-[1.125rem] w-[.875rem]">
                        <ImageItem
                          src={IconPinMarker}
                          altText="icon pin marker"
                        />
                      </ImageBlock>
                      <p className="text-white">{area?.label}</p>
                    </Block>
                  </Block>
                  <Block className="h-[.0625rem] border-t border-white lg:mt-[.625rem]" />
                </JobItemDetailsHeader>
                <JobItemDetailsContent className="rounded-b-xl px-[.875rem] pb-[1.875rem] pt-5 lg:px-[1.875rem] lg:py-5">
                  <JobItemTags className="mb-5 text-[.625rem] lg:text-base">
                    {specific_condition_categories?.map((item) => (
                      <JobItemTag className="lg:text-[.625rem]" key={item?.id}>
                        {item?.name}
                      </JobItemTag>
                    ))}
                  </JobItemTags>
                  <JobItemGallery className="gap-[1.875rem] lg:flex-row">
                    <Block className="w-full shrink-0 lg:h-[22.75rem] lg:w-[25rem]">
                      <ImageSlider
                        slides={position_images?.reverse() || []}
                        previewImageClassName="lg:h-[18.75rem] h-[14.75rem]"
                        thumbnailImageClassName="lg:h-[3.375rem] h-[2.8125rem] w-[91%]"
                        className="lg:max-w-full"
                      />
                    </Block>
                    <JobItemDescription className="w-full whitespace-pre-line text-sm leading-[1.375rem]">
                      {description}
                    </JobItemDescription>
                  </JobItemGallery>

                  <RecommendedPointsTitle className="mb-[.625rem] mt-5 lg:mb-[.875rem] lg:mt-6 lg:px-[.625rem] lg:py-1 lg:text-sm">
                    おすすめポイント
                  </RecommendedPointsTitle>
                  <RecommendedPoints className="gap-[.625rem] lg:flex-row">
                    <RecommendedPointsItem className="w-full p-[.625rem] lg:p-[.625rem]">
                      <Block className="flex items-center gap-2">
                        <ImageBlock className="relative h-[3.25rem] w-[3.25rem] flex-shrink-0">
                          <ImageItem
                            src={IconLikeLightGreen}
                            altText="icon like green"
                            className="object-cover"
                          />
                        </ImageBlock>
                        <Block className="flex flex-col">
                          <p className="font-albertsans font-bold text-green-200">
                            POINT 01
                          </p>
                          <p className="text-sm lg:text-base">
                            {recommendation_point_1}
                          </p>
                        </Block>
                      </Block>
                    </RecommendedPointsItem>
                    <RecommendedPointsItem className="w-full p-[.625rem] lg:p-[.625rem]">
                      <Block className="flex items-center gap-2">
                        <ImageBlock className="relative h-[3.25rem] w-[3.25rem] flex-shrink-0">
                          <ImageItem
                            src={IconLikeLightGreen}
                            altText="icon like green"
                            className="object-cover"
                          />
                        </ImageBlock>
                        <Block className="flex flex-col">
                          <p className="font-albertsans font-bold text-green-200">
                            POINT 02
                          </p>
                          <p className="text-sm lg:text-base">
                            {recommendation_point_2}
                          </p>
                        </Block>
                      </Block>
                    </RecommendedPointsItem>
                  </RecommendedPoints>

                  <JobInfo className="mt-5 gap-5 lg:mt-10">
                    <SubHeadingTitle title="募集中の求人" />
                    <JobInfoTable>
                      <JobInfoTableItem className="flex items-center font-bold">
                        求人番号
                      </JobInfoTableItem>
                      <JobInfoTableItem className="w-full whitespace-pre-line px-[.875rem] py-[.625rem] lg:px-5 lg:py-[1rem]">
                        {job_number}
                      </JobInfoTableItem>
                      <JobInfoTableItem className="flex items-center font-bold">
                        募集形態
                      </JobInfoTableItem>
                      <JobInfoTableItem className="w-full whitespace-pre-line px-[.875rem] py-[.625rem] lg:px-5 lg:py-[1rem]">
                        {`${recruitment_categories?.map((item) => item?.name).join(", ")}`}
                      </JobInfoTableItem>
                      <JobInfoTableItem className="flex items-center font-bold">
                        診療科目
                      </JobInfoTableItem>
                      <JobInfoTableItem className="w-full whitespace-pre-line px-[.875rem] py-[.625rem] lg:px-5 lg:py-[1rem]">
                        {medical_subject_categories
                          ?.map((item) => item?.name)
                          .join(", ") || ""}
                      </JobInfoTableItem>
                      <JobInfoTableItem className="flex items-center font-bold">
                        配属
                      </JobInfoTableItem>
                      <JobInfoTableItem className="w-full whitespace-pre-line px-[.875rem] py-[.625rem] lg:px-5 lg:py-[1rem]">
                        {`${assignment_categories?.map((item) => item?.name).join(", ")}`}
                      </JobInfoTableItem>
                      <JobInfoTableItem className="flex items-center font-bold">
                        住所
                      </JobInfoTableItem>
                      <JobInfoTableItem className="w-full whitespace-pre-line px-[.875rem] py-[.625rem] lg:px-5 lg:py-[1rem]">
                        {[area.label, address_city, address_street]
                          .filter((data) => Boolean(data))
                          .join(" ") ?? "-"}
                      </JobInfoTableItem>
                      <JobInfoTableItem className="flex items-center font-bold">
                        給与
                      </JobInfoTableItem>
                      <JobInfoTableItem className="w-full whitespace-pre-line px-[.875rem] py-[.625rem] lg:px-5 lg:py-[1rem]">
                        {salaryRange}
                      </JobInfoTableItem>
                      <JobInfoTableItem className="flex items-center font-bold">
                        賞与
                      </JobInfoTableItem>
                      <JobInfoTableItem className="w-full whitespace-pre-line px-[.875rem] py-[.625rem] lg:px-5 lg:py-[1rem]">
                        {bonus}
                      </JobInfoTableItem>
                      <JobInfoTableItem className="flex items-center font-bold">
                        勤務時間
                      </JobInfoTableItem>
                      <JobInfoTableItem className="w-full whitespace-pre-line px-[.875rem] py-[.625rem] lg:px-5 lg:py-[1rem]">
                        {working_hours}
                      </JobInfoTableItem>
                      <JobInfoTableItem className="flex items-center font-bold">
                        休日
                      </JobInfoTableItem>
                      <JobInfoTableItem className="w-full whitespace-pre-line px-[.875rem] py-[.625rem] lg:px-5 lg:py-[1rem]">
                        {holiday}
                      </JobInfoTableItem>
                    </JobInfoTable>
                  </JobInfo>
                </JobItemDetailsContent>
              </JobItemDetails>
              <Actions className="my-5 flex flex-col items-center gap-[.375rem] lg:mb-[3.75rem] lg:mt-[1.875rem] lg:flex-row lg:gap-[.625rem]">
                <JobSaveAction jobId={id} keepFlag={keep_flag} />
                {/* Note: hide as per client request */}
                <ActionCallForAdvice className="hidden h-full w-full py-[.9375rem]">
                  <ImageBlock className="relative h-[1.375rem] w-[1.375rem]">
                    <ImageItem src={IconPhone} altText="icon phone" />
                  </ImageBlock>
                  <p className="text-base font-bold leading-[1.5625rem] text-pink-200 lg:text-[1.0625rem]">
                    電話で相談する
                  </p>
                </ActionCallForAdvice>
              </Actions>
              <LineInfoTightComposite />
              <FacilityDetails className="mt-5 lg:mt-[3.75rem]">
                <FacilityDetailsHeader className="items-center rounded-t-xl bg-coral-200 px-[.875rem] py-5 font-bold text-pink-200 lg:px-[1.875rem] lg:py-[.8438rem] lg:text-[1.375rem] lg:leading-[2.0625rem]">
                  施設詳細
                </FacilityDetailsHeader>
                <FacilityDetailsTable className="rounded-b-xl bg-white">
                  <FacilityDetailsTableItem className="flex items-center font-bold">
                    名称
                  </FacilityDetailsTableItem>
                  <FacilityDetailsTableItem className="w-full whitespace-pre-line px-[.875rem] py-[.625rem] lg:px-5 lg:py-[1rem]">
                    {facility?.name}
                  </FacilityDetailsTableItem>
                  <FacilityDetailsTableItem className="flex items-center font-bold">
                    所在地
                  </FacilityDetailsTableItem>
                  <FacilityDetailsTableItem className="w-full whitespace-pre-line px-[.875rem] py-[.625rem] lg:px-5 lg:py-[1rem]">
                    {[facility.prefecture.label, facility.address_city, facility.address_street]
                          .filter((data) => Boolean(data))
                          .join(" ") ?? "-"}
                  </FacilityDetailsTableItem>
                  <FacilityDetailsTableItem className="flex items-center font-bold">
                    アクセス
                  </FacilityDetailsTableItem>
                  <FacilityDetailsTableItem className="w-full whitespace-pre-line px-[.875rem] py-[.625rem] lg:px-5 lg:py-[1rem]">
                    {facility?.access}
                  </FacilityDetailsTableItem>
                  <FacilityDetailsTableItem className="flex items-center font-bold">
                    診療科目
                  </FacilityDetailsTableItem>
                  <FacilityDetailsTableItem className="w-full whitespace-pre-line px-[.875rem] py-[.625rem] lg:px-5 lg:py-[1rem]">
                    {medical_subject_categories
                      ?.map((item) => item?.name)
                      .join(", ") || ""}
                  </FacilityDetailsTableItem>
                  <FacilityDetailsTableItem className="flex items-center font-bold">
                    職員数
                  </FacilityDetailsTableItem>
                  <FacilityDetailsTableItem className="w-full whitespace-pre-line px-[.875rem] py-[.625rem] lg:px-5 lg:py-[1rem]">
                    {facility?.no_employees}名
                  </FacilityDetailsTableItem>
                  <FacilityDetailsTableItem className="flex items-center font-bold">
                    記録方式
                  </FacilityDetailsTableItem>
                  <FacilityDetailsTableItem className="w-full whitespace-pre-line px-[.875rem] py-[.625rem] lg:px-5 lg:py-[1rem]">
                    {facility?.record_method}
                  </FacilityDetailsTableItem>
                  <FacilityDetailsTableItem className="flex items-center font-bold">
                    病床数
                  </FacilityDetailsTableItem>
                  <FacilityDetailsTableItem className="w-full whitespace-pre-line px-[.875rem] py-[.625rem] lg:px-5 lg:py-[1rem]">
                    {facility?.no_beds}床
                  </FacilityDetailsTableItem>
                  <FacilityDetailsTableItem className="flex items-center font-bold">
                    看護基準
                  </FacilityDetailsTableItem>
                  <FacilityDetailsTableItem className="w-full whitespace-pre-line px-[.875rem] py-[.625rem] lg:px-5 lg:py-[1rem]">
                    {facility?.nursing_standard}
                  </FacilityDetailsTableItem>
                  <FacilityDetailsTableItem className="flex items-center font-bold">
                    駐車場
                  </FacilityDetailsTableItem>
                  <FacilityDetailsTableItem className="w-full whitespace-pre-line px-[.875rem] py-[.625rem] lg:px-5 lg:py-[1rem]">
                    {facility?.parking_lot}
                  </FacilityDetailsTableItem>
                </FacilityDetailsTable>
              </FacilityDetails>
              <AccessMap className="mt-5 lg:mt-[3.75rem]">
                <AccessMapHeader className="items-center rounded-t-xl bg-coral-200 px-[.875rem] py-5 font-bold text-pink-200 lg:px-[1.875rem] lg:py-[.8438rem] lg:text-[1.375rem] lg:leading-[2.0625rem]">
                  アクセスマップ
                </AccessMapHeader>
                <AccessMapContent className="lg:px-[1.875rem] lg:py-5">
                  <AccessMapEmbed embedUrl={facility?.map || ""} />
                </AccessMapContent>
              </AccessMap>
              <Actions className="mb-[4.375rem] mt-5 flex-col gap-[.625rem] lg:mb-[3.75rem] lg:mt-5 lg:flex-row">
                <JobSaveAction jobId={id} keepFlag={keep_flag} />
                {/* HIDE: hide as per instruction from client */}
                <ActionCallForAdvice className="hidden h-full w-full py-[.9375rem]">
                  <ImageBlock className="relative lg:h-[1.375rem] lg:w-[1.375rem]">
                    <ImageItem src={IconPhone} altText="" />
                  </ImageBlock>
                  <p className="text-lg font-bold leading-6 text-pink-200 lg:text-[1.0625rem] lg:leading-[1.5625rem]">
                    電話で相談する
                  </p>
                </ActionCallForAdvice>
                <ActionGoToForm
                  targetElementId="form-panel"
                  className="h-[3.75rem] w-full gap-[.625rem] py-[.9375rem]"
                >
                  <p className="text-lg font-bold leading-[1.5625rem] text-white lg:text-[1.0625rem] lg:leading-[1.5625rem]">
                    フォームへ
                  </p>
                  <ImageBlock className="relative h-[.625rem] w-[.3125rem]">
                    <ImageItem
                      src={IconCaretDown}
                      altText=""
                      className="rotate-90"
                    />
                  </ImageBlock>
                </ActionGoToForm>
              </Actions>
              <LineInfoTightComposite />
              {media?.banner.map((bannerItem, index) => (
                <BannerImage className="my-10 lg:my-[3.75rem]" key={index}>
                  <Link href={bannerItem?.custom_attr?.link || ""}>
                    <ImageBlock className="relative h-[8.75rem] w-full">
                      <ImageItem
                        src={bannerItem?.url || ImageNoPhoto?.src}
                        altText="banner image"
                        className="object-cover"
                      />
                    </ImageBlock>
                  </Link>
                </BannerImage>
              ))}

              <RecommendedJobs jobs={recommended_jobs} />

              <FAQPopularByGroupComposite
                data={faqPopularByGroupResponse}
                className="my-10 lg:my-[3.75rem]"
              />

              <FormPanel className="px-[1.3125rem]">
                <Suspense fallback={<Loading />}>
                  <FormPanelTitle className="mb-3 text-[1.75rem]">
                    応募フォーム
                  </FormPanelTitle>
                  <FormJobDetails data={jobDetails} jobNumber={job_number} />
                </Suspense>
              </FormPanel>
            </JobItem>
          </TwoColContainerItem>

          <TwoColContainerItem className="mt-10 block px-[1rem] lg:mt-0 lg:w-[28.8461538%] lg:px-0 lg:py-0">
            <Sidebar>
              <FilterComposite
                jobSearchFilter={jobSearchFilters}
                jobSearchPrefectures={prefectures}
              />
            </Sidebar>
          </TwoColContainerItem>
        </TwoColContainer>
        <Suspense fallback={<Loading />}>
          <RecentlyViewedTrigger jobId={id} />
        </Suspense>
      </MainBlock>
    </JobSaveActionProvider>
  );
}
