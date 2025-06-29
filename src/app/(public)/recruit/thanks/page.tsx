// import icons/images
import ImageRelatedJobTitle from "@public/image-related-job-title.svg";

import {
  BackgroundContainer,
  ImageBlock,
  ImageItem,
  MainBlock,
  PageHeader,
} from "@/components/feature/common";
import {
  ContactSuccessMessage,
  ContactSuccessMessageDescription,
} from "@/components/feature/contact/contact-success";
import ImageContactSuccessTitle from "@public/image-contact-success-title.svg";
import Link from "next/link";
import { RelatedJobTitle } from "@/components/feature/related-job/related-job";

import { Badge } from "@/components/ui/badge";
import { RelatedJobComposite } from "@/components/feature/related-job";
import {
  BREADCRUMB,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";

const breadcrumbData = [
  BREADCRUMB.top,
  BREADCRUMB.recruit.base,
  BREADCRUMB.recruit.check,
];

export default async function Page() {
  return (
    <>
      <BackgroundContainer className="bg-white">
        <MainBlock
          size="sm"
          className="font-bold text-coral-300 lg:p-0 lg:py-[.625rem] lg:text-[1.625rem]"
        >
          <BreadcrumbComposite data={breadcrumbData} />
          <PageHeader>お問い合わせありがとうございました</PageHeader>
        </MainBlock>
      </BackgroundContainer>
      <BackgroundContainer className="bg-coral-100">
        <MainBlock
          size="sm"
          className="relative px-[.875rem] pb-10 pt-[1.875rem] font-bold sm:px-[1rem] lg:px-0 lg:pb-[3.125rem] lg:pt-[1.875rem] lg:text-[1.625rem]"
        >
          <ContactSuccessMessage className="mb-[1.875rem] items-center justify-center gap-5 bg-white px-[.875rem] py-10 lg:mb-[3.75rem] lg:pb-[3.75rem] lg:pt-[3.75rem]">
            <ImageBlock className="relative h-[2.0625rem] w-[289px] lg:h-[2.8125rem] lg:w-[24.5625rem]">
              <ImageItem
                src={ImageContactSuccessTitle?.src}
                altText="image contact success title"
              />
            </ImageBlock>
            <ContactSuccessMessageDescription className="text-sm leading-[1.75rem]">
              <p>お問い合わせをいただきありがとうございます。</p>
              <p>担当者から折り返しのご連絡をさせていただきますので、</p>
              <p>今しばらくお待ちくださいませ。</p>
            </ContactSuccessMessageDescription>
            <Link
              href="/"
              title="TOPに戻る"
              className="mt-[.625rem] inline-flex w-fit items-center gap-[.625rem] rounded-full border bg-red-100 px-[3.75rem] py-[.625rem] text-center text-xs font-bold text-white"
            >
              <span>TOPに戻る</span>
            </Link>
          </ContactSuccessMessage>
        </MainBlock>
        <BackgroundContainer className="bg-ivory-100">
          <MainBlock
            size="sm"
            className="px-[1rem] py-10 sm:px-[1rem] lg:px-0 lg:py-[3.75rem]"
          >
            <BackgroundContainer className="relative bg-white p-10">
              <RelatedJobTitle className="mb-5 flex justify-center">
                <ImageBlock className="relative h-[3.75rem] w-[27.4375rem]">
                  <ImageItem
                    src={ImageRelatedJobTitle?.src}
                    altText="image related job title"
                  />
                </ImageBlock>
              </RelatedJobTitle>
              <RelatedJobComposite />
              <Badge className="absolute left-1/2 top-0 max-w-[fit-content] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-blue-50 px-5 py-[.375rem] font-albertsans text-[.625rem] font-medium uppercase text-blue-300 shadow-none hover:bg-blue-50">
                Related Jobs
              </Badge>
            </BackgroundContainer>
          </MainBlock>
        </BackgroundContainer>
      </BackgroundContainer>
    </>
  );
}
