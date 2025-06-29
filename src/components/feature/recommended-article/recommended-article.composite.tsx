import { CommonProps } from "@/lib/types";
import {
  RecommendedArticle,
  RecommendedArticleHeading,
  RecommendedArticleTitle,
  RecommendedArticleContent,
} from "./recommended-article";
import { cn } from "@/lib/utils";
import { RecommendedCardComposite } from "../recommended-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import IconChevronRight from "@public/icon-chevron-right.svg";
import RecommendedJobTitle from "@public/placeholder/recommended-job-title.svg";
import { ColumnContainer, ImageBlock, ImageItem } from "../common";
import { RecommendedArticleType } from "./lib";

export const RecommendedArticleComposite = ({
  className,
  articles,
}: CommonProps & {
  articles: RecommendedArticleType[];
}) => {
  return (
    <RecommendedArticle className={cn("", className)}>
      <RecommendedArticleTitle>RECOMMENDED ARTICLES</RecommendedArticleTitle>

      <RecommendedArticleContent>
        <RecommendedArticleHeading className="mb-4 flex justify-center lg:mb-5">
          <ImageBlock className="relative h-[10px] w-[5px] lg:h-[4rem] lg:w-[24.75rem]">
            <ImageItem
              src={RecommendedJobTitle.src}
              altText="recommended job title"
              className="object-cover"
            />
          </ImageBlock>
        </RecommendedArticleHeading>
        <section className="mb-4 grid grid-cols-1 items-center justify-items-center gap-4 lg:mb-5 lg:grid-cols-2 lg:justify-items-start lg:[&>*:nth-child(odd)]:justify-self-end">
          {articles?.map((article) => {
            return (
              <RecommendedCardComposite key={article.id} article={article} />
            );
          })}
        </section>
        <ColumnContainer className="justify-center">
          <Button
            asChild
            className="w-full max-w-[193px] rounded-full hover:bg-red-100 lg:h-[2.4375rem]"
          >
            <Link href="/posts">
              <span>もっと見る</span>
              <ImageBlock className="relative h-[10px] w-[5px]">
                <ImageItem
                  src={IconChevronRight.src}
                  altText="icon chevron right"
                  className="object-cover"
                />
              </ImageBlock>
            </Link>
          </Button>
        </ColumnContainer>
      </RecommendedArticleContent>
    </RecommendedArticle>
  );
};
