import {
  BREADCRUMB,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import {
  BackgroundContainer,
  MainBlock,
  PageHeader,
} from "@/components/feature/common";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ワーケーションナースの説明動画",
  description:
    "ワーケーションナースの説明動画で働き方の新しい選択肢をチェック！「ワーケーションナースの説明動画」で魅力やメリットをわかりやすく解説します。",
};

const breadcrumbData = [
  BREADCRUMB.top,
  {
    label: "ワーケーションナースの説明動画",
    link: "/first-time/movie",
  },
];
export default async function Page() {
  return (
    <>
      <BackgroundContainer className="bg-white">
        <MainBlock size="sm" className="lg:p-0">
          <BreadcrumbComposite data={breadcrumbData} />
          <PageHeader>ワーケーションナースの説明動画</PageHeader>
        </MainBlock>
      </BackgroundContainer>
      <MainBlock size="sm" className="px-[1rem] sm:px-0 lg:p-0">
        <BackgroundContainer className="bg-ivory-100">
          Movie....
        </BackgroundContainer>
      </MainBlock>
    </>
  );
}
