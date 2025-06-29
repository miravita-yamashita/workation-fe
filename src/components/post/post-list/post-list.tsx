import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import { ColumnContainer, ColumnItem } from "@/components/feature/common";
import { AboutContent } from "@/components/about";
import { GetArticleListResponseType } from "./lib";
import { LineInfoComposite } from "@/components/feature/line-info";

type CommonProps = PropsWithChildren & {
  className?: string;
};

// Note: Re-using @/components/about/about.tsx since they are just similar - Update code as necessary
export const PostList = async ({
  response,
  className = "",
}: CommonProps & {
  response: GetArticleListResponseType;
}) => {
  const posts = response?.data ?? [];

  return (
    <ColumnContainer className={cn("flex flex-col", className)}>
      <ColumnItem>
        <AboutContent items={posts} isPostList={true} />
        <LineInfoComposite className="mb-[6.25rem]" />
      </ColumnItem>
    </ColumnContainer>
  );
};
