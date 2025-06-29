import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";
import ImageNoPhoto from "@public/image-no-banner.png";
import { RecommendedJobs } from "@/components/top";
import Link from "next/link";
import IconChevronRight from "@public/icon-chevron-right.svg";
import {
  ColumnContainer,
  ColumnItem,
  ImageBlock,
  ImageItem,
  Block,
} from "../feature/common";
import { GetStaticPageResponseType, PostType } from "../static-page";
import { LineInfoComposite } from "../feature/line-info";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const FirstTimeUsers = async ({
  response,
  className = "",
}: CommonProps & {
  response?: GetStaticPageResponseType;
}) => {
  const { data: firstTimeUsers } = response || {};
  const { posts, positions } = firstTimeUsers || {};

  return (
    <ColumnContainer className={cn("flex flex-col", className)}>
      <ColumnItem>
        <FirstTimeContent items={posts || []} />
        <RecommendedJobs jobs={positions} />
        <LineInfoComposite className="mb-[6.25rem] mt-[.625rem]" />
      </ColumnItem>
    </ColumnContainer>
  );
};

export const FirstTimeContent = ({
  items,
}: CommonProps & { items: PostType[] }) => {
  return (
    <ColumnContainer className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mb-10 lg:mt-10 lg:grid-cols-3">
      {items?.map((content, index) => (
        <ColumnItem key={index}>
          <ImageBlock className="relative h-[11.25rem]">
            <ImageItem
              src={content?.media?.banner?.[0]?.url || ImageNoPhoto?.src}
              altText=""
              className="w-full rounded-t-lg object-cover"
            />
            <ContentElements className="align-center absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform flex-col justify-center text-center lg:px-2">
              <Block className="margin-auto w-fit self-center rounded bg-red-100 px-2 py-1 text-center text-[.625rem] font-bold text-white">
                {content?.short_title}
              </Block>
              <span className="text-shadow-white line-clamp-1 w-full text-center text-[1.75rem] font-bold text-red-100">
                {content?.long_title}
              </span>
            </ContentElements>
          </ImageBlock>
          <ContentAction>
            <Link
              href={`/about/${content?.slug}` || "#"}
              className="inline-flex w-full items-center justify-center gap-[.625rem] rounded-b-lg bg-red-100 px-[3.75rem] py-[.625rem] text-center text-xs font-bold text-white hover:bg-red-200"
            >
              <span>詳しく見る</span>
              <ImageBlock className="relative h-[.75rem] w-[.5rem]">
                <ImageItem
                  src={IconChevronRight}
                  altText="chevron right icon"
                />
              </ImageBlock>
            </Link>
          </ContentAction>
        </ColumnItem>
      ))}
    </ColumnContainer>
  );
};

export const ContentElements = ({ children, className }: CommonProps) => {
  return <div className={cn(className)}>{children}</div>;
};

export const ContentAction = ({ children, className }: CommonProps) => {
  return <div className={cn(className)}>{children}</div>;
};
