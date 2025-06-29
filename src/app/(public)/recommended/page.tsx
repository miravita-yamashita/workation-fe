import {
  BREADCRUMB,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import { BackgroundContainer, MainBlock } from "@/components/feature/common";
import { RecommendedItem } from "@/components/feature/recommended";
import { getStaticPageBySlug } from "@/components/static-page";
import { Metadata } from "next";
import { Suspense } from "react";
import { LineInfoComposite } from "@/components/feature/line-info";

export const metadata: Metadata = {
  title: "【看護師・短期求人多数】ワーケーションナースおすすめの求人",
  description:
    "看護師の短期求人なら「ワーケーションナース」で見つかります！ワーケーションナースなら全国各地の看護師の短期求人の情報が見つかります。離島で看護をしたい、自然豊かな場所で看護師をしたい人はぜひご覧ください",
};

const breadcrumbData = [BREADCRUMB.top, BREADCRUMB.recommended.base];

export default async function Page() {
  const STATIC_SLUG = "Top";

  const [getStaticPageBySlugResponse] = await Promise.all([
    getStaticPageBySlug(STATIC_SLUG),
  ]);

  const { data: topPageSavedData = null } = getStaticPageBySlugResponse ?? {};

  return (
    <>
      <BackgroundContainer className="bg-white">
        <MainBlock size="sm" className="lg:p-0">
          <BreadcrumbComposite data={breadcrumbData} />
        </MainBlock>
        <MainBlock
          size="sm"
          className="font-bold text-coral-300 lg:p-0 lg:py-[.625rem] lg:text-[1.625rem]"
        >
          おすすめの求人
        </MainBlock>
      </BackgroundContainer>
      <MainBlock size="sm" className="pb-[3.125rem] lg:p-0 lg:pb-[6.25rem]">
        <Suspense>
          <div className="pt-5 md:pt-[3.75rem]">
            {topPageSavedData?.positions &&
              topPageSavedData?.positions?.length > 0 &&
              topPageSavedData.positions?.map((job) => (
                <RecommendedItem key={job.id} job={job} />
              ))}
          </div>
        </Suspense>

        <LineInfoComposite />
      </MainBlock>
    </>
  );
}
