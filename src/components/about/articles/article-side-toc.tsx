import Link from "next/link";
import ArticleWithTOC from "./article-with-toc";
import { RecommendedArticleType } from "../lib";

type Props = {
  richTextContent: string;
  relatedArticles: RecommendedArticleType[];
};

export const ArticleSideTOC = async ({
  richTextContent,
  relatedArticles,
}: Props) => {
  return (
    <div className="pb-5">
      <h2 className="rounded-tl-[.625rem] rounded-tr-[.625rem] bg-coral-250 px-5 py-[.625rem] text-base font-bold leading-6 text-pink-200">
        目次
      </h2>
      <div className="bg-white p-5">
        <div>
          {richTextContent && richTextContent?.trim() && (
            <ArticleWithTOC
              richTextContent={richTextContent}
              onlyTOC={true}
              relatedArticles={relatedArticles}
            />
          )}
          <Link
            className="border-[#dddddd]; mb-2 mt-2 block border-b border-dashed py-[.625rem] text-sm text-shade-800 hover:underline"
            href="#faq-section"
          >
            よくある質問
          </Link>
        </div>
      </div>
    </div>
  );
};
