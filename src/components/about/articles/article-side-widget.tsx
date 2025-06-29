import sampleImage from "@public/image-no-photo.jpg";
import Image from "next/image";
import { RecommendedArticleType } from "../lib";

type Props = {
  heading: string;
  articles:  RecommendedArticleType[];
};

export const ArticleSideWidget = async ({ heading, articles }: Props) => {
  
  if (articles?.length === 0) return null;

  return (
    <div className="pb-5">
      <h2 className="rounded-tl-[.625rem] rounded-tr-[.625rem] bg-coral-250 px-5 py-[.625rem] text-base font-bold uppercase leading-6 text-pink-200">
        {heading}
      </h2>
      <div className="bg-white p-5">
        {articles?.length > 0 && (
          <ul>
            {articles?.slice(0, 3).map((article) => (
              <li key={article.id} className="flex gap-[.875rem] pb-[.625rem]">
                <div className="mb-3 flex justify-between gap-[.625rem] md:mb-0 md:gap-5">
                  <div className="max-w-[5.625rem] flex-1">
                    <div className="relative h-[5.625rem] w-[5.625rem] md:h-[5.625rem] md:w-[5.625rem]">
                      <Image
                        className="object-cover"
                        src={
                          article?.media?.featured?.[0]?.url || sampleImage.src
                        }
                        fill
                        sizes="100%"
                        alt={`image`}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="mb-[.375rem] line-clamp-2 text-sm font-bold leading-[1.3125rem]">
                      {article.title}
                    </h2>
                    {article?.tags && article?.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 rounded-sm text-[.625rem] font-medium leading-[.9375rem]">
                        {article.tags.map((tag) => (
                          <div
                            className="inline-flex bg-yellow-500 px-[.4375rem] py-[.125rem]"
                            key={tag.id}
                          >
                            {tag.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
