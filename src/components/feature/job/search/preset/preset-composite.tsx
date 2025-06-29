"use client";

import {
  getFlattenedFilterCategories,
  JobFiltersResponseType,
  JobSearchParamKey,
  PrefectureResponseType,
  Preset,
  PresetActions,
  PresetButtonGhost,
  PresetCommonContent,
  PresetList,
  PresetListItem,
  PresetScrollToBlock,
  PresetScrollToIcon,
  PresetTextEmphasized,
  PresetTitleBorder,
} from "@/components/feature/job/search";
import Image from "next/image";
import IconDownload from "@public/icon-download.svg";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getIdCorrespondingLabel,
  getPrefectureIdCorrespondingLabel,
  usePreset,
} from "./lib";
import { JobFilterDatabaseKey } from "./lib/types";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const PresetComposite = ({
  jobSearchFilter,
  jobSearchPrefectures,
  className,
}: {
  jobSearchFilter: JobFiltersResponseType["data"];
  jobSearchPrefectures: PrefectureResponseType["data"];
  className?: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamsString = new URLSearchParams(searchParams).toString();
  const searchTerm = searchParams.get(JobSearchParamKey.Name);
  const newInformation = searchParams.get(JobSearchParamKey.NewInformation);
  const flattenedFilterCategories =
    getFlattenedFilterCategories(jobSearchFilter);
  const { isLoading, savePreset } = usePreset({
    searchParamsString,
    flattenedFilterCategories,
    jobSearchPrefectures,
  });

  const specificSearchCriteria = getIdCorrespondingLabel(
    jobSearchFilter[JobFilterDatabaseKey.SpecificSearchCriteria] ?? [],
    searchParams.get(JobSearchParamKey.SpecificSearchCriteria) || "",
  ).join(", ");
  const monthlySalary = searchParams
    .get(JobSearchParamKey.MonthlySalary)
    ?.replace(",", " ~");
  const prefectures = getPrefectureIdCorrespondingLabel(
    jobSearchPrefectures,
    searchParams.get(JobSearchParamKey.Prefecture) || "",
  ).join(", ");
  const occupation = getIdCorrespondingLabel(
    jobSearchFilter[JobFilterDatabaseKey.Occupation] ?? [],
    searchParams.get(JobSearchParamKey.Occupation) || "",
  ).join(", ");
  const contract = getIdCorrespondingLabel(
    jobSearchFilter[JobFilterDatabaseKey.Contract] ?? [],
    searchParams.get(JobSearchParamKey.Contract) || "",
  ).join(", ");
  const assignment = getIdCorrespondingLabel(
    jobSearchFilter[JobFilterDatabaseKey.Assignment] ?? [],
    searchParams.get(JobSearchParamKey.Assignment) || "",
  ).join(", ");
  const workForm = getIdCorrespondingLabel(
    jobSearchFilter[JobFilterDatabaseKey.WorkForm] ?? [],
    searchParams.get(JobSearchParamKey.WorkForm) || "",
  ).join(", ");
  const medicalSpecialty = getIdCorrespondingLabel(
    jobSearchFilter[JobFilterDatabaseKey.MedicalSpecialty] ?? [],
    searchParams.get(JobSearchParamKey.MedicalSpecialty) || "",
  ).join(", ");
  const facilityForm = getIdCorrespondingLabel(
    jobSearchFilter[JobFilterDatabaseKey.FacilityForm] ?? [],
    searchParams.get(JobSearchParamKey.FacilityForm) || "",
  ).join(", ");

  // Hide the component when all values are empty
  if (
    !searchTerm &&
    !newInformation &&
    !specificSearchCriteria &&
    !monthlySalary &&
    !prefectures &&
    !occupation &&
    !contract &&
    !assignment &&
    !workForm &&
    !medicalSpecialty &&
    !facilityForm
  ) {
    return null;
  }

  return (
    <Preset className={cn("mb-[1.875rem]", className)}>
      <PresetTitleBorder>検索した条件の内容</PresetTitleBorder>
      <PresetList>
        {searchTerm && (
          <PresetListItem>
            <PresetCommonContent>
              <PresetTextEmphasized>フリーワードで探す</PresetTextEmphasized>
              <span>{searchTerm}</span>
            </PresetCommonContent>
            <PresetScrollToBlock>
              <Link href="#searchTerm">
                <span>変更</span>
              </Link>
              <PresetScrollToIcon />
            </PresetScrollToBlock>
          </PresetListItem>
        )}
        {newInformation && (
          <PresetListItem>
            <PresetCommonContent>
              <PresetTextEmphasized>新規情報</PresetTextEmphasized>
              <span>{newInformation}</span>
            </PresetCommonContent>
            <PresetScrollToBlock>
              <Link href="#newInformation">
                <span>変更</span>
              </Link>
              <PresetScrollToIcon />
            </PresetScrollToBlock>
          </PresetListItem>
        )}
        {specificSearchCriteria && (
          <PresetListItem>
            <PresetCommonContent>
              <PresetTextEmphasized>こだわり検索条件</PresetTextEmphasized>
              <span>{specificSearchCriteria}</span>
            </PresetCommonContent>
            <PresetScrollToBlock>
              <Link href="#specificSearchCriteria">
                <span>変更</span>
              </Link>
              <PresetScrollToIcon />
            </PresetScrollToBlock>
          </PresetListItem>
        )}
        {monthlySalary && (
          <PresetListItem>
            <PresetCommonContent>
              <PresetTextEmphasized>月給</PresetTextEmphasized>
              <span>{monthlySalary}</span>
            </PresetCommonContent>
            <PresetScrollToBlock>
              <Link href="#monthlySalary">
                <span>変更</span>
              </Link>
              <PresetScrollToIcon />
            </PresetScrollToBlock>
          </PresetListItem>
        )}
        {prefectures && (
          <PresetListItem>
            <PresetCommonContent>
              <PresetTextEmphasized>都道府県</PresetTextEmphasized>
              <span>{prefectures}</span>
            </PresetCommonContent>
            <PresetScrollToBlock>
              <Link href="#prefectures">
                <span>変更</span>
              </Link>
              <PresetScrollToIcon />
            </PresetScrollToBlock>
          </PresetListItem>
        )}
        {occupation && (
          <PresetListItem>
            <PresetCommonContent>
              <PresetTextEmphasized>職種検索条件</PresetTextEmphasized>
              <span>{occupation}</span>
            </PresetCommonContent>
            <PresetScrollToBlock>
              <Link href="#occupation">
                <span>変更</span>
              </Link>
              <PresetScrollToIcon />
            </PresetScrollToBlock>
          </PresetListItem>
        )}
        {contract && (
          <PresetListItem>
            <PresetCommonContent>
              <PresetTextEmphasized>契約形態</PresetTextEmphasized>
              <span>{contract}</span>
            </PresetCommonContent>
            <PresetScrollToBlock>
              <Link href="#contract">
                <span>変更</span>
              </Link>
              <PresetScrollToIcon />
            </PresetScrollToBlock>
          </PresetListItem>
        )}
        {assignment && (
          <PresetListItem>
            <PresetCommonContent>
              <PresetTextEmphasized>職種</PresetTextEmphasized>
              <span>{assignment}</span>
            </PresetCommonContent>
            <PresetScrollToBlock>
              <Link href="#assignment">
                <span>変更</span>
              </Link>
              <PresetScrollToIcon />
            </PresetScrollToBlock>
          </PresetListItem>
        )}
        {workForm && (
          <PresetListItem>
            <PresetCommonContent>
              <PresetTextEmphasized>勤務形態</PresetTextEmphasized>
              <span>{workForm}</span>
            </PresetCommonContent>
            <PresetScrollToBlock>
              <Link href="#workForm">
                <span>変更</span>
              </Link>
              <PresetScrollToIcon />
            </PresetScrollToBlock>
          </PresetListItem>
        )}
        {medicalSpecialty && (
          <PresetListItem>
            <PresetCommonContent>
              <PresetTextEmphasized>診療科目</PresetTextEmphasized>
              <span>{medicalSpecialty}</span>
            </PresetCommonContent>
            <PresetScrollToBlock>
              <Link href="#medicalSpecialty">
                <span>変更</span>
              </Link>
              <PresetScrollToIcon />
            </PresetScrollToBlock>
          </PresetListItem>
        )}

        {facilityForm && (
          <PresetListItem>
            <PresetCommonContent>
              <PresetTextEmphasized>施設実態</PresetTextEmphasized>
              <span>{facilityForm}</span>
            </PresetCommonContent>
            <PresetScrollToBlock>
              <Link href="#facilityForm">
                <span>変更</span>
              </Link>
              <PresetScrollToIcon />
            </PresetScrollToBlock>
          </PresetListItem>
        )}
      </PresetList>
      <PresetActions>
        <PresetButtonGhost
          className="gap-[.3125rem] bg-white p-0 text-xs font-normal leading-normal"
          isLoading={isLoading}
          handleClick={savePreset}
        >
          <Image src={IconDownload} alt="save" width={10} height={10} />
          <span className="text-pink-200">この検索条件を保存する</span>
        </PresetButtonGhost>
        |
        <PresetButtonGhost
          className="gap-[.3125rem] bg-white p-0 text-xs font-normal leading-normal"
          handleClick={() => {
            router.push("/result");
          }}
        >
          <span className="text-pink-200">条件をクリア</span>
        </PresetButtonGhost>
      </PresetActions>
    </Preset>
  );
};
