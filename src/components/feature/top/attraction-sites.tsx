import { PostType } from "@/components/static-page";
import { Button } from "@/components/ui/button";
import chevronIcoBlue from "@public/icon-chevron-right-blue.svg";
import chevronIconGreen from "@public/icon-chevron-right-green.svg";
import chevronIcon from "@public/icon-chevron-right.svg";
import imageAttractionTitleTwo from "@public/top/attraction-site-title-2.svg";
import imageAttractionTitle from "@public/top/attraction-site-title.svg";
import Image from "next/image";
import Link from "next/link";
import { ImageBlock, ImageItem } from "../common";
import { AttractionAnimation } from "./attraction-animation";

type articlesType = {
  articles: PostType[];
};

export const AttractionSites = ({ articles }: articlesType) => {
  return (
    <div className="bg-white px-5 py-[1.875rem] md:pb-10 md:pl-10 md:pr-10 md:pt-6">
      <div className="mb-[1.875rem] border-b border-shade-550 pb-10 md:mb-6">
        <div className="relative pb-10 text-center">
          <h2 className="inline-block pt-[1.875rem] text-lg font-bold leading-[1.3125rem] md:text-xl md:leading-[1.875rem]">
            {/* ワーケーションナースに
            <br className="md:hidden" />
            人気の
            <span className="text-[1.75rem] leading-[2.0625rem] text-blue-300 underline underline-offset-8 md:text-3xl md:leading-[2.8125rem]">
              宮古島
            </span>
            の魅力 */}

            {articles[0]?.title && (
              <span
                className="attraction-title-span"
                dangerouslySetInnerHTML={{
                  __html: articles[0]?.title,
                }}
              ></span>
            )}
            <div className="absolute left-0 right-0 top-0">
              <ImageBlock className="relative mx-auto mb-[1.25rem] h-[3rem] w-full sm:w-[19.6875rem] md:h-[2.9rem] md:w-[33.25rem]">
                <ImageItem
                  src={imageAttractionTitle.src}
                  altText="ワーケーションナースに人気の宮古島の魅力"
                  className="object-contain"
                />
              </ImageBlock>
            </div>
          </h2>
        </div>
        <div className="items-center md:flex md:flex-row-reverse md:flex-wrap md:justify-between md:gap-[6%]">
          <div className="mb-[.625rem] flex justify-center md:mb-0 md:block md:w-[30.81%]">
            {articles[0]?.media?.banner &&
              articles[0]?.media?.banner.length > 0 && (
                <AttractionAnimation images={articles[0]?.media?.banner} />
              )}
          </div>
          <div className="md:w-[62.5%]">
            {articles[0]?.meta_title && (
              <h3 className="pb-[.625rem] text-center text-xl font-bold text-blue-300 md:text-left md:text-[1.25rem] md:leading-7">
                <span
                  className="whitespace-pre-line"
                  dangerouslySetInnerHTML={{
                    __html: articles[0]?.meta_title,
                  }}
                ></span>
              </h3>
            )}
            {articles[0]?.meta_description && (
              <p className="mb-[.625rem] text-sm font-medium leading-6 md:leading-[1.75rem]">
                <span
                  className="whitespace-pre-line"
                  dangerouslySetInnerHTML={{
                    __html: articles[0]?.meta_description,
                  }}
                ></span>
              </p>
            )}
            <div className="flex items-center justify-center gap-[.625rem] md:justify-start">
              <Button
                asChild
                className="inline-flex w-full max-w-[10.8125rem] items-center gap-[.625rem] bg-blue-300 hover:bg-blue-300 hover:opacity-80"
              >
                <Link
                  href={{
                    pathname: "/result",
                    query: { "filter[prefectures]": "48" },
                  }}
                >
                  <span>求人情報へ</span>
                  <div className="relative h-[.375rem] w-[.1875rem]">
                    <Image
                      src={chevronIcon}
                      alt="chevron right icon"
                      priority={true}
                    />
                  </div>
                </Link>
              </Button>

              <Button
                asChild
                className="inline-flex w-full max-w-[10.8125rem] items-center gap-[.625rem] border-2 border-blue-300 bg-white text-blue-300 hover:bg-blue-100"
              >
                <Link href={`/about/${articles[0]?.slug}`}>
                  <span>詳しく見る</span>
                  <div className="relative h-[.375rem] w-[.1875rem]">
                    <Image
                      src={chevronIcoBlue}
                      alt="chevron right icon"
                      priority={true}
                    />
                  </div>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="relative pb-8 text-center md:pb-10">
          <h2 className="inline-block pt-[1.875rem] text-lg font-bold leading-[1.3125rem] md:text-xl md:leading-[1.875rem]">
            {articles[1]?.title && (
              <span
                className="attraction-title-span attraction-title-span-2nd"
                dangerouslySetInnerHTML={{
                  __html: articles[1]?.title,
                }}
              ></span>
            )}

            <div className="absolute left-0 right-0 top-0">
              <ImageBlock className="relative mx-auto mb-[1.25rem] h-[3rem] w-full sm:w-[19.6875rem] md:h-[2.9rem] md:w-[33.25rem]">
                <ImageItem
                  src={imageAttractionTitleTwo.src}
                  altText="ウインタースポーツ好きなら北海道でワーケーションナース"
                  className="object-contain"
                />
              </ImageBlock>
            </div>
          </h2>
        </div>
        <div className="items-center md:flex md:flex-wrap md:justify-between md:gap-[6%]">
          <div className="mb-[.625rem] flex justify-center md:mb-0 md:block md:w-[30.81%]">
            {articles[1]?.media?.banner &&
              articles[1]?.media?.banner.length > 0 && (
                <AttractionAnimation images={articles[1]?.media?.banner} />
              )}
          </div>
          <div className="md:w-[62.5%]">
            {articles[1]?.meta_title && (
              <h3 className="pb-[.625rem] text-center text-xl font-bold text-green-200 md:text-left md:text-[1.25rem] md:leading-7">
                <span
                  className="whitespace-pre-line"
                  dangerouslySetInnerHTML={{
                    __html: articles[1]?.meta_title,
                  }}
                ></span>
              </h3>
            )}
            {articles[1]?.meta_description && (
              <p className="mb-[.625rem] text-sm font-medium leading-6 md:leading-[1.75rem]">
                <span
                  className="whitespace-pre-line"
                  dangerouslySetInnerHTML={{
                    __html: articles[1]?.meta_description,
                  }}
                ></span>
              </p>
            )}
            <div className="flex items-center justify-center gap-[.625rem] md:justify-start">
              <Button
                asChild
                className="inline-flex w-full max-w-[10.8125rem] items-center gap-[.625rem] bg-green-200 hover:bg-green-200 hover:opacity-80"
              >
                <Link
                  href={{
                    pathname: "/result",
                    query: { "filter[prefectures]": "1" },
                  }}
                >
                  <span>求人情報へ</span>
                  <div className="relative h-[.375rem] w-[.1875rem]">
                    <Image
                      src={chevronIcon}
                      alt="chevron right icon"
                      priority={true}
                    />
                  </div>
                </Link>
              </Button>

              <Button
                asChild
                className="inline-flex w-full max-w-[10.8125rem] items-center gap-[.625rem] border-2 border-green-200 bg-white text-green-200 hover:bg-green-100"
              >
                <Link href={`/about/${articles[1]?.slug}`}>
                  <span>詳しく見る</span>
                  <div className="relative h-[.375rem] w-[.1875rem]">
                    <Image
                      src={chevronIconGreen}
                      alt="chevron right icon"
                      priority={true}
                    />
                  </div>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
