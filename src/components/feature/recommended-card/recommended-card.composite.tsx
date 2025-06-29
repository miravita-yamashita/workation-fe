import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  RecommendedCard,
  RecommendedCardDescription,
  RecommendedCardImage,
  RecommendedCardTitle,
} from "./recommended-card";
import { ImageBlock, ImageItem } from "../common";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import IconChevronRight from "@public/icon-chevron-right.svg";
import { RecommendedArticleType } from "../recommended-article";
import ImageNoPhoto from "@public/image-no-photo.jpg";

export const RecommendedCardComposite = ({
  article,
  className,
  cardLinkProps,
}: CommonProps & {
  article: RecommendedArticleType;
  cardLinkProps?: {
    label?: string;
  };
}) => {
  const { label = "詳しく見る" } = cardLinkProps || {};
  const { slug, short_title, long_title } = article;

  return (
    <RecommendedCard className={cn("", className)}>
      <RecommendedCardImage>
        <ImageBlock className="h-[7.5rem] lg:h-[11.25rem] lg:max-w-[18.75rem]">
          <ImageItem
            src={article.media?.featured?.[0]?.url || ImageNoPhoto.src}
            altText="featured image"
            className="object-cover"
          />
        </ImageBlock>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {short_title && (
            <RecommendedCardTitle>{short_title}</RecommendedCardTitle>
          )}
          {long_title && (
            <RecommendedCardDescription>
              {long_title}
            </RecommendedCardDescription>
          )}
        </div>
      </RecommendedCardImage>
      <Button
        asChild
        className="md: h-10 w-full rounded-none py-2.5 text-sm leading-normal hover:bg-red-100 lg:h-[2.875rem] lg:text-base lg:leading-normal"
        size="auto"
      >
        <Link href={`/article/${slug}`}>
          <span>{label}</span>
          <ImageBlock className="relative h-[.625rem] w-[.3125rem] lg:h-2.5 lg:w-2.5">
            <ImageItem
              src={IconChevronRight.src}
              altText="icon chevron right"
              className="object-cover"
            />
          </ImageBlock>
        </Link>
      </Button>
    </RecommendedCard>
  );
};
