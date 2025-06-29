import Link from "next/link";
import { ArticleSearchDataType } from "../lib";
import { ArticleSearchParamKey } from "@/components/about-search";


type Props = {
  tags: ArticleSearchDataType[];
  slug: string;
};

export const ArticleTags = async ({ tags, slug }: Props) => {

  if (tags?.length === 0) return null;

  return (
    <div className="pb-5">
      <h2 className="rounded-tl-[.625rem] rounded-tr-[.625rem] bg-coral-250 px-5 py-[.625rem] text-base font-bold uppercase leading-6 text-pink-200">
        Keyword
      </h2>
      <div className="bg-white p-5">
        <div className="flex flex-wrap gap-2 rounded-sm text-sm font-medium leading-[1.3125rem]">
          {tags?.map((tag) => (
            <Link
              className="inline-flex bg-yellow-500 px-[.4375rem] py-[.125rem]"
              key={tag.id}
              href={` /about-search?${ArticleSearchParamKey.Tag}=${encodeURIComponent(tag.name)}&slug=${slug}`}
            >
              {tag.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
