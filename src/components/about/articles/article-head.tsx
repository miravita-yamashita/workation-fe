import { TagType } from "../lib";

type Props = {
  title: string;
  tags: TagType[];
};

export const ArticleHead = async ({ title, tags }: Props) => {
  return (
    <div>
      <h2 className="pb-[.625rem]">
        <span
          className="article-head"
          dangerouslySetInnerHTML={{
            __html: title,
          }}
        ></span>
      </h2>

      {tags?.length > 0 && (
        <ul className="flex flex-wrap items-center gap-2">
          {tags?.map((tag) => (
            <li
              key={tag.id}
              className="min-w-[3.25rem] rounded-sm border border-shade-550 bg-white px-3 py-[.125rem] text-center text-xs font-medium leading-[1.125rem] text-black md:text-sm md:leading-[1.375rem]"
            >
              {tag.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
