import {
  BackgroundContainer,
  Block,
  DesktopBlock,
  ImageBlock,
  ImageItem,
  MainBlock,
  MobileBlock,
  PageHeader,
} from "@/components/feature/common";
import {
  ContactSuccessMessage,
  ContactSuccessMessageDescription,
} from "@/components/feature/contact/contact-success";
import ImageContactSuccessTitle from "@public/image-contact-success-title.svg";
import Link from "next/link";
import IconAboutTitle from "@public/image-about-title.svg";
import IconAboutFigure from "@public/image-about-figure.svg";
import { Badge } from "@/components/ui/badge";
import IconCaretWhite from "@public/icon-caret-white.svg";
import {
  AboutWorkationAction,
  AboutWorkation,
  AboutWorkationDescription,
  AboutWorkationImageFigure,
  AboutWorkationTitle,
  AboutWhatIsWorkationAttractions,
  AboutWhatIsWorkationAttraction,
  AboutWhatIsWorkationAttractionDescription,
  AboutWhatIsWorkationAttractionHighlighted,
  AboutWhatIsWorkationAttractionLeftContent,
  AboutWhatIsWorkationAttractionRightContent,
} from "@/components/feature/about-workation";
import ImageHokkaidoText from "@public/image-hokkaido-text.svg";
import ImageMiyakojimaText from "@public/image-miyakojima-text.svg";
import ImageHokkaidoAttractions from "@public/image-attraction-hokkaido.svg";
import ImageMiyakojimaAttractions from "@public/image-attraction-miyakojima.svg";
import ImageHokkaidoAttractionsSP from "@public/image-attraction-hokkaido-sp.svg";
import ImageMiyakojimaAttractionsSP from "@public/image-attraction-miyakojima-sp.svg";
import { LineInfoComposite } from "@/components/feature/line-info";
import {
  BREADCRUMB,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";

const breadcrumbData = [
  BREADCRUMB.top,
  BREADCRUMB.contact.select,
  BREADCRUMB.contact.general,
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
          <ContactSuccessMessage className="mb-[1.875rem] items-center justify-center gap-5 rounded-xl bg-white px-[.875rem] py-10 lg:mb-[3.75rem] lg:pb-[3.75rem] lg:pt-[3.75rem]">
            <ImageBlock className="relative h-[2.0625rem] w-[289px] lg:h-[2.8125rem] lg:w-[24.5625rem]">
              <ImageItem
                src={ImageContactSuccessTitle?.src}
                altText="image contact success title"
              />
            </ImageBlock>
            <ContactSuccessMessageDescription className="text-sm leading-[28px]">
              <p>お問い合わせをいただきありがとうございます。</p>
              <p>担当者から折り返しの</p>
              <p>ご連絡をさせていただきますので、</p>
              <p>今しばらくお待ちくださいませ。</p>
            </ContactSuccessMessageDescription>
            <Link
              href="/"
              title="View All"
              className="mt-[.625rem] inline-flex w-fit items-center gap-[.625rem] rounded-full border bg-red-100 px-[3.75rem] py-[.625rem] text-center text-xs font-bold text-white"
            >
              <span>TOPに戻る</span>
            </Link>
          </ContactSuccessMessage>
          <BackgroundContainer className="rounded-xl bg-white">
            <MainBlock className="relative mx-5 max-w-full px-0 py-5 sm:py-5 lg:mx-0 lg:px-[3.4375rem] lg:pb-10 lg:pt-[3.75rem]">
              <Block className="lg:m-auto lg:max-w-[38.75rem]">
                <AboutWorkation className="relative items-center justify-center lg:justify-center">
                  <AboutWorkationTitle>
                    <ImageBlock className="left-[-2.0625rem] h-[4.5rem] w-[13.125rem] lg:left-[-8rem] lg:h-[7.5rem] lg:w-[21.875rem]">
                      <ImageItem
                        src={IconAboutTitle}
                        altText="icon about title"
                      />
                    </ImageBlock>
                  </AboutWorkationTitle>
                  <AboutWorkationImageFigure className="absolute left-1/2 top-1/2 translate-x-[5%] translate-y-[-40%] transform lg:left-[52%] lg:top-[-6.25rem] lg:translate-y-0 lg:transform-none">
                    <ImageBlock className="h-[7.1875rem] w-[10rem] lg:h-[13.625rem] lg:w-[17.5625rem]">
                      <ImageItem
                        src={IconAboutFigure}
                        altText="icon about figure"
                      />
                    </ImageBlock>
                  </AboutWorkationImageFigure>
                </AboutWorkation>
                <AboutWorkationDescription className="mb-[.875rem] mt-[2.8125rem] text-[.875rem] lg:mt-10">
                  この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。
                </AboutWorkationDescription>
                <AboutWorkationAction className="lg:mt-[1.375rem]">
                  <Link
                    href="#"
                    className="m-auto flex max-w-[fit-content] items-center justify-center gap-[.625rem] rounded-full bg-red-100 px-[3.75rem] py-[.625rem] text-white"
                  >
                    <Block className="text-xs font-bold">もっと見る</Block>

                    <ImageBlock className="h-[.5rem] w-[.5rem]">
                      <ImageItem src={IconCaretWhite} altText="icon caret" />
                    </ImageBlock>
                  </Link>
                </AboutWorkationAction>
              </Block>
              <Badge className="absolute left-1/2 top-0 max-w-[fit-content] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-coral-200 px-5 py-[.375rem] font-albertsans text-[.625rem] font-medium uppercase tracking-[2px] text-pink-200 shadow-none hover:bg-coral-200">
                About
              </Badge>
            </MainBlock>
            <AboutWhatIsWorkationAttractions className="flex-col gap-5 px-[.875rem] py-10 lg:flex-row lg:px-10">
              <AboutWhatIsWorkationAttraction
                href="/about/ワーケーションナースに人気の宮古島の魅力-2"
                className="flex-col gap-[.5625rem] border-green-100 px-[.875rem] py-[1.5625rem] lg:flex-row lg:gap-5 lg:px-[1.875rem] lg:py-[1.0625rem]"
              >
                <AboutWhatIsWorkationAttractionLeftContent className="lg:gap-5">
                  <AboutWhatIsWorkationAttractionDescription className="text-center text-[1.25rem] lg:text-start lg:leading-[1.5rem]">
                    <ImageBlock className="absolute left-1/2 top-[-2rem] h-[2.375rem] w-[13rem] -translate-x-1/2 transform lg:-top-6 lg:left-5 lg:translate-x-[-1.25rem]">
                      <ImageItem
                        src={ImageHokkaidoText?.src}
                        altText="image hokkaido"
                      />
                    </ImageBlock>
                    <div className="relative top-[-.5rem] lg:top-0">
                      <span>
                        ウインタースポーツ
                        <span className="text-[1rem] lg:leading-[1.2rem]">
                          好きなら
                        </span>
                      </span>
                      <span className="block">
                        <AboutWhatIsWorkationAttractionHighlighted className="border-b-green-200 text-[1.875rem] text-green-200 lg:leading-[2.25rem]">
                          北海道
                        </AboutWhatIsWorkationAttractionHighlighted>
                        <span className="inline text-[1.25rem] text-black">
                          で
                        </span>
                      </span>
                      <span className="lg:leading-[2rem]">
                        ワーケーションナース
                      </span>
                    </div>
                  </AboutWhatIsWorkationAttractionDescription>
                </AboutWhatIsWorkationAttractionLeftContent>
                <AboutWhatIsWorkationAttractionRightContent>
                  <DesktopBlock>
                    <ImageBlock className="h-[8.6875rem] w-[9.0625rem]">
                      <ImageItem
                        src={ImageHokkaidoAttractions?.src}
                        altText="image hokkaido attractions"
                        className="object-cover"
                      />
                    </ImageBlock>
                  </DesktopBlock>
                  <MobileBlock>
                    <ImageBlock className="h-[7.25rem] w-[15.9375rem]">
                      <ImageItem
                        src={ImageHokkaidoAttractionsSP?.src}
                        altText="image hokkaido attractions"
                        className="object-cover"
                      />
                    </ImageBlock>
                  </MobileBlock>
                </AboutWhatIsWorkationAttractionRightContent>
              </AboutWhatIsWorkationAttraction>
              <AboutWhatIsWorkationAttraction
                href="/about/ワーケーションナースに人気の宮古島の魅力"
                className="flex-col gap-[.5625rem] border-blue-250 px-[.875rem] py-[1.5625rem] lg:flex-row lg:gap-5 lg:px-[1.875rem] lg:py-[1.0625rem]"
              >
                <AboutWhatIsWorkationAttractionLeftContent className="lg:gap-5">
                  <AboutWhatIsWorkationAttractionDescription className="text-center text-[1.25rem] lg:text-start lg:leading-[1.5rem]">
                    <ImageBlock className="absolute left-1/2 top-[-2rem] h-[2.375rem] w-[13rem] -translate-x-1/2 transform lg:-top-6 lg:left-5 lg:w-[16rem] lg:translate-x-[-1.25rem]">
                      <ImageItem
                        src={ImageMiyakojimaText?.src}
                        altText="image hokkaido"
                      />
                    </ImageBlock>
                    <div className="relative top-[-.5rem] lg:top-0">
                      <span className="block">ワーケーションナースに</span>
                      <span>人気の</span>
                      <AboutWhatIsWorkationAttractionHighlighted className="border-b-blue-300 text-[1.875rem] text-blue-300 lg:leading-[1.875rem]">
                        宮古島
                      </AboutWhatIsWorkationAttractionHighlighted>
                      <span>の魅力</span>
                    </div>
                  </AboutWhatIsWorkationAttractionDescription>
                </AboutWhatIsWorkationAttractionLeftContent>
                <AboutWhatIsWorkationAttractionRightContent>
                  <DesktopBlock>
                    <ImageBlock className="h-[8.6875rem] w-[9.0625rem]">
                      <ImageItem
                        src={ImageMiyakojimaAttractions?.src}
                        altText=""
                      />
                    </ImageBlock>
                  </DesktopBlock>
                  <MobileBlock>
                    <ImageBlock className="h-[7.25rem] w-[15.9375rem]">
                      <ImageItem
                        src={ImageMiyakojimaAttractionsSP?.src}
                        altText="image miyakojima attractions"
                        className="object-cover"
                      />
                    </ImageBlock>
                  </MobileBlock>
                </AboutWhatIsWorkationAttractionRightContent>
              </AboutWhatIsWorkationAttraction>
            </AboutWhatIsWorkationAttractions>
          </BackgroundContainer>
        </MainBlock>
        <BackgroundContainer className="bg-white">
          <MainBlock
            size="sm"
            className="px-[1rem] py-10 sm:px-[1rem] lg:px-0 lg:py-[3.75rem]"
          >
            <LineInfoComposite />
          </MainBlock>
        </BackgroundContainer>
      </BackgroundContainer>
    </>
  );
}
