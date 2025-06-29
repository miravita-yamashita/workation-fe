import { cn, getUniqueId } from "@/lib/utils";
import {
  Block,
  ColumnContainer,
  ColumnItem,
  ImageBlock,
  ImageItem,
} from "../common";
import Link from "next/link";
import IconPlay from "@public/icon-play.svg";
import Image from "next/image";
import IconChevronRight from "@public/icon-chevron-right.svg";
import { PropsWithChildren } from "react";
import {
  UnpaginatedMovieResponseType,
  MovieDataType,
} from "@/components/movie";
import ImageNoPhoto from "@public/image-no-photo.jpg";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const TopMovieList = ({
  response,
  className = "",
}: CommonProps & {
  response?: UnpaginatedMovieResponseType;
}) => {
  const { data: movieList } = response?.data || {};

  return (
    <ColumnContainer className={cn("mx-4 flex-col lg:mx-0", className)}>
      <ColumnItem>
        <TopMovieListTitle />
      </ColumnItem>
      <ColumnItem className="rounded-b border border-coral-250 lg:rounded-none lg:border-none">
        <TopMovieListItems items={movieList?.slice(0, 3)} />
        <TopMovieListActions className="flex justify-center rounded-b bg-white pb-[17px] lg:pb-[1.875rem]">
          <Link
            href="/movie"
            title="View All"
            className="inline-flex w-fit items-center gap-[.625rem] rounded-full bg-red-100 px-[3.75rem] py-[.625rem] text-center text-xs font-bold text-white hover:bg-red-200"
          >
            <span>動画一覧へ</span>
            <Block className="relative h-[.375rem] w-[.1875rem]">
              <Image
                src={IconChevronRight}
                alt="chevron right icon"
                priority={true}
              />
            </Block>
          </Link>
        </TopMovieListActions>
      </ColumnItem>
    </ColumnContainer>
  );
};

const TopMovieListTitle = () => {
  return (
    <Block className="rounded-t-lg bg-coral-250 px-5 py-[.625rem] text-base font-bold text-coral-300">
      動画一覧
    </Block>
  );
};

const TopMovieListItems = ({ items = [] }: { items?: MovieDataType[] }) => {
  return (
    <ColumnContainer className="grid grid-cols-2 gap-[.625rem] bg-white p-[.625rem] lg:grid-cols-none lg:flex-col lg:gap-5 lg:px-5 lg:py-5">
      {items?.map((movie, index) => {
        return (
          <ColumnItem
            key={getUniqueId(index.toString())}
            className="flex-col gap-y-5"
          >
            <Link
              href={movie?.link || ""}
              target="_blank"
              className="relative block"
            >
              <ImageBlock className="h-[5.4375rem] w-full rounded-t-lg lg:h-[9.125rem]">
                <ImageItem
                  src={movie?.media[0]?.url || ImageNoPhoto?.src}
                  altText={`${movie?.name} Thumbnail`}
                  className="object-cover"
                />
                <ImageBlock className="left-1/2 top-1/2 h-[3.25rem] w-[3.25rem] translate-x-[-50%] translate-y-[-50%] transform rounded-t-lg lg:h-[5.125rem] lg:w-[5.125rem]">
                  <ImageItem
                    src={IconPlay}
                    altText="Play Icon"
                    className="object-cover"
                  />
                </ImageBlock>
              </ImageBlock>
            </Link>
          </ColumnItem>
        );
      })}
    </ColumnContainer>
  );
};

export const TopMovieListActions = ({ children, className }: CommonProps) => {
  return <div className={cn(className)}>{children}</div>;
};
