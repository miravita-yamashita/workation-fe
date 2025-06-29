import { cn } from "@/lib/utils";
import { FieldHorizontalRuleBlock, ImageBlock, ImageItem } from "../common";
import Link from "next/link";
import { ColumnContainer, ColumnItem } from "../common/column-component";
import { FormTopSearch } from "./form-top-search";
import ImageTopSearchAreaMap from "@public/image-top-search-area-map.svg";
import ImageTopSearchAreaMapSp from "@public/image-top-search-area-map-sp.svg";
import IconMapPin from "@public/icon-map-pin.svg";
import { PropsWithChildren } from "react";
import { areaPrefectureMap, getFilterCategoryNameList } from "./lib";
import { JobSearchParamKey } from "../job/search";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const TopSearchBlock = async () => {
  const [filterCategoryNameListResponse] = await Promise.all([
    getFilterCategoryNameList(),
  ]);

  const { data: filterCategoryNameList } = filterCategoryNameListResponse || {};
  const jobCategoryNameList = filterCategoryNameList?.occupation || [];
  const commitmentCategoryNameList = filterCategoryNameList?.specific || [];

  return (
    <ColumnContainer className="flex-col-reverse gap-[2.625rem] xl:flex-row">
      <ColumnItem className="h-full w-full xl:max-w-[25rem]">
        <FormTopSearch
          jobSearchCheckboxValues={jobCategoryNameList}
          commitmentSearchCheckboxValues={commitmentCategoryNameList}
        />
      </ColumnItem>
      <ColumnItem className="h-full w-full xl:h-[41.25rem]">
        <AreaMapDesktop>
          <ImageBlock className="h-full max-h-[42.75rem] w-full">
            <ImageItem src={ImageTopSearchAreaMap} altText="image top search" />
            <AreaMapLinksDesktop />
            <AreaMapMiscellaneousElements />
          </ImageBlock>
        </AreaMapDesktop>
        <AreaMapMobile>
          <ImageBlock className="h-[17.9375rem] w-full">
            <ImageItem
              src={ImageTopSearchAreaMapSp}
              altText="image top search"
            />
            <AreaMapLinksMobile />
          </ImageBlock>
        </AreaMapMobile>
      </ColumnItem>
    </ColumnContainer>
  );
};

const AreaMapDesktop = ({ children, className = "" }: CommonProps) => {
  return (
    <div className={cn("hidden h-full xl:block", className)}>{children}</div>
  );
};

const AreaMapMobile = ({ children, className = "" }: CommonProps) => {
  return <div className={cn("h-full xl:hidden", className)}>{children}</div>;
};

const AreaMapLinksDesktop = ({ className = "" }: CommonProps) => {
  const itemLinkStyles =
    "absolute lg:py-[.625rem] xl:px-5 rounded text-white font-bold text-[1.25rem] ";

  const resultPath = "/result?";
  return (
    <ColumnContainer className={cn("relative h-full w-full", className)}>
      <Link
        href={`${resultPath}${JobSearchParamKey.Prefecture}=${areaPrefectureMap.miyakojima}`}
        title="Miyakojima"
        className={`${itemLinkStyles} left-[5%] top-[12.5rem] bg-yellow-200`}
      >
        宮古島
      </Link>
      <Link
        href={`${resultPath}${JobSearchParamKey.Prefecture}=${areaPrefectureMap.kyushu}`}
        title="Kyushu"
        className={`${itemLinkStyles} left-[7%] top-[80%] bg-orange-100`}
      >
        九州
      </Link>
      <Link
        href={`${resultPath}${JobSearchParamKey.Prefecture}=${areaPrefectureMap.shikoku}`}
        title="Shikoku"
        className={`${itemLinkStyles} left-[35%] top-[91%] bg-coral-300`}
      >
        四国
      </Link>
      <Link
        href={`${resultPath}${JobSearchParamKey.Prefecture}=${areaPrefectureMap.china}`}
        title="China"
        className={`${itemLinkStyles} left-[33%] top-[56%] bg-pink-100`}
      >
        中国
      </Link>
      <Link
        href={`${resultPath}${JobSearchParamKey.Prefecture}=${areaPrefectureMap.central}`}
        title="Central"
        className={`${itemLinkStyles} left-[50%] top-[43%] bg-blue-150`}
      >
        中部
      </Link>
      <Link
        href={`${resultPath}${JobSearchParamKey.Prefecture}=${areaPrefectureMap.kinki}`}
        title="Kinki"
        className={`${itemLinkStyles} left-[58%] top-[88%] bg-purple-100`}
      >
        近畿
      </Link>
      <Link
        href={`${resultPath}${JobSearchParamKey.Prefecture}=${areaPrefectureMap.hokkaido}`}
        title="Hokkaido"
        className={`${itemLinkStyles} left-[57%] top-[19%] bg-green-200`}
      >
        北海道
      </Link>
      <Link
        href={`${resultPath}${JobSearchParamKey.Prefecture}=${areaPrefectureMap.tohoku}`}
        title="Tohoku"
        className={`${itemLinkStyles} left-[87%] top-[45%] bg-green-300`}
      >
        東北
      </Link>
      <Link
        href={`${resultPath}${JobSearchParamKey.Prefecture}=${areaPrefectureMap.kanto}`}
        title="Kanto"
        className={`${itemLinkStyles} left-[87%] top-[65%] bg-blue-300`}
      >
        関東
      </Link>
    </ColumnContainer>
  );
};

const AreaMapLinksMobile = ({ className = "" }: CommonProps) => {
  const itemLinkStyles =
    "whitespace-nowrap lg:whitespace-normal py-[.625rem] px-[1.75rem] text-center rounded text-white font-bold text-base";
  const resultPath = "/result?";

  return (
    <ColumnContainer
      className={cn(
        "absolute left-1/2 top-1/2 grid w-full -translate-x-1/2 -translate-y-1/2 transform grid-cols-3 gap-[.375rem]",
        className,
      )}
    >
      <Link
        href={`${resultPath}${JobSearchParamKey.Prefecture}=${areaPrefectureMap.hokkaido}`}
        title="Hokkaido"
        className={`${itemLinkStyles} bg-green-200`}
      >
        北海道
      </Link>
      <Link
        href={`${resultPath}${JobSearchParamKey.Prefecture}=${areaPrefectureMap.tohoku}`}
        title="Tohoku"
        className={`${itemLinkStyles} bg-green-300`}
      >
        東北
      </Link>
      <Link
        href={`${resultPath}${JobSearchParamKey.Prefecture}=${areaPrefectureMap.kanto}`}
        title="Kanto"
        className={`${itemLinkStyles} bg-blue-300`}
      >
        関東
      </Link>
      <Link
        href={`${resultPath}${JobSearchParamKey.Prefecture}=${areaPrefectureMap.central}`}
        title="Central"
        className={`${itemLinkStyles} bg-blue-150`}
      >
        中部
      </Link>
      <Link
        href={`${resultPath}${JobSearchParamKey.Prefecture}=${areaPrefectureMap.kinki}`}
        title="Kinki"
        className={`${itemLinkStyles} bg-purple-100`}
      >
        近畿
      </Link>
      <Link
        href={`${resultPath}${JobSearchParamKey.Prefecture}=${areaPrefectureMap.china}`}
        title="China"
        className={`${itemLinkStyles} bg-pink-100`}
      >
        中国
      </Link>
      <Link
        href={`${resultPath}${JobSearchParamKey.Prefecture}=${areaPrefectureMap.shikoku}`}
        title="Shikoku"
        className={`${itemLinkStyles} bg-coral-300`}
      >
        四国
      </Link>
      <Link
        href={`${resultPath}${JobSearchParamKey.Prefecture}=${areaPrefectureMap.kyushu}`}
        title="Kyushu"
        className={`${itemLinkStyles} bg-orange-100`}
      >
        九州
      </Link>
      <Link
        href={`${resultPath}${JobSearchParamKey.Prefecture}=${areaPrefectureMap.miyakojima}`}
        title="Miyakojima"
        className={`${itemLinkStyles} bg-yellow-200`}
      >
        宮古島
      </Link>
    </ColumnContainer>
  );
};

const AreaMapMiscellaneousElements = ({ className = "" }: CommonProps) => {
  return (
    <ColumnContainer className={cn("absolute left-0 top-0", className)}>
      <ImageBlock className="relative mr-3 h-[2.3125rem] w-[2.3125rem]">
        <ImageItem src={IconMapPin} altText="icon map pin" />
      </ImageBlock>
      <ColumnItem className="flex items-center">
        <span className="block text-[1.375rem] font-bold">エリアから探す</span>
        <FieldHorizontalRuleBlock className="w-[16.25rem]" />
      </ColumnItem>
    </ColumnContainer>
  );
};
