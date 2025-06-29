import {
  BREADCRUMB,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import {
  BackgroundContainer,
  ImageBlock,
  ImageItem,
  MainBlock,
} from "@/components/feature/common";
import { LineInfoComposite } from "@/components/feature/line-info";
import { Button } from "@/components/ui/button";

import ImageNotFound from "@public/image-not-found.svg";
import Link from "next/link";
import MemberLayout from "./(public)/layout";
import { headers } from "next/headers";

const breadcrumbData = [
  BREADCRUMB.top,
  {
    label: "404 Not Found",
    link: "",
  },
];

export default async function NotFound() {
  const headersList = await headers();
  const isAdminPath = headersList.get("current-url")?.includes("/admin");

  return (
    <>
      {!isAdminPath ? (
        <MemberLayout>
          <BackgroundContainer className="bg-white">
            <MainBlock size="sm" className="lg:p-0">
              <BreadcrumbComposite data={breadcrumbData} />
            </MainBlock>
          </BackgroundContainer>
          <BackgroundContainer className="bg-coral-100 px-6 pb-[3.125rem] pt-[1.875rem] lg:px-0 lg:pb-[6.25rem] lg:pt-[3.75rem]">
            <MainBlock
              size="sm"
              className="flex flex-col items-center justify-center gap-5 rounded-[.625rem] bg-white px-3.5 py-10 lg:p-0 lg:px-10 lg:py-[3.75rem]"
            >
              <ImageBlock className="h-[4.375rem] w-[9.625rem] lg:h-[96px] lg:w-[210px]">
                <ImageItem src={ImageNotFound?.src} altText="404 Not Found" />
              </ImageBlock>
              <div className="text-sm font-medium leading-[28px]">
                <p className="pb-6">指定されたURLのページは存在しません</p>
                <p>ページが移動または削除されたか</p>
                <p>URLが間違っている可能性があります。</p>
              </div>

              <Button
                asChild
                size="auto"
                className="px-[3.75rem] py-2.5 hover:bg-red-100"
              >
                <Link href="/">TOPに戻る</Link>
              </Button>
            </MainBlock>
          </BackgroundContainer>
          <BackgroundContainer className="bg-white px-6">
            <MainBlock
              size="sm"
              className="px-0 py-[3.125rem] lg:px-0 lg:py-[3.75rem]"
            >
              <LineInfoComposite />
            </MainBlock>
          </BackgroundContainer>
        </MemberLayout>
      ) : (
        <>
          <BackgroundContainer className="px-6 pb-[3.125rem] pt-[1.875rem] lg:px-0 lg:pb-[6.25rem] lg:pt-[3.75rem]">
            <MainBlock
              size="sm"
              className="flex flex-col items-center justify-center gap-5 rounded-[.625rem] bg-white px-3.5 py-10 lg:p-0 lg:px-10 lg:py-[3.75rem]"
            >
              <ImageBlock className="h-[4.375rem] w-[9.625rem] lg:h-[96px] lg:w-[210px]">
                <ImageItem src={ImageNotFound?.src} altText="404 Not Found" />
              </ImageBlock>
              <div className="text-sm font-medium leading-[28px]">
                <p className="pb-6">指定されたURLのページは存在しません</p>
                <p>ページが移動または削除されたか</p>
                <p>URLが間違っている可能性があります。</p>
              </div>

              <Button
                asChild
                size="auto"
                className="px-[3.75rem] py-2.5 hover:bg-red-100"
              >
                <Link href="/admin/dashboard">TOPに戻る</Link>
              </Button>
            </MainBlock>
          </BackgroundContainer>
        </>
      )}
    </>
  );
}
