import {
  BREADCRUMB,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import {
  BackgroundContainer,
  MainBlock,
  PageHeader,
} from "@/components/feature/common";
import {
  convertSavedFilterPresetToQueryString,
  getSavedSearchFilters,
  JobFilterType,
  JobSearchParamKey,
  Panel,
  PanelTextEmphasized,
  Preset,
  PresetButton,
  PresetCommonContent,
  PresetDelete,
  PresetHeader,
  PresetList,
  PresetListItem,
  PresetTextEmphasized,
  PresetTitle,
} from "@/components/feature/job/search";
import { Metadata } from "next";
import Image from "next/image";
import IconSearchWhite from "@public/icon-search-white.svg";
import Link from "next/link";
import { RecommendedJobs } from "@/components/top";
import { LineInfoComposite } from "@/components/feature/line-info";
import { getStaticPageBySlug } from "@/components/static-page";

export const metadata: Metadata = {
  title: "Saved Search Settings",
  description:
    "保存した看護師求人をまとめて確認！宮古島をはじめ、寮完備の短期求人や魅力的なワーケーション案件を見比べて、あなたにぴったりの仕事を見つけましょう.",
};

const breadcrumbData = [BREADCRUMB.top, BREADCRUMB.conditions.base];

export default async function Page() {
  const STATIC_SLUG = "Top";

  const [savedSearchFiltersResponse, getStaticPageBySlugResponse] =
    await Promise.all([
      getSavedSearchFilters({ limit: 5 }),
      getStaticPageBySlug(STATIC_SLUG),
    ]);

  const savedSearchFilters = savedSearchFiltersResponse?.data || [];
  const totalResults =
    savedSearchFilters.length > 5 ? 5 : savedSearchFilters.length;

  const { data: topPageSavedData = null } = getStaticPageBySlugResponse ?? {};

  return (
    <>
      <BackgroundContainer className="bg-white">
        <MainBlock size="sm" className="lg:p-0">
          <BreadcrumbComposite data={breadcrumbData} />
          <PageHeader>保存した検索条件一覧</PageHeader>
        </MainBlock>
      </BackgroundContainer>

      <BackgroundContainer className="bg-white pb-[50px] pt-5 lg:bg-ivory-100 lg:py-20 lg:pb-[100px] lg:pt-10">
        <MainBlock size="sm" className="lg:p-0">
          {savedSearchFilters.length === 0 && (
            <Panel className="mb-[1.875rem] lg:mb-[3.125rem]">
              保存している検索条件はありません
            </Panel>
          )}
          {savedSearchFilters.length > 0 && (
            <>
              <Panel className="mb-5">
                最近見た求人一覧
                <PanelTextEmphasized>{totalResults}</PanelTextEmphasized>
                <span className="font-medium text-pink-200">件</span>
                を表示しています。
              </Panel>

              <Panel className="flex flex-col gap-5 bg-white p-0 lg:p-10">
                {savedSearchFilters.length > 0 &&
                  savedSearchFilters.map((data) => {
                    const { id, saved_filters } = data;

                    const {
                      [JobSearchParamKey.Name]: name,
                      [JobSearchParamKey.SpecificSearchCriteria]:
                        specificSearchCriteria,
                      [JobSearchParamKey.MonthlySalary]: monthlySalary,
                      [JobSearchParamKey.Prefecture]: prefectures,
                      [JobSearchParamKey.Occupation]: occupation,
                      [JobSearchParamKey.Contract]: contract,
                      [JobSearchParamKey.Assignment]: assignment,
                      [JobSearchParamKey.WorkForm]: workForm,
                      [JobSearchParamKey.MedicalSpecialty]: medicalSpecialty,
                      [JobSearchParamKey.FacilityForm]: facilityForm,
                    } = saved_filters;

                    return (
                      <Preset
                        key={id}
                        className="border border-shade-350 lg:px-10 lg:pb-2.5 lg:pt-10"
                      >
                        <PresetHeader>
                          <PresetTitle>条件名</PresetTitle>
                          <PresetDelete id={id}>削除</PresetDelete>
                        </PresetHeader>
                        <PresetList>
                          {name && (
                            <PresetListItem>
                              <PresetCommonContent>
                                <PresetTextEmphasized>
                                  フリーワードで探す
                                </PresetTextEmphasized>
                                <span>{name as string}</span>
                              </PresetCommonContent>
                            </PresetListItem>
                          )}
                          {specificSearchCriteria && (
                            <PresetListItem>
                              <PresetCommonContent>
                                <PresetTextEmphasized>
                                  こだわり検索条件
                                </PresetTextEmphasized>
                                <span>
                                  {" "}
                                  <span>
                                    {(specificSearchCriteria as JobFilterType[])
                                      .map((info) => info.name)
                                      .join(", ")}
                                  </span>
                                </span>
                              </PresetCommonContent>
                            </PresetListItem>
                          )}
                          {monthlySalary && (
                            <PresetListItem>
                              <PresetCommonContent>
                                <PresetTextEmphasized>
                                  月給
                                </PresetTextEmphasized>
                                <span>{monthlySalary as string}</span>
                              </PresetCommonContent>
                            </PresetListItem>
                          )}
                          {prefectures && (
                            <PresetListItem>
                              <PresetCommonContent>
                                <PresetTextEmphasized>
                                  都道府県
                                </PresetTextEmphasized>
                                {(prefectures as JobFilterType[])
                                  .map((info) => info.name)
                                  .join(", ")}
                              </PresetCommonContent>
                            </PresetListItem>
                          )}
                          {occupation && (
                            <PresetListItem>
                              <PresetCommonContent>
                                <PresetTextEmphasized>
                                  職種検索条件
                                </PresetTextEmphasized>
                                <span>
                                  {(occupation as JobFilterType[])
                                    .map((info) => info.name)
                                    .join(", ")}
                                </span>
                              </PresetCommonContent>
                            </PresetListItem>
                          )}
                          {contract && (
                            <PresetListItem>
                              <PresetCommonContent>
                                <PresetTextEmphasized>
                                  契約形態
                                </PresetTextEmphasized>
                                <span>
                                  {(contract as JobFilterType[])
                                    .map((info) => info.name)
                                    .join(", ")}
                                </span>
                              </PresetCommonContent>
                            </PresetListItem>
                          )}
                          {assignment && (
                            <PresetListItem>
                              <PresetCommonContent>
                                <PresetTextEmphasized>
                                  職種
                                </PresetTextEmphasized>
                                <span>
                                  {(assignment as JobFilterType[])
                                    .map((info) => info.name)
                                    .join(", ")}
                                </span>
                              </PresetCommonContent>
                            </PresetListItem>
                          )}
                          {workForm && (
                            <PresetListItem>
                              <PresetCommonContent>
                                <PresetTextEmphasized>
                                  職種勤務形態
                                </PresetTextEmphasized>
                                <span>
                                  {(workForm as JobFilterType[])
                                    .map((info) => info.name)
                                    .join(", ")}
                                </span>
                              </PresetCommonContent>
                            </PresetListItem>
                          )}
                          {medicalSpecialty && (
                            <PresetListItem>
                              <PresetCommonContent>
                                <PresetTextEmphasized>
                                  診療科目
                                </PresetTextEmphasized>
                                <span>
                                  {(medicalSpecialty as JobFilterType[])
                                    .map((info) => info.name)
                                    .join(", ")}
                                </span>
                              </PresetCommonContent>
                            </PresetListItem>
                          )}
                          {facilityForm && (
                            <PresetListItem>
                              <PresetCommonContent>
                                <PresetTextEmphasized>
                                  施設実態
                                </PresetTextEmphasized>
                                <span>
                                  {(facilityForm as JobFilterType[])
                                    .map((info) => info.name)
                                    .join(", ")}
                                </span>
                              </PresetCommonContent>
                            </PresetListItem>
                          )}
                        </PresetList>
                        <div className="flex justify-center">
                          <PresetButton className="h-auto bg-pink-200 py-2 leading-normal lg:py-2.5 lg:text-xl lg:leading-none">
                            <Link
                              href={`/result?${convertSavedFilterPresetToQueryString(saved_filters)}`}
                            >
                              <Image
                                src={IconSearchWhite}
                                alt="search"
                                width={16}
                                height={16}
                              />
                              この条件で検索する
                            </Link>
                          </PresetButton>
                        </div>
                      </Preset>
                    );
                  })}
              </Panel>
            </>
          )}

          {topPageSavedData?.positions &&
            topPageSavedData?.positions.length > 0 && (
              <RecommendedJobs jobs={topPageSavedData?.positions} />
            )}
          <LineInfoComposite />
        </MainBlock>
      </BackgroundContainer>
    </>
  );
}
