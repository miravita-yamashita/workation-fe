import { ImageBlock, ImageItem } from "@/components/feature/common";
import sampleImage from "@public/image-no-photo.jpg";
import Link from "next/link";
import { RecommendedArticleType, ArticleDetailsDataType } from "../lib";
import ArticleWithTOC from "./article-with-toc";

type RelatedProps = {
  articles: RecommendedArticleType[];
  title: string;
};

export const ArticleRelated = ({ articles, title }: RelatedProps) => {
  if (articles?.length === 0) return null;

  return (
    <div className="relative mb-[1.875rem] rounded-[.625rem] border border-coral-250">
      <h2 className="absolute left-2 top-[-.8rem] inline-block rounded-full bg-coral-250 px-[.9375rem] pt-[.1rem] text-xs font-bold leading-[1.3125rem] text-pink-200">
        {title}
      </h2>
      {articles?.length > 0 && (
        <ul className="list-inside list-disc p-[1.25rem] text-xs leading-[1.3125rem] marker:text-coral-300">
          {articles?.map((article) => (
            <li key={article.id}>
              <Link
                href={`/about/${article.slug}`}
                className="underline hover:opacity-75"
              >
                {article.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

type Props = {
  details: ArticleDetailsDataType;
  relatedArticles: RecommendedArticleType[];
};

export const ArticlePost = ({ details, relatedArticles }: Props) => {
  return (
    <div className="mb-[3.75rem] overflow-hidden rounded-t-[.625rem]">
      <ImageBlock className="relative h-[12.3125rem] w-full bg-white lg:h-[25.1875rem]">
        <ImageItem
          src={details?.media?.featured[0]?.url || sampleImage.src}
          altText="article title"
          className="object-cover"
        />
      </ImageBlock>
      <div className="bg-white p-[.875rem] pt-[1.875rem] md:p-10">
        <ArticleRelated
          articles={details?.recommended_articles}
          title="関連記事"
        />
        {details?.content && details?.content?.trim() && (
          <ArticleWithTOC
            richTextContent={details?.content}
            relatedArticles={relatedArticles}
          />
        )}
      </div>
    </div>
  );
};
